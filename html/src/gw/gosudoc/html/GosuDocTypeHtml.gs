package gw.gosudoc.html

uses java.io.File
uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.html.templates.GosuDocTypeHtmlTemplate

/**
 * Generates HTML for a Gosu type
 */
class GosuDocTypeHtml {

  var _type: IGosuDocType
  var _featureLists: List<GosuDocFeatureListHtml> as readonly FeatureLists

  construct(type : IGosuDocType) {
    _type = type
    _featureLists = {
      new GosuDocFeatureListHtml("Constructors", type.Constructors.map(\ c -> c.Html)),
      new GosuDocFeatureListHtml("Properties", type.Properties.map(\ p -> p.Html)),
      new GosuDocFeatureListHtml("Methods", type.Methods.map(\m -> m.Html))
    }.where(\ featureList -> featureList.Features.HasElements).freeze()
  }

  function generateHtml(dir : File) {
    dir.getChild(_type.Package.Html.Path).ensureDirectoryExists()
    using (var writer = dir.writeToChild(Path)) {
      GosuDocTypeHtmlTemplate.render(writer, this)
    }
  }

  property get Relationships() : List<GosuDocRelationshipHtml> {
    return _type.Relationships.map( \ r -> r.Html)
  }

  property get Title() : String {
    return _type.Category.Label + " " + _type.Name
  }

  function url(baseUrl: String) : String {
    return baseUrl + Path
  }

  property get Path() : String {
    return _type.Package.Html.Path + "/" + _type.Name + ".html"
  }

  property get BaseUrl() : String {
    return _type.Package.Html.BaseUrl
  }

  property get Summary() : String {
    return _type.Description.Summary.Html.generate()
  }

  property get Details() : String {
    return _type.Description.Details.Html.generate()
  }
}
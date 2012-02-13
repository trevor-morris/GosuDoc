package gw.gosudoc.html

uses java.io.File
uses java.lang.StringBuilder
uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.html.templates.GosuDocTypeHtmlTemplate
uses gw.gosudoc.html.templates.GosuDocFeatureListHtmlTemplate

/**
 * Generates HTML for a Gosu type
 */
class GosuDocTypeHtml {

  var _type : IGosuDocType

  construct(type : IGosuDocType) {
    _type = type
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

  property get HasConstructors() : boolean { return _type.Constructors.HasElements }

  property get HasProperties() : boolean { return _type.Properties.HasElements }

  property get HasMethods() : boolean { return _type.Methods.HasElements }

  function featureLists() : String {
    return featureList("Constructors", "..constructors", _type.Constructors.map( \ c -> c.Html))
            + featureList("Properties", "..properties", _type.Properties.map(\ p -> p.Html))
            + featureList("Methods", "..methods", _type.Methods.map(\ m -> m.Html))
  }

  function featureList(listTitle : String, id : String, features : List<GosuDocFeatureHtml>) : String {
    if (features.Empty) {
      return ""
    }
    return GosuDocFeatureListHtmlTemplate.renderToString(listTitle, id, features)
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
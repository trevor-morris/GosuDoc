package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocPackage
uses java.io.File
uses gw.gosudoc.html.templates.GosuDocPackageHtmlTemplate
uses gw.gosudoc.core.GosuDocTypeCategory

/**
 * HTML generation for a package
 */
class GosuDocPackageHtml {

  var _package : IGosuDocPackage
  var _typeLists : List<GosuDocTypeListHtml>  as readonly TypeLists
  construct(p : IGosuDocPackage) {
    _package = p
    _typeLists = GosuDocTypeCategory.AllValues
            .map(\ c -> createTypeList(c))
            .where(\ tl -> tl.Types.HasElements)
            .freeze()
  }

  function generateHtml(dir : File) {
    dir.getChild(Path).ensureDirectoryExists()
    using (var writer = dir.writeToChild(Path + "/package.html")) {
      GosuDocPackageHtmlTemplate.render(writer, this)
    }
    for (t in _package.Types) {
      t.Html.generateHtml(dir)
    }
  }

  property get Title() : String {
    return "Package " + _package.Name
  }

  property get Path() : String {
    return "doc/" + RelativePath
  }

  property get BaseUrl() : String {
    return "../".repeat(_package.Name.countMatches(".") + 2)
  }

  property get LinkFromIndex() : String {
    return '<a href="${RelativePath}/package.html">${_package.Name}</a>'
  }

  property get Summary() : String {
    return _package.Description.Summary.Html.generate()
  }

  property get Details() : String {
    return _package.Description.Details.Html.generate()
  }

  private function createTypeList(category : GosuDocTypeCategory) : GosuDocTypeListHtml {
    return new GosuDocTypeListHtml(
            category.PluralLabel,
            _package.Types.where(\ t -> t.Category == category).map(\ t -> t.Html)
    )
  }

  private property get RelativePath() : String {
    return _package.Name.replace(".", "/")
  }
}
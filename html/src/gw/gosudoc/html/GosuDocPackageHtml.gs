package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocPackage

/**
 * HTML generation for a package
 */
class GosuDocPackageHtml {

  var _package : IGosuDocPackage

  construct(p : IGosuDocPackage) {
    _package = p
  }

  property get Path() : String {
    return "doc/" + _package.Name.replace(".", "/")
  }

  property get BaseUrl() : String {
    return "../".repeat(_package.Name.countMatches(".") + 2)
  }
}
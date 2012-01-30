package gw.gosudoc.html.enhancements

uses gw.gosudoc.core.IGosuDocPackage
uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.html.GosuDocPackageHtml

enhancement IGosuDocPackageHtmlEnhancement: IGosuDocPackage {
  property get Html() : GosuDocPackageHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocPackageHtml)
  }
}

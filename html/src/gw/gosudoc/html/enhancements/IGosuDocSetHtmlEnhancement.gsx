package gw.gosudoc.html.enhancements

uses gw.gosudoc.core.IGosuDocSet
uses gw.gosudoc.html.GosuDocSetHtml
uses gw.gosudoc.html.GosuDocHtmlFactory

enhancement IGosuDocSetHtmlEnhancement : IGosuDocSet {
  property get Html() : GosuDocSetHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocSetHtml)
  }
}

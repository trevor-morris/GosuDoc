package gw.gosudoc.html.enhancements

uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.html.GosuDocTypeHtml

enhancement IGosuDocTypeHtmlEnhancement: IGosuDocType {
  property get Html() : GosuDocTypeHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocTypeHtml)
  }
}

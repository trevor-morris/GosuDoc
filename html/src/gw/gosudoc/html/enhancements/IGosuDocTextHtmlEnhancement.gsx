package gw.gosudoc.html.enhancements

uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.html.GosuDocTextHtml

enhancement IGosuDocTextHtmlEnhancement: IGosuDocText {
  property get Html() : GosuDocTextHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocTextHtml)
  }
}

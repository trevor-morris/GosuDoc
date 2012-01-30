package gw.gosudoc.html.enhancements

uses gw.gosudoc.core.IGosuDocMethod
uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.html.GosuDocMethodHtml

enhancement IGosuDocMethodHtmlEnhancement: IGosuDocMethod {
  property get Html() : GosuDocMethodHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocMethodHtml)
  }
}

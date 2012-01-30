package gw.gosudoc.html.enhancements

uses gw.gosudoc.core.IGosuDocConstructor
uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.html.GosuDocConstructorHtml

enhancement IGosuDocConstructorHtmlEnhancement: IGosuDocConstructor {
  property get Html() : GosuDocConstructorHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocConstructorHtml)
  }
}

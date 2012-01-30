package gw.gosudoc.html.enhancements

uses gw.gosudoc.core.IGosuDocProperty
uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.html.GosuDocPropertyHtml

enhancement IGosuDocPropertyHtmlEnhancement: IGosuDocProperty {
  property get Html() : GosuDocPropertyHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocPropertyHtml)
  }
}

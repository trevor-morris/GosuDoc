package gw.gosudoc.html.enhancements

uses gw.gosudoc.core.IGosuDocTypeReference
uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.html.GosuDocTypeReferenceHtml

enhancement IGosuDocTypeReferenceHtmlEnhancement: IGosuDocTypeReference {
  property get Html() : GosuDocTypeReferenceHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocTypeReferenceHtml)
  }
}

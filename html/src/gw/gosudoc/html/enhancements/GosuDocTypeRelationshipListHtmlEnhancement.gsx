package gw.gosudoc.html.enhancements

uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.core.GosuDocTypeRelationshipList
uses gw.gosudoc.html.GosuDocTypeRelationshipListHtml

enhancement GosuDocTypeRelationshipListHtmlEnhancement: GosuDocTypeRelationshipList {
  property get Html() : GosuDocTypeRelationshipListHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocTypeRelationshipListHtml)
  }
}

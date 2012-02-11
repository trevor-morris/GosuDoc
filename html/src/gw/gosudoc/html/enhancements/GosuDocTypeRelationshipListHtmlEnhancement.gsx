package gw.gosudoc.html.enhancements

uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.core.GosuDocRelationship
uses gw.gosudoc.html.GosuDocTypeRelationshipListHtml

enhancement GosuDocTypeRelationshipListHtmlEnhancement: GosuDocRelationship {
  property get Html() : GosuDocTypeRelationshipListHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocTypeRelationshipListHtml)
  }
}

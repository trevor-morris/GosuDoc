package gw.gosudoc.html.enhancements

uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.core.GosuDocRelationship
uses gw.gosudoc.html.GosuDocRelationshipHtml

enhancement GosuDocRelationshipHtmlEnhancement: GosuDocRelationship {
  property get Html() : GosuDocRelationshipHtml {
    return GosuDocHtmlFactory.getOrCreateFromType(this, GosuDocRelationshipHtml)
  }
}

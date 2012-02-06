package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.core.GosuDocTypeRelationshipList
uses gw.gosudoc.html.templates.GosuDocTypeRelationshipListHtmlTemplate

/**
 * Generates HTML for a type relationship list
 */
class GosuDocTypeRelationshipListHtml {

  var _list : GosuDocTypeRelationshipList

  construct(relationshipList: GosuDocTypeRelationshipList) {
    _list = relationshipList
  }

  property get Label() : String {
    return _list.Relationship.Label
  }

  property get References() : List<GosuDocTypeReferenceHtml> {
    return _list.Members.map(\ r -> r.Html)
  }

  function generate() : String {
    return GosuDocTypeRelationshipListHtmlTemplate.renderToString(this)
  }
}

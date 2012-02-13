package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.core.GosuDocRelationship

/**
 * Generates HTML for a relationship list
 */
class GosuDocRelationshipHtml {

  var _list : GosuDocRelationship

  construct(relationshipList: GosuDocRelationship) {
    _list = relationshipList
  }

  property get Label() : String {
    return _list.Type.Label
  }

  property get References() : List<GosuDocTypeReferenceHtml> {
    return _list.Members.map(\ r -> r.Html)
  }

}

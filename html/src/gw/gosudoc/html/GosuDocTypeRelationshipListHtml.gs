package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.core.GosuDocRelationship
uses gw.gosudoc.html.templates.GosuDocTypeRelationshipListHtmlTemplate

/**
 * Generates HTML for a type relationship list
 */
class GosuDocTypeRelationshipListHtml {

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

  function generate(baseUrl: String) : String {
    return GosuDocTypeRelationshipListHtmlTemplate.renderToString(this, baseUrl)
  }
}

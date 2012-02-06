package gw.gosudoc.core

/**
 * Represents a list of related types, such as superclasses, subclasses etc.
 */
class GosuDocTypeRelationshipList {

  var _relationship: GosuDocTypeRelationship as readonly Relationship
  var _members: List<IGosuDocTypeReference> as readonly Members

  construct(relationshipType : GosuDocTypeRelationship, memberList: List<IGosuDocTypeReference>) {
    _relationship = relationshipType
    _members = memberList.freeze()
  }
}

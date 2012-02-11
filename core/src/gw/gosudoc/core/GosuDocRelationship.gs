package gw.gosudoc.core

/**
 * Represents a list of related types, such as superclasses, subclasses etc.
 */
class GosuDocRelationship {

  var _type: GosuDocRelationshipType as readonly Type
  var _members: List<IGosuDocTypeReference> as readonly Members

  construct(relationshipType : GosuDocRelationshipType, memberList: List<IGosuDocTypeReference>) {
    _type = relationshipType
    _members = memberList.freeze()
  }
}

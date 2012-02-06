package gw.gosudoc.core

/**
 * Represents relationships a type can have with other types.
 */
enum GosuDocTypeRelationship {
  SUPERTYPES("Supertypes"), INTERFACES("Interfaces"), SUBTYPES("Known subtypes"), ENHANCEMENTS("Enhancements");

  var _label : String as readonly Label

  private construct(relationshipLabel : String) {
    _label = relationshipLabel
  }
}
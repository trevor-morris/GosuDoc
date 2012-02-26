package gw.gosudoc.core

/**
 * Represents the categories of type that can have GosuDoc: class, interface, enum, enhancement.
 */
enum GosuDocTypeCategory {
  C_CLASS("Class", "Classes"),
  C_INTERFACE("Interface", "Interfaces"),
  C_ENUM("Enum", "Enums"),
  C_ENHANCEMENT("Enhancement", "Enhancements");

  var _label : String as readonly Label
  var _pluralLabel : String as readonly PluralLabel

  private construct(categoryLabel : String, pluralLabel : String) {
    _label = categoryLabel
    _pluralLabel = pluralLabel
  }

}
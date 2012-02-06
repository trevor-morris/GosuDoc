package gw.gosudoc.core

/**
 * Represents the categories of type that can have GosuDoc: class, interface, enum, enhancement.
 */
enum GosuDocTypeCategory {
  C_CLASS("Class"), C_INTERFACE("Interface"), C_ENUM("Enum"), C_ENHANCEMENT("Enhancement");

  var _label : String as readonly Label

  private construct(categoryLabel : String) {
    _label = categoryLabel
  }

}
package gw.gosudoc.core

/**
 * Represents attributes of types and features
 */
enum GosuDocModifier {
  M_PUBLIC("public"),
  M_PRIVATE("private"),
  M_PROTECTED("protected"),
  M_INTERNAL("internal"),
  M_ABSTRACT("abstract"),
  M_STATIC("static"),
  M_READONLY("readonly");

  var _label : String as readonly Label

  private construct(label : String) {
    _label = label
  }

}
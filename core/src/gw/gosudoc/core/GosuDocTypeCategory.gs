package gw.gosudoc.core

/**
 * Represents the categories of type that can have GosuDoc: class, interface, enum, enhancement.
 * <p>
 * This is deliberately not an enum so other categories can be added without editing this class.
 */
class GosuDocTypeCategory {

  public static final var C_CLASS : GosuDocTypeCategory = new GosuDocTypeCategory("Class")
  public static final var C_INTERFACE : GosuDocTypeCategory = new GosuDocTypeCategory("Interface")
  public static final var C_ENUM : GosuDocTypeCategory = new GosuDocTypeCategory("Enum")
  public static final var C_ENHANCEMENT : GosuDocTypeCategory = new GosuDocTypeCategory("Enhancement")

  var _name : String as readonly Name

  construct(memberName : String) {
    _name = memberName
  }

}
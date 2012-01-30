package gw.gosudoc.core

/**
 * A reference to another type, such as a method return or parameter type, or a superclass. This type may or may
 * not refer to one or more types that have GosuDoc information. For example the reference could be to a block type
 * with an int parameter (no GosuDoc) and a Gosu class result (possible GosuDoc).
 */
interface IGosuDocTypeReference {

  /**
   * The full type name as a string, for example int[], SomeClassName. For classes the full name does not include the
   * package name. For nested classes the full name <em>does</em> include the names of the enclosing classes, for
   * example Enclosing.Nested.
   */
  property get FullName() : String

  /**
   * The full type name as a string, but with any occurrences of GosuDoc types first processed by the given type handler
   * block. For example if type names should be replaced with an HTML link then the block could construct the link.
   */
  function formatFullName(formatter : IGosuDocTypeNameFormatter) : String

}
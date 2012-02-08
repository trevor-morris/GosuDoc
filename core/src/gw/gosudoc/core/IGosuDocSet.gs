package gw.gosudoc.core

/**
 * A set of GosuDoc types for which to generate GosuDoc, organized by package
 */
interface IGosuDocSet {

  /**
   * The packages containing all the types for which GosuDoc is to be generated, in case insensitive alphabetical
   * order.
   */
  property get Packages() : List<IGosuDocPackage>

  /**
   * Lookup a type in the doc set by name
   * @return the named IGosuDocType or null if there is no type with this name in the doc set
   */
  function getTypeByName(typeName : String) : IGosuDocType

  /**
   * Lookup types in the doc set by relative name
   * @param typeName relative type name, for example just String or IGosuDocSet
   * @return a possibly empty list of IGosuDocType with the given relative name
   */
  function getTypesByRelativeName(typeName : String) : List<IGosuDocType>
}
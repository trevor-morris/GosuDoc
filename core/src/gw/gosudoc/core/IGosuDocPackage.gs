package gw.gosudoc.core

/**
 * A package containing some number of IGosuDocTypes
 *
 * @see IGosuDocType
 */
interface IGosuDocPackage {

  /**
   * Package name
   */
  property get Name() : String

  /**
   * Package description
   */
  property get Description() : IGosuDocDescription

  /**
   * List of types in the package, in case insensitive alphabetical order
   */
  property get Types() : List<IGosuDocType>

}
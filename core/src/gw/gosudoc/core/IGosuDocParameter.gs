package gw.gosudoc.core

/**
 * GosuDoc information about a method or constructor parameter
 */
interface IGosuDocParameter {

  /**
   * The name of the parameter
   */
  property get Name() : String

  /**
   * The type of the parameter
   */
  property get Type() : IGosuDocTypeReference

  /**
   * The default value for the parameter, or null if it has no default
   */
  property get DefaultValue() : String

  /**
   * Description of the parameter, or null if it has no description
   */
  property get Description() : IGosuDocText
}
package gw.gosudoc.core

/**
 * GosuDoc information about a method
 */
interface IGosuDocProperty extends IGosuDocFeature {

  /**
   * The type of value returned by this property
   */
  property get ValueType() : IGosuDocTypeReference

}
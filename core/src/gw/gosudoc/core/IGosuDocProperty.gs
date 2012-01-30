package gw.gosudoc.core

/**
 * GosuDoc information about a method
 */
interface IGosuDocProperty extends IGosuDocFeature {

  /**
   * Is the property writable?
   */
  property get IsWritable() : boolean

  /**
   * The type of value returned by this property
   */
  property get ValueType() : IGosuDocTypeReference

}
package gw.gosudoc.core

/**
 * GosuDoc information about a method
 */
interface IGosuDocMethod extends IGosuDocFeatureWithParameters {

  /**
   * The return type of the method
   */
  property get ReturnType() : IGosuDocTypeReference

  /**
   * Description of the value returned by this method
   */
  property get ReturnDescription() : IGosuDocText
}
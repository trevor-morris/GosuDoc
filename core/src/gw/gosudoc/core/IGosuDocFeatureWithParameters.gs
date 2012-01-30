package gw.gosudoc.core

/**
 * Common information for GosuDoc feature items (constructors and methods) that have a parameter list
 */
interface IGosuDocFeatureWithParameters extends IGosuDocFeature {

  /**
   * List of parameters for the feature, in declaration order. May be empty but is never null
   */
  property get Parameters() : List<IGosuDocParameter>

}
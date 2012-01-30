package gw.gosudoc.core

/**
 * Common information that all GosuDoc feature items (constructors, properties and methods) have in common
 */
interface IGosuDocFeature {

  /**
   * The name of the feature; for properties and methods this is the property/method name, for constructors it is
   * just "construct"
   */
  property get Name() : String

  /**
   * The unique name of the feature, this includes the name plus, for methods and constructors, the types of the
   * parameters. The combination of name plus parameter types will be unique, even for overloaded names
   */
  property get UniqueName() : String

  /**
   * Description of the feature
   */
  property get Description() : IGosuDocDescription

}
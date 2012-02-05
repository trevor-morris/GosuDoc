package gw.gosudoc.core

/**
 * A cross reference such as an @see or @link tag to another type or feature
 */
class GosuDocCrossReference {

  /** Cross reference type, never null */
  var _type : IGosuDocType as readonly Type

  /** Cross reference feature, may be null if cross reference is just to a type */
  var _feature : IGosuDocFeature as readonly Feature

  /** Label for cross reference, never null */
  var _label : String as readonly Label

  construct(gosuDocType : IGosuDocType, gosuDocFeature : IGosuDocFeature, labelOrNull : String) {
    _type = gosuDocType
    _feature = gosuDocFeature
    if (labelOrNull != null) {
      _label = labelOrNull
    } else if (gosuDocFeature != null) {
      _label = gosuDocType.Name + "." + gosuDocFeature.UniqueName
    } else {
      _label = gosuDocType.Name
    }
  }
}
package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocFeature
uses gw.util.Pair

/**
 * Superclass for classes that generate HTML for a Gosu constructor, property or method
 */
abstract class GosuDocFeatureHtml {

  var _feature: IGosuDocFeature as Feature

  construct(gosuDocFeature: IGosuDocFeature) {
    _feature = gosuDocFeature
  }

  property get Overview(): String {
    return _feature.UniqueName
  }

  property get Summary(): String {
    return _feature.Description.Summary.Html.generate()
  }

  property get Details(): String {
    return _feature.Description.Details.Html.generate()
  }

  property get Anchor(): String {
    return _feature.UniqueName
  }

  abstract property get Signature(): String

  abstract property get Definitions(): List<Pair<String,String>>
}
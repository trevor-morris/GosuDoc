package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocFeature
uses gw.gosudoc.html.templates.GosuDocFeatureHtmlTemplate

/**
 * Superclass for classes that generate HTML for a Gosu constructor, property or method
 */
abstract class GosuDocFeatureHtml {

  var _feature : IGosuDocFeature

  construct(feature : IGosuDocFeature) {
    _feature = feature
  }

  property get Overview() : String {
    return _feature.UniqueName
  }

  property get Summary() : String {
    return _feature.Description.Summary.Html.generate()
  }

  property get Details() : String {
    return _feature.Description.Details.Html.generate()
  }

  function generate() : String {
    return GosuDocFeatureHtmlTemplate.renderToString(this)
  }

  abstract property get Signature() : String
}
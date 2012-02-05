package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocFeature
uses gw.gosudoc.html.templates.GosuDocFeatureHtmlTemplate
uses java.net.URLEncoder

/**
 * Superclass for classes that generate HTML for a Gosu constructor, property or method
 */
abstract class GosuDocFeatureHtml {

  var _feature : IGosuDocFeature as Feature

  construct(gosuDocFeature : IGosuDocFeature) {
    _feature = gosuDocFeature
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

  property get Anchor() : String {
    return URLEncoder.encode(_feature.UniqueName)
  }

  function generate() : String {
    return GosuDocFeatureHtmlTemplate.renderToString(this)
  }

  abstract property get Signature() : String
}
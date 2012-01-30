package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocMethod

/**
 * Generates HTML for a Gosu method
 */
class GosuDocMethodHtml extends GosuDocFeatureHtml {

  var _method : IGosuDocMethod

  construct(method : IGosuDocMethod) {
    super(method)
    _method = method
  }

  override property get Signature() : String {
    return "signature"
  }

}
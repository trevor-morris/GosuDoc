package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocConstructor

/**
 * Generates HTML for a Gosu constructor
 */
class GosuDocConstructorHtml extends GosuDocFeatureHtml {

  var _constructor : IGosuDocConstructor

  construct(constructor : IGosuDocConstructor) {
    super(constructor)
    _constructor = constructor
  }

  override property get Signature() : String {
    return "signature"
  }

}
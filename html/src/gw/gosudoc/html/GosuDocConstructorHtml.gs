package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocConstructor
uses gw.gosudoc.core.IGosuDocFeatureWithParameters
uses java.lang.StringBuilder

/**
 * Generates HTML for a Gosu constructor
 */
class GosuDocConstructorHtml extends GosuDocFeatureWithParametersHtml {

  construct(constructor : IGosuDocConstructor) {
    super(constructor)
  }

  override property get Signature() : String {
    return Feature.Modifiers.Signature + splitAtSeparatorIfTooLong("construct" + ParameterSignaturesWithSeparator)
  }

}
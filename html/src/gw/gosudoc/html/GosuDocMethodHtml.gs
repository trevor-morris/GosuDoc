package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocMethod
uses java.util.jar.Attributes.Name

/**
 * Generates HTML for a Gosu method
 */
class GosuDocMethodHtml extends GosuDocFeatureWithParametersHtml {

  var _method : IGosuDocMethod

  construct(method : IGosuDocMethod) {
    super(method)
    _method = method
  }

  override property get Signature() : String {
    var returnType = _method.ReturnType != null
            ? SEPARATOR + ": " + _method.ReturnType.Html.generate()
            : ""
    return splitAtSeparatorIfTooLong("function " + _method.Name + ParameterSignaturesWithSeparator + returnType)
  }

}
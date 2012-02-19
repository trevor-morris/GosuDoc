package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocMethod
uses java.util.jar.Attributes.Name
uses gw.util.Pair
uses java.util.ArrayList

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
            ? LINE_BREAK + " : " + _method.ReturnType.Html.generate(_method.OwnerType.Html.BaseUrl)
            : ""
    return splitAtSeparatorIfTooLong("function " + _method.Name + ParameterSignaturesWithSeparator + returnType)
  }

  override property get Definitions(): List<Pair<String,String>> {
    var list = new ArrayList<Pair<String,String>>()
    list.addAll(super.Definitions)
    if (not _method.ReturnDescription.IsEmpty) {
      list.add(Pair.make("Returns", _method.ReturnDescription.Html.generate()))
    }
    return list
  }

}
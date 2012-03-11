package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocProperty
uses gw.util.Pair

/**
 * Generates HTML for a Gosu property
 */
class GosuDocPropertyHtml extends GosuDocFeatureHtml {

  var _property : IGosuDocProperty

  construct(prop : IGosuDocProperty) {
    super(prop)
    _property = prop
  }

  override property get Signature() : String {
    return _property.Modifiers.Signature
            + "property ${_property.Name}() : ${_property.ValueType.Html.generate(_property.OwnerType.Html.BaseUrl)}"
  }

  override property get Definitions(): List<Pair<String,String>> {
    return {}
  }
}

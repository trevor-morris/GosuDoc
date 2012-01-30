package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocProperty

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
    return "property get${_property.IsWritable ? '/set' : ''} ${_property.Name}() : ${_property.ValueType.Html.generate()}"
  }

}

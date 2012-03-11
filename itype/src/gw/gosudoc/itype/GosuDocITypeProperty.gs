package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocMethod
uses gw.lang.reflect.IMethodInfo
uses gw.gosudoc.core.IGosuDocTypeReference
uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.core.IGosuDocProperty
uses gw.lang.reflect.IPropertyInfo
uses gw.gosudoc.core.GosuDocDescription
uses java.util.Set
uses gw.gosudoc.core.GosuDocModifier

/**
 * IGosuDocMethod built on IMethodInfo information
 */
internal class GosuDocITypeProperty extends GosuDocITypeFeature implements IGosuDocProperty {

  var _property : IPropertyInfo
  var _valueType : IGosuDocTypeReference as readonly ValueType
  var _uniqueName : String as readonly UniqueName

  construct(owner: GosuDocIType, prop: IPropertyInfo) {
    super(owner, prop.DisplayName, new GosuDocDescription(owner.Scope, prop.Description))
    _property = prop
    _valueType = new GosuDocITypeReference (owner.DocSet, prop.FeatureType)
    _uniqueName = prop.DisplayName
  }

  override function createModifiers() : Set<GosuDocModifier> {
    var modifiers = initializeModifiers(_property)
    if (not _property.Writable) {
      modifiers.add(M_READONLY)
    }
    return modifiers
  }
}
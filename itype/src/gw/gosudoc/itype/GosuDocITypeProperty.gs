package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocMethod
uses gw.lang.reflect.IMethodInfo
uses gw.gosudoc.core.IGosuDocTypeReference
uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.core.IGosuDocProperty
uses gw.lang.reflect.IPropertyInfo

/**
 * IGosuDocMethod built on IMethodInfo information
 */
internal class GosuDocITypeProperty extends GosuDocITypeFeature implements IGosuDocProperty {

  var _valueType : IGosuDocTypeReference as readonly ValueType
  var _writable : boolean as readonly IsWritable
  var _uniqueName : String as readonly UniqueName

  construct(owner: GosuDocIType, prop: IPropertyInfo) {
    super(owner, prop.DisplayName, new GosuDocDescription(owner.Scope, prop.Description))
    _valueType = new GosuDocITypeReference (owner.DocSet, prop.FeatureType)
    _writable = prop.Writable
    _uniqueName = prop.DisplayName
  }

}
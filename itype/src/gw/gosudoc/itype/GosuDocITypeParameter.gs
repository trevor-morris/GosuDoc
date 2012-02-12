package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocParameter
uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.core.IGosuDocTypeReference
uses gw.lang.reflect.IParameterInfo
uses gw.gosudoc.core.GosuDocText

/**
 * Represents a constructor or method parameter
 */
internal class GosuDocITypeParameter implements IGosuDocParameter {

  var _owningFeature : GosuDocITypeFeature as readonly OwningFeature
  var _parameterInfo : IParameterInfo as readonly ParameterInfo
  var _type : IGosuDocTypeReference as readonly Type
  var _description : IGosuDocText as readonly Description

  construct(owner : GosuDocITypeFeature, param : IParameterInfo) {
    _owningFeature = owner
    _parameterInfo = param
    // TODO figure out why this cast is necessary
    var ownerType = owner.OwnerType as GosuDocIType
    _type = new GosuDocITypeReference (ownerType.DocSet, param.FeatureType)
    _description = new GosuDocText(ownerType.Scope, param.Description)
  }

  override property get Name(): String {
    return _parameterInfo.Name
  }

  override property get DefaultValue(): String {
    return null
  }

}
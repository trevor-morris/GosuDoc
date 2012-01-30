package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocConstructor
uses gw.lang.reflect.IConstructorInfo
uses gw.lang.reflect.IMethodInfo
uses gw.gosudoc.core.IGosuDocMethod
uses gw.gosudoc.core.IGosuDocTypeReference
uses gw.gosudoc.core.IGosuDocText

/**
 * IGosuDocMethod built on IMethodInfo information
 */
internal class GosuDocITypeMethod extends GosuDocITypeFeatureWithParameters implements IGosuDocMethod {

  var _returnType : IGosuDocTypeReference as readonly ReturnType
  var _returnDescription : IGosuDocText as readonly ReturnDescription
  var _uniqueName : String as readonly UniqueName

  construct(owner : GosuDocIType, method : IMethodInfo) {
    super(owner, method.DisplayName, new GosuDocDescription(owner.Scope, method.Description), method.Parameters)
    _returnType = new GosuDocITypeReference (owner.DocSet, method.ReturnType)
    _returnDescription = new GosuDocText(owner.Scope, method.ReturnDescription)
    _uniqueName = method.DisplayName + '(' + ParametersAsString + ") : " + _returnType.FullName
  }

}
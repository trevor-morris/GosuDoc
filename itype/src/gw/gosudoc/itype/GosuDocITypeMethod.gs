package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocConstructor
uses gw.lang.reflect.IConstructorInfo
uses gw.lang.reflect.IMethodInfo
uses gw.gosudoc.core.IGosuDocMethod
uses gw.gosudoc.core.IGosuDocTypeReference
uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.core.GosuDocDescription
uses gw.gosudoc.core.GosuDocText
uses gw.lang.reflect.TypeSystem
uses gw.lang.reflect.java.JavaTypes

/**
 * IGosuDocMethod built on IMethodInfo information
 */
internal class GosuDocITypeMethod extends GosuDocITypeFeatureWithParameters implements IGosuDocMethod {

  var _returnType : IGosuDocTypeReference as readonly ReturnType
  var _returnDescription : IGosuDocText as readonly ReturnDescription
  var _uniqueName : String as readonly UniqueName

  construct(owner : GosuDocIType, method : IMethodInfo) {
    super(owner, method.DisplayName, new GosuDocDescription(owner.Scope, method.Description), method.Parameters)
    _returnType = JavaTypes.VOID().equals(method.ReturnType)
            ? null : new GosuDocITypeReference(owner.DocSet, method.ReturnType)
    _returnDescription = new GosuDocText(owner.Scope, method.ReturnDescription)
    _uniqueName = method.DisplayName + '(' + ParametersAsString + ")"
  }

}
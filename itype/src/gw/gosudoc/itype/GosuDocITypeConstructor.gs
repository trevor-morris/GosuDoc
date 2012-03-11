package gw.gosudoc.itype

uses gw.lang.reflect.IConstructorInfo
uses gw.gosudoc.core.IGosuDocConstructor
uses gw.gosudoc.core.IGosuDocParameter
uses gw.gosudoc.core.IGosuDocDescription
uses gw.gosudoc.core.GosuDocDescription
uses gw.gosudoc.core.GosuDocModifier
uses java.util.Set

/**
 * IGosuDocConstructor built on IConstructorInfo information
 */
internal class GosuDocITypeConstructor extends GosuDocITypeFeatureWithParameters implements IGosuDocConstructor {

  static var CONSTRUCTOR_NAME = "construct"

  var _constructor : IConstructorInfo
  var _uniqueName : String as readonly UniqueName

  construct(owner : GosuDocIType, constructor : IConstructorInfo) {
    super(owner, CONSTRUCTOR_NAME, new GosuDocDescription(owner.Scope, constructor.Description), constructor.Parameters)
    _constructor = constructor
    _uniqueName = CONSTRUCTOR_NAME + '(' + ParametersAsString + ')'
  }

  override function createModifiers(): Set<GosuDocModifier> {
    return initializeModifiers(_constructor)
  }

}
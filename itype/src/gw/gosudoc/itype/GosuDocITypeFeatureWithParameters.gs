package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocConstructor
uses gw.lang.reflect.IConstructorInfo
uses gw.gosudoc.core.IGosuDocFeatureWithParameters
uses gw.lang.reflect.IParameterInfo
uses gw.gosudoc.core.IGosuDocDescription

/**
 * Superclass for GosuDoc constructors and methods
 */
internal abstract class GosuDocITypeFeatureWithParameters extends GosuDocITypeFeature implements IGosuDocFeatureWithParameters {

  var _parameters : List<GosuDocITypeParameter> as readonly Parameters

  construct(owner : GosuDocIType, featureName : String, featureDescription : IGosuDocDescription, parameterInfos : IParameterInfo[]) {
    super(owner, featureName, featureDescription)
    _parameters = parameterInfos.map(\ p -> new GosuDocITypeParameter (this, p)).toList().freeze()
  }

  protected property get ParametersAsString() : String {
    return _parameters.map( \ p -> p.Type.FullName).join(",")
  }
}
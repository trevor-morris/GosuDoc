package gw.gosudoc.core

uses java.lang.Character
uses java.util.Collection
uses java.util.ArrayList

/**
 * A cross reference such as an @see or @link tag to another type or feature
 */
class GosuDocCrossReference {

  /** Cross reference type, or null if cross reference could not be resolved */
  var _type : IGosuDocType as readonly Type

  /**
   * Cross reference feature, may be null if cross reference is just to a type or could not be resolved. If Feature
   * is non null then Type is guaranteed to be non null as well.
   */
  var _feature : IGosuDocFeature as readonly Feature

  /** Label for cross reference, never null */
  var _label : String as readonly Label

  construct(gosuDocType : IGosuDocType, gosuDocFeature : IGosuDocFeature, tagLabel : String) {
    _type = gosuDocType
    _feature = gosuDocFeature
    _label = tagLabel
  }

  /**
   * True if the cross reference resolved to a type or feature elsewhere in the GosuDoc set
   */
  property get Resolved() : boolean {
    return _type != null
  }

  internal static function parse(scope: GosuDocScope, tagArguments: String) : GosuDocCrossReference {
    var labelSeparatorIndex = findLabelSeparator(tagArguments)
    var referenceAsString = labelSeparatorIndex >= 0 ? tagArguments.substring(0, labelSeparatorIndex) : tagArguments
    var explicitLabel = labelSeparatorIndex >= 0 ? tagArguments.substring(labelSeparatorIndex + 1).trim() : null
    var featureSeparatorIndex = referenceAsString.indexOf('#')
    var typeReferenceAsString = featureSeparatorIndex >= 0
            ? referenceAsString.substring(0, featureSeparatorIndex) : referenceAsString
    var featureReferenceAsString = featureSeparatorIndex >= 0
            ? referenceAsString.substring(featureSeparatorIndex + 1) : null
    var type = resolveType(scope, typeReferenceAsString)
    var feature = resolveFeature(type, featureReferenceAsString)
    var label = constructLabel(scope, referenceAsString, explicitLabel, featureSeparatorIndex >= 0, type, feature)
    return new GosuDocCrossReference(type, feature, label)
  }

  private static function findLabelSeparator(tagArguments: String) : int {
    return findSeparator(tagArguments, 0, \ ch -> Character.isWhitespace(ch))
  }

  private static function resolveType(scope: GosuDocScope, typeName : String) : IGosuDocType {
    var type = scope.DocSet.getTypeByName(typeName)
    if (type == null) {
      if (typeName.Empty) {
        type = scope.Type
      } else if (not typeName.contains(".")) {
        var fullName = scope.Package.Name + "." + typeName
        type = scope.DocSet.getTypeByName(fullName)
        if (type == null) {
          var possibleMatches = scope.DocSet.getTypesByRelativeName(typeName)
          if (possibleMatches.Count == 1) {
            type = possibleMatches[0]
          }
        }
      }
    }
    return type
  }

  private static function resolveFeature(type : IGosuDocType, featureAsString : String) : IGosuDocFeature {
    if (type == null or featureAsString == null) {
      return null
    }
    var parenStart = featureAsString.indexOf('(')
    var featureName = parenStart >= 0 ? featureAsString.substring(0, parenStart) : featureAsString
    var featureParams = parenStart >= 0 ? featureAsString.substring(parenStart) : null
    var combinedFeatures = combinedFeatures(type, featureParams != null)
    var matchesByName = combinedFeatures.where( \ f -> f.Name.equalsIgnoreCase(featureName))
    if (matchesByName.Count <= 1) {
      return matchesByName.HasElements ? matchesByName[0] : null
    }
    var matchesByExactName = matchesByName.where( \ f -> f.Name == featureName)
    if (matchesByExactName.Empty) {
      return matchesByName[0]
    }
    if (matchesByExactName.Count == 1 or featureParams == null) {
      return matchesByExactName[0]
    }
    return resolveFeatureByParameters(matchesByExactName, featureParams)
  }

  private static function combinedFeatures(type : IGosuDocType, hasParameters : boolean) : Collection<IGosuDocFeature> {
    var combinedFeatures : Collection<IGosuDocFeature> = type.Constructors
    if (not hasParameters) {
      combinedFeatures = combinedFeatures.concat(type.Properties)
    }
    return combinedFeatures.concat(type.Methods)
  }

  private static function resolveFeatureByParameters(features : List<IGosuDocFeature>, featureParametersAsString : String) : IGosuDocFeature {
    var featuresWithParameters = features.whereTypeIs(IGosuDocFeatureWithParameters)
    if (featuresWithParameters.Count <= 1) {
      return featuresWithParameters.Empty ? features[0] : featuresWithParameters[0]
    }
    var parameters = splitParameters(stripParentheses(featureParametersAsString))
    var featuresWithRightNumberOfParameters = featuresWithParameters.where(\ f -> f.Parameters.Count == parameters.Count)
    if (featuresWithRightNumberOfParameters.Count <= 1) {
      return featuresWithRightNumberOfParameters.Empty ? featuresWithParameters[0] : featuresWithRightNumberOfParameters[0]
    }
    return resolveFeatureByTypeOfParameters(featuresWithRightNumberOfParameters, parameters)
  }

  private static function resolveFeatureByTypeOfParameters(features : List<IGosuDocFeatureWithParameters>, parameters : List<String>) : IGosuDocFeature {
    for (feature in features) {
      if (parameterTypesMatch(feature.Parameters, parameters)) {
        return feature
      }
    }
    return features[0]
  }

  private static function parameterTypesMatch(parameters : List<IGosuDocParameter>, parameterStrings : List<String>) : boolean {
    for (parameter in parameters index i) {
      if (not parameterTypeMatches(parameter.Type, parameterStrings[i])) {
        return false
      }
    }
    return true
  }

  private static function parameterTypeMatches(type : IGosuDocTypeReference, typeString : String) : boolean {
    var typeName = type.formatFullName(new IGosuDocTypeNameFormatter() {
      override property get IncludeBlockParameterNames(): boolean {
        return false
      }
      override function formatTypeName(fullName: java.lang.String, relativeName: String): String {
        return relativeName
      }
      override function formatGosuDocTypeName(type: IGosuDocType): String {
        return type.Name
      }
    })
    return normalizeTypeName(typeName).equals(normalizeTypeName(typeString))
  }

  /** Strip out spaces, generics and package names */
  private static function normalizeTypeName(typeName: String) : String {
    return typeName.replaceAll("\\s*","")
            .replaceAll("<[^>]+>", "")
            .replaceAll("(\\w+\\.)+", "")
  }

  private static function stripParentheses(featureParameters : String) : String {
    return featureParameters.replaceAll("^\\s*\\(", "").replaceAll("\\)\\s*$", "")
  }

  private static function splitParameters(featureParameters : String) : List<String> {
    var list = new ArrayList<String>()
    var pos = 0
    var isComma = \ ch : char -> ch == ','
    var nextPos = findSeparator(featureParameters, pos, isComma)
    while (nextPos >= 0) {
      list.add(featureParameters.substring(pos, nextPos).trim())
      pos = nextPos + 1
      nextPos = findSeparator(featureParameters, pos, isComma)
    }
    list.add(featureParameters.substring(pos).trim())
    return list
  }

  private static function findSeparator(s : String, startPos : int, condition : block(ch : char) : boolean) : int {
    var parenNesting = 0
    for (pos in startPos..|s.length) {
      var ch = s[pos]
      if (ch == '(') {
        parenNesting++
      } else if (ch == ')') {
        if (parenNesting > 0) {
          parenNesting--
        }
      }
      if (parenNesting == 0 and condition(ch.charAt(0))) {
        return pos
      }
    }
    return -1
  }

  private static function constructLabel(
          scope : GosuDocScope,
          full: String,
          explicitLabel: String,
          hasFeature: boolean,
          type: IGosuDocType,
          feature: IGosuDocFeature) : String {
    if (explicitLabel != null) {
      return explicitLabel
    }
    var label = full
    if (not hasFeature and type != null) {
      label = type.Name
    } else if (hasFeature and feature != null) {
      if (scope.Type == type) {
        label = feature.UniqueName
      } else {
        label = type.Name + "." + feature.UniqueName
      }
    }
    return label
  }
}
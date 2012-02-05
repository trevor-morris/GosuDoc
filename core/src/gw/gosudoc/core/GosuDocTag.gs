package gw.gosudoc.core

uses java.lang.Character
uses java.util.Collection
uses java.util.ArrayList

/**
 * Represents a tag within GosuDoc HTML text, such as @link or @see
 */
class GosuDocTag {

  /** The text enclosing this tag, also gives access to the scope */
  var _text : IGosuDocText as readonly EnclosingText

  /** The tag name, such as link, see etc. */
  var _name : String as readonly Name

  /** Arguments to the tag */
  var _arguments : String as readonly Arguments

  construct(text : IGosuDocText, tagName: String, tagArguments: String) {
    _text = text
    _name = tagName
    _arguments = tagArguments
  }

  /**
   * If the body of the tag is a cross reference to another GosuDoc type or feature, returns a cross
   * reference object. Otherwise return null
   */
  function parseCrossReference() : GosuDocCrossReference {
    var labelSeparatorIndex = findLabelSeparator()
    var referenceAsString = labelSeparatorIndex >= 0 ? _arguments.substring(0, labelSeparatorIndex) : _arguments
    var label = labelSeparatorIndex >= 0 ? _arguments.substring(labelSeparatorIndex + 1).trim() : null
    var featureSeparatorIndex = referenceAsString.indexOf('#')
    var typeReferenceAsString = featureSeparatorIndex >= 0
            ? referenceAsString.substring(0, featureSeparatorIndex) : referenceAsString
    var featureReferenceAsString = featureSeparatorIndex >= 0
            ? referenceAsString.substring(featureSeparatorIndex + 1) : null
    var type = resolveType(typeReferenceAsString)
    if (type == null) {
      return null
    }
    return new GosuDocCrossReference(type, resolveFeature(type, featureReferenceAsString), label)
  }

  private function findLabelSeparator() : int {
    return findSeparator(_arguments, 0, \ ch -> Character.isWhitespace(ch))
  }

  private function resolveType(typeName : String) : IGosuDocType {
    var type = _text.Scope.DocSet.getTypeByName(typeName)
    if (type == null) {
      if (not typeName.contains(".")) {
        var fullName = _text.Scope.Package.Name + "." + typeName
        type = _text.Scope.DocSet.getTypeByName(fullName)
      }
    }
    return type
  }

  private function resolveFeature(type : IGosuDocType, featureAsString : String) : IGosuDocFeature {
    if (featureAsString == null) {
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

  private function combinedFeatures(type : IGosuDocType, hasParameters : boolean) : Collection<IGosuDocFeature> {
    var combinedFeatures : Collection<IGosuDocFeature> = type.Constructors
    if (not hasParameters) {
      combinedFeatures = combinedFeatures.concat(type.Properties)
    }
    return combinedFeatures.concat(type.Methods)
  }

  private function resolveFeatureByParameters(features : List<IGosuDocFeature>, featureParametersAsString : String) : IGosuDocFeature {
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

  private function resolveFeatureByTypeOfParameters(features : List<IGosuDocFeatureWithParameters>, parameters : List<String>) : IGosuDocFeature {
    for (feature in features) {
      if (parameterTypesMatch(feature.Parameters, parameters)) {
        return feature
      }
    }
    return features[0]
  }

  private function parameterTypesMatch(parameters : List<IGosuDocParameter>, parameterStrings : List<String>) : boolean {
    for (parameter in parameters index i) {
      if (not parameterTypeMatches(parameter.Type, parameterStrings[i])) {
        return false
      }
    }
    return true
  }

  private function parameterTypeMatches(type : IGosuDocTypeReference, typeString : String) : boolean {
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
  private function normalizeTypeName(typeName: String) : String {
    return typeName.replaceAll("\\s*","")
            .replaceAll("<[^>]+>", "")
            .replaceAll("(\\w+\\.)+", "")
  }

  private function stripParentheses(featureParameters : String) : String {
    return featureParameters.replaceAll("^\\s*\\(", "").replaceAll("\\)\\s*$", "")
  }

  private function splitParameters(featureParameters : String) : List<String> {
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

  private function findSeparator(s : String, startPos : int, condition : block(ch : char) : boolean) : int {
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
}
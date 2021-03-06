package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocFeatureWithParameters
uses java.lang.StringBuilder
uses gw.util.Pair
uses java.util.regex.Pattern

/**
 * Superclass for classes that generate HTML for a Gosu constructor, property or method
 */
abstract class GosuDocFeatureWithParametersHtml extends GosuDocFeatureHtml {

  static final var MAX_SIGNATURE_LENGTH = 120
  protected static final var LINE_BREAK : String = "\n"
  static final var LINE_BREAK_PATTERN = Pattern.compile(LINE_BREAK + "\\s*", Pattern.MULTILINE)

  construct(gosuDocFeature : IGosuDocFeatureWithParameters) {
    super(gosuDocFeature)
  }

  protected function splitAtSeparatorIfTooLong(line : String) : String {
    if (lengthIgnoringTags(line) > MAX_SIGNATURE_LENGTH) {
      return LINE_BREAK_PATTERN.matcher(line).replaceAll("\n    ")
    } else {
      return line.replace(LINE_BREAK, "")
    }
  }

  protected property get ParameterSignaturesWithSeparator() : String {
    var builder = new StringBuilder()
    builder.append("(").append(LINE_BREAK)
    for (p in FeatureWithParameters.Parameters index i) {
      if (i != 0) {
        builder.append(",").append(LINE_BREAK).append(" ")
      }
      builder.append(p.Name)
      builder.append(" : ")
      builder.append(p.Type.Html.generate(FeatureWithParameters.OwnerType.Html.BaseUrl))
    }
    builder.append(")")
    return builder.toString()
  }

  override property get Definitions(): List<Pair<String,String>> {
    var parameterDefinitions = generateParameterDefinitions()
    return parameterDefinitions.HasContent ? {Pair.make("Parameters", parameterDefinitions)} : {}
  }

  private property get FeatureWithParameters() : IGosuDocFeatureWithParameters {
    return Feature as IGosuDocFeatureWithParameters
  }

  private function lengthIgnoringTags(line : String) : int {
    var inTag = false
    var count = 0
    for (i in 0..|line.length()) {
      var ch = line.charAt(i)
      if (ch == '<') {
        inTag = true
      }
      if (not inTag and ch != LINE_BREAK) {
        count++
      }
      if (inTag and ch == '>') {
        inTag = false
      }
    }
    return count
  }

  private function generateParameterDefinitions() : String {
    var parameters = FeatureWithParameters.Parameters.where( \ p -> not p.Description.IsEmpty)
    if (parameters.Empty) {
      return ""
    }
    var builder = new StringBuilder("<dl>\n")
    for (p in parameters) {
      builder.append("<dt>").append(p.Name).append("</dt>")
      builder.append("<dd>").append(p.Description.Html.generate()).append("</dd>")
    }
    builder.append("</dl>")
    return builder.toString()
  }
}
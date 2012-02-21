package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.core.IGosuDocTypeNameFormatter
uses gw.gosudoc.core.IGosuDocTypeReference

/**
 * Generates HTML for a type reference, which may include a link to another GosuDoc page
 */
class GosuDocTypeReferenceHtml {

  static var WELL_KNOWN_PACKAGES = {
    "java.lang", "java.util"
  }.map( \ p -> p + ".").freeze()

  var _ref : IGosuDocTypeReference

  construct(ref : IGosuDocTypeReference) {
    _ref = ref
  }

  function generate(baseUrl: String) : String {
    return _ref.formatFullName(new IGosuDocTypeNameFormatter() {

      override property get IncludeBlockParameterNames(): boolean {
        return true
      }

      override function formatTypeName(fullName: String, relativeName: String): String {
        for (prefix in WELL_KNOWN_PACKAGES) {
          if (fullName.startsWith(prefix)) {
            return fullName.substring(prefix.length())
          }
        }
        return fullName
      }

      override function formatGosuDocTypeName(type: IGosuDocType): String {
        return '<a href="${type.Html.url(baseUrl)}">${type.Name}</a>'
      }
    }
)
  }
}

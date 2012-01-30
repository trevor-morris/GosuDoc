package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.core.IGosuDocTypeNameFormatter
uses gw.gosudoc.core.IGosuDocTypeReference

/**
 * Generates HTML for a type reference, which may include a link to another GosuDoc page
 */
class GosuDocTypeReferenceHtml {

  final static var FORMATTER = new IGosuDocTypeNameFormatter() {

    override property get IncludeBlockParameterNames(): boolean {
      return true
    }

    override function formatTypeName(fullName: String, relativeName: String): String {
      return fullName
    }

    override function formatGosuDocTypeName(type: IGosuDocType): String {
      return '<a href="${type.Html.Path}">${type.Name}</a>'
    }
  }

  var _ref : IGosuDocTypeReference

  construct(ref : IGosuDocTypeReference) {
    _ref = ref
  }

  function generate() : String {
    return _ref.formatFullName(FORMATTER)
  }
}

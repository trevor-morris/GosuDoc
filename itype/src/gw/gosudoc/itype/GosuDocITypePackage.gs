package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocPackage
uses java.lang.Comparable
uses gw.gosudoc.core.IGosuDocType
uses java.util.Collections
uses java.util.ArrayList
uses gw.gosudoc.core.IGosuDocDescription
uses gw.gosudoc.core.GosuDocDescription
uses gw.gosudoc.core.GosuDocScope
uses gw.lang.reflect.IType
uses java.util.regex.Pattern

/**
 * IGosuDocPackage built on ITypeInfo information
 */
internal class GosuDocITypePackage implements IGosuDocPackage, Comparable<GosuDocITypePackage> {

  static final var BODY_PATTERN = Pattern.compile(
          "<body[^>]*>(.*)</body>",
          Pattern.MULTILINE | Pattern.DOTALL | Pattern.CASE_INSENSITIVE
  )

  var _docSet : GosuDocITypeSet
  var _name : String as readonly Name
  var _description : IGosuDocDescription as readonly Description
  var _types = new ArrayList<GosuDocIType>()

  construct(docSet : GosuDocITypeSet, packageName : String, typeInPackage : IType) {
    _docSet = docSet
    _name = packageName
    _description = readPackageHtmlFile(typeInPackage)
  }

  function addType(type : GosuDocIType) {
    var insertionPoint = Collections.binarySearch(_types, type)
    if (insertionPoint < 0) {
      insertionPoint = -(insertionPoint + 1)
    }
    _types.add(insertionPoint, type)
  }

  override property get Types() : List<GosuDocIType> {
    return _types.freeze()
  }

  override function compareTo(other: GosuDocITypePackage): int {
    return String.CASE_INSENSITIVE_ORDER.compare(Name, other.Name)
  }

  private function readPackageHtmlFile(type : IType) : IGosuDocDescription {
    var file = type.TypeLoader.getResourceFile(_name.replace(".", "/") + "/package.html")
    var contents = file != null ? extractBody(file.read()) : ""
    return new GosuDocDescription(new GosuDocScope(_docSet, this, null), contents)
  }

  private function extractBody(fileContents : String) : String {
    var matcher = BODY_PATTERN.matcher(fileContents)
    if (matcher.find()) {
      return matcher.group(1).trim()
    }
    return fileContents
  }
}
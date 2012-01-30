package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocPackage
uses java.lang.Comparable
uses gw.gosudoc.core.IGosuDocType
uses java.util.Collections
uses java.util.ArrayList

/**
 * IGosuDocPackage built on ITypeInfo information
 */
internal class GosuDocITypePackage implements IGosuDocPackage, Comparable<GosuDocITypePackage> {

  var _name : String as readonly Name
  var _types = new ArrayList<GosuDocIType>()

  construct(packageName : String) {
    _name = packageName
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
}
package gw.gosudoc.itype

uses gw.lang.reflect.IType
uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.core.IGosuDocConstructor
uses gw.gosudoc.core.IGosuDocMethod
uses gw.gosudoc.core.IGosuDocProperty
uses gw.gosudoc.core.IGosuDocPackage
uses gw.lang.reflect.ITypeInfo
uses gw.gosudoc.core.GosuDocTypeCategory
uses gw.gosudoc.core.IGosuDocDescription
uses java.lang.Comparable
uses gw.gosudoc.core.GosuDocScope
uses gw.gosudoc.core.GosuDocDescription

/**
 * IGosuDocType built on IType and ITypeInfo information
 */
internal class GosuDocIType implements IGosuDocType, Comparable<GosuDocIType> {

  var _docSet : GosuDocITypeSet as readonly DocSet
  var _type: IType as readonly Type
  var _package : GosuDocITypePackage as readonly Package
  var _scope : GosuDocScope as readonly Scope
  var _description : IGosuDocDescription as readonly Description
  var _category : GosuDocTypeCategory as readonly Category
  var _constructors : List<GosuDocITypeConstructor> as readonly Constructors
  var _properties : List<GosuDocITypeProperty> as readonly Properties
  var _methods : List<GosuDocITypeMethod> as readonly Methods

  static function createFromIType(docSet : GosuDocITypeSet, type : IType) : List<GosuDocIType> {
    return {new GosuDocIType (docSet, type)}
  }

  private construct(docSetInit: GosuDocITypeSet, iType : IType) {
    _docSet = docSetInit
    _type = iType
    _package = docSetInit.getPackageByName(packageName(iType))
    _scope = new GosuDocScope(_docSet, _package, this)
    _category = findCategory(iType)
    _description = new GosuDocDescription(_scope, iType.TypeInfo.Description)
    _constructors = findConstructors(iType.TypeInfo)
    _properties = findProperties(iType.TypeInfo)
    _methods = findMethods(iType.TypeInfo)
    _package.addType(this)
  }

  override property get Name(): java.lang.String {
    return _type.TypeInfo.Name
  }

  override function compareTo(other: GosuDocIType): int {
    return String.CASE_INSENSITIVE_ORDER.compare(Name, other.Name)
  }

  private function findCategory(iType : IType) : GosuDocTypeCategory {
    if (iType.Enhancement) {
      return GosuDocTypeCategory.C_ENHANCEMENT
    } else if (iType.Interface) {
      return GosuDocTypeCategory.C_INTERFACE
    } else if (iType.Enum) {
      return GosuDocTypeCategory.C_ENUM
    } else {
      return GosuDocTypeCategory.C_CLASS
    }
  }

  private function findConstructors(info : ITypeInfo) : List<GosuDocITypeConstructor> {
    return info.Constructors.map(\ c -> new GosuDocITypeConstructor (this, c)).sort().freeze()
  }

  private function findProperties(info : ITypeInfo) : List<GosuDocITypeProperty> {
    return info.Properties.where(\p -> p.Container == info)
            .map(\ p -> new GosuDocITypeProperty (this, p))
            .sort().freeze()
  }

  private function findMethods(info: ITypeInfo): List <GosuDocITypeMethod> {
    return info.Methods.where(\m -> m.Container == info and not m.DisplayName.startsWith("@"))
            .map(\m -> new GosuDocITypeMethod (this, m))
            .sort().freeze()
  }

  private function packageName(iType : IType) : String {
    return iType.Name.substring(0, iType.Name.length - (iType.RelativeName.length + 1))
  }

}
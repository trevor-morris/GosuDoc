package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocSet
uses gw.gosudoc.core.IGosuDocPackage
uses gw.lang.reflect.IType
uses java.util.List
uses java.util.Set
uses java.util.Collections
uses java.util.HashSet
uses java.util.ArrayList
uses java.util.Map
uses java.util.HashMap
uses gw.util.CaseInsensitiveHashMap
uses gw.gosudoc.core.GosuDocScope

/**
 * Implementation of {@link IGosuDocSet} based on a set of ITypes
 */
class GosuDocITypeSet implements IGosuDocSet, ITypeToGosuDocType {

  var _scope : GosuDocScope as readonly Scope
  var _gosuDocTypesByName : Map<String, GosuDocIType>
  var _packagesByName = new CaseInsensitiveHashMap<String, GosuDocITypePackage>();

  construct(typeSet : Set<IType>) {
    _scope = new GosuDocScope(this, null, null)
    _gosuDocTypesByName = new CaseInsensitiveHashMap<String, GosuDocIType>(typeSet.Count)
    for (type in typeSet) {
      for (gosuDocType in GosuDocIType.createFromIType(this, type)) {
        _gosuDocTypesByName.put(gosuDocType.Type.Name, gosuDocType)
      }
    }
  }

  function getPackageByName(name : String) : GosuDocITypePackage {
    if (not _packagesByName.containsKey(name)) {
      _packagesByName.put(name, new GosuDocITypePackage (name))
    }
    return _packagesByName.get(name)
  }

  override function getTypeByName(typeName : String) : GosuDocIType {
    return _gosuDocTypesByName.get(typeName)
  }

  override function gosuDocTypeForIType(type: IType): GosuDocIType {
    return getTypeByName(type.Name)
  }

  override property get Packages(): List<IGosuDocPackage> {
    return _packagesByName.Values.toList().sort()
  }

}
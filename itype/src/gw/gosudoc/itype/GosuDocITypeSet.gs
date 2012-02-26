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
uses java.lang.IllegalArgumentException
uses gw.internal.gosu.module.DefaultSingleModule
uses gw.fs.FileFactory
uses gw.lang.reflect.TypeSystem
uses gw.fs.IDirectory

/**
 * Implementation of {@link IGosuDocSet} based on a set of ITypes
 */
class GosuDocITypeSet implements IGosuDocSet, ITypeToGosuDocType {

  var _scope : GosuDocScope as readonly Scope
  var _gosuDocTypesByName : Map<String, GosuDocIType>
  var _gosuDocTypesByRelativeName : Map<String, List<GosuDocIType>>
  var _packagesByName = new CaseInsensitiveHashMap<String, GosuDocITypePackage>();

  static function create(sourceDirectories: List<String>, packageNames : List<String>) : IGosuDocSet {
    if (sourceDirectories.Empty and packageNames.Empty) {
      throw new IllegalArgumentException("Must specify either source paths or package names")
    }
    loadSourceDirectories(sourceDirectories)
    var packageNameSet = findPackages(packageNames, sourceDirectories)
    var packageNamePrefixes = packageNameSet.map( \ name -> not name.endsWith(".") ? name + "." : name)
    var typeSet = new HashSet<IType>()
    for (typeName in TypeSystem.getAllTypeNames()) {
      var typeNameString = String.valueOf(typeName)
      if (packageNamePrefixes.hasMatch( \ packagePrefix -> typeNameString.startsWith(packagePrefix))) {
        typeSet.add(TypeSystem.getByFullName(typeNameString))
      }
    }
    return new GosuDocITypeSet(typeSet)
  }

  construct(typeSet : Set<IType>) {
    _scope = new GosuDocScope(this, null, null)
    _gosuDocTypesByName = new CaseInsensitiveHashMap<String, GosuDocIType>(typeSet.Count)
    _gosuDocTypesByRelativeName = new CaseInsensitiveHashMap<String, List<GosuDocIType>>(typeSet.Count)
    for (type in typeSet) {
      for (gosuDocType in GosuDocIType.createFromIType(this, type)) {
        _gosuDocTypesByName.put(gosuDocType.Type.Name, gosuDocType)
        if (_gosuDocTypesByRelativeName.containsKey(gosuDocType.Type.RelativeName)) {
          _gosuDocTypesByRelativeName.get(gosuDocType.Type.RelativeName).add(gosuDocType)
        } else {
          _gosuDocTypesByRelativeName.put(gosuDocType.Type.RelativeName, {gosuDocType})
        }
      }
    }
  }

  function getPackageForType(type : IType) : GosuDocITypePackage {
    var name = packageName(type)
    if (not _packagesByName.containsKey(name)) {
      _packagesByName.put(name, new GosuDocITypePackage(this, name, type))
    }
    return _packagesByName.get(name)
  }

  override function getTypeByName(typeName : String) : GosuDocIType {
    return _gosuDocTypesByName.get(typeName)
  }

  override function getTypesByRelativeName(typeName : String) : List<GosuDocIType> {
    var matches = _gosuDocTypesByRelativeName.get(typeName)
    return matches != null ? Collections.unmodifiableList(matches) : Collections.emptyList()
  }

  override function gosuDocTypeForIType(type: IType): GosuDocIType {
    return getTypeByName(type.Name)
  }

  override property get Packages(): List<IGosuDocPackage> {
    return _packagesByName.Values.toList().sort()
  }

  private function packageName(iType : IType) : String {
    return iType.Name.substring(0, iType.Name.length - (iType.RelativeName.length + 1))
  }

  private static function loadSourceDirectories(sourceDirectories: List<String>) {
    if (sourceDirectories.HasElements) {
      var singleModule = GosuShop.getModule(DefaultSingleModule.Type)
      var modified = false
      var sourcePath = singleModule.SourcePath.copy()
      for (sourceDirectory in sourceDirectories) {
        var sourceIDirectory = FileFactory.instance().getIDirectory(sourceDirectory)
        if (not sourcePath.contains(sourceIDirectory)) {
          sourcePath.add(sourceIDirectory)
          modified = true
        }
      }
      if (modified) {
        singleModule.setSourcePath(sourcePath)
        TypeSystem.refresh()
      }
    }
  }

  private static function findPackages(packageNames: List<String>, sourceDirectories: List<String>): Set<String> {
    var packageNamesSet = packageNames.toSet()
    if (packageNamesSet.Empty) {
      for (sourceDirectory in sourceDirectories) {
        addPackagesInDirectory(packageNamesSet, "", FileFactory.instance().getIDirectory(sourceDirectory))
      }
    }
    return packageNamesSet
  }

  private static function addPackagesInDirectory(packageNames: Set<String>, packageName: String, directory: IDirectory) {
    if (directory.listFiles().HasElements and packageName.HasContent) {
      packageNames.add(packageName)
    }
    for (subDirectory in directory.listDirs()) {
      var subPackageName = packageName.HasContent ? packageName + "." + subDirectory.Name : subDirectory.Name
      addPackagesInDirectory(packageNames, subPackageName, subDirectory)
    }
  }
}
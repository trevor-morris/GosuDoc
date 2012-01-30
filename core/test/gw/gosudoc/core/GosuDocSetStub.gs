package gw.gosudoc.core

uses java.util.Collections

/**
 * Stub IGosuDocSet implementation for use in tests
 */
class GosuDocSetStub implements IGosuDocSet {

  static function emptyScope() : GosuDocScope {
    return new GosuDocScope(new GosuDocSetStub(), null, null)
  }

  override property get Packages(): List<IGosuDocPackage> {
    return Collections.emptyList()
  }

  override function getTypeByName(typeName: String): IGosuDocType {
    return null
  }
}
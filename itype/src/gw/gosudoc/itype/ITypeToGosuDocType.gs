package gw.gosudoc.itype

uses gw.lang.reflect.IType
uses gw.gosudoc.core.IGosuDocType

/**
 * Lookup GosuDocTypes by IType
 */
interface ITypeToGosuDocType {

  /**
   * Return the GosuDocType corresponding to the given IType, or null if there is no corresponding GosuDocType
   */
  function gosuDocTypeForIType(type : IType) : IGosuDocType
}
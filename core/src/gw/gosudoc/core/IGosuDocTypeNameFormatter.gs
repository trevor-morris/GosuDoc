package gw.gosudoc.core

/**
 * Specifies details of how a type name should be formatted
 */
interface IGosuDocTypeNameFormatter {

  /** Should block types include the names of any parameters to the block? */
  property get IncludeBlockParameterNames() : boolean

  /**
   * Format a type name, if the type does <em>not</em> correspond to an IGosuDocType
   * @param name the full type name, including any package or other prefix
   * @param relativeName the relative name, for example just the class name for a Gosu class
   */
  function formatTypeName(fullName : String, relativeName : String) : String

  /** Format a type name, if the type does correspond to an IGosuDocType */
  function formatGosuDocTypeName(type : IGosuDocType) : String
}

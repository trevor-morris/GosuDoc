package gw.gosudoc.core

uses java.lang.NullPointerException
uses java.lang.IllegalArgumentException

/**
 * Scope information used by GosuDocTag to resolve any embedded cross references
 */
class GosuDocScope {

  var _docSet : IGosuDocSet as readonly DocSet
  var _package : IGosuDocPackage as readonly Package
  var _type : IGosuDocType as readonly Type

  construct(gosuDocSet : IGosuDocSet, gosuPackage : IGosuDocPackage, gosuDocType : IGosuDocType) {
    if (gosuDocSet == null) {
      throw new NullPointerException("Cannot create GosuDocScope with a null IGosuDocSet")
    }
    if (gosuDocType != null && gosuPackage == null) {
      throw new IllegalArgumentException("Cannot create GosuDocScope with an IGosuDocType but no IGosuDocPackage")
    }
    _docSet = gosuDocSet
    _package = gosuPackage
    _type = gosuDocType
  }
}
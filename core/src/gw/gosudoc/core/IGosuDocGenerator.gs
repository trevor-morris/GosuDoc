package gw.gosudoc.core

uses java.io.File

/**
 * A generator that produces GosuDoc from an IGosuDocSet
 */
interface  IGosuDocGenerator {

  /**
   * Generate GosuDoc for the given doc set, putting the output in the given directory
   */
  function generateGosuDoc(docSet : IGosuDocSet, dir : File)
}
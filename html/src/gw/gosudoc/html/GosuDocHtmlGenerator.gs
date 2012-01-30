package gw.gosudoc.html

uses java.io.File
uses gw.gosudoc.core.IGosuDocSet
uses gw.gosudoc.core.IGosuDocGenerator

class GosuDocHtmlGenerator implements IGosuDocGenerator {

  override function generateGosuDoc(docSet: IGosuDocSet, dir: File) {
    docSet.Html.generate(dir)
  }

}
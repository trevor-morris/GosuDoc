uses gw.gosudoc.core.GosuDocCrossReference

uses gw.gosudoc.core.GosuDocTag

uses gw.gosudoc.itype.GosuDocITypeSet

uses gw.gosudoc.core.IGosuDocSet
uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.core.IGosuDocConstructor
uses gw.gosudoc.core.IGosuDocGenerator

uses gw.gosudoc.html.GosuDocConstructorHtml
uses gw.gosudoc.html.GosuDocHtmlGenerator

// TODO just a stub right now, need way to get at all types in a package
var generator = new GosuDocHtmlGenerator()
generator.generateGosuDoc(new GosuDocITypeSet({IGosuDocGenerator,IGosuDocConstructor,IGosuDocSet,IGosuDocType,GosuDocConstructorHtml,GosuDocTag,GosuDocCrossReference}), new java.io.File("c:/Users/Trevor/tmp"))

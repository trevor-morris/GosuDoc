uses gw.gosudoc.itype.GosuDocITypeSet

uses gw.gosudoc.core.IGosuDocSet
uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.core.IGosuDocConstructor
uses gw.gosudoc.core.IGosuDocGenerator

uses gw.gosudoc.html.GosuDocConstructorHtml
uses gw.gosudoc.html.GosuDocHtmlGenerator

var generator = new GosuDocHtmlGenerator()
generator.generateGosuDoc(new GosuDocITypeSet({IGosuDocGenerator,IGosuDocConstructor,IGosuDocSet,IGosuDocType,GosuDocConstructorHtml}), new java.io.File("c:/Users/Trevor/tmp"))

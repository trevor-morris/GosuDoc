uses gw.gosudoc.core.IGosuDocProperty

uses gw.gosudoc.core.IGosuDocFeatureWithParameters

uses gw.gosudoc.core.IGosuDocMethod

uses gw.gosudoc.core.IGosuDocFeature

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
var docSet = new GosuDocITypeSet({
        IGosuDocGenerator,IGosuDocSet,IGosuDocType,
        IGosuDocFeature,IGosuDocFeatureWithParameters,IGosuDocConstructor,IGosuDocProperty,IGosuDocMethod,
        GosuDocConstructorHtml,GosuDocTag,GosuDocCrossReference
})
generator.generateGosuDoc(docSet, new java.io.File("c:/Users/Trevor/tmp"))

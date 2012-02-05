package gw.gosudoc.html.enhancements

uses java.lang.IllegalStateException
uses gw.gosudoc.core.IGosuDocFeature
uses gw.gosudoc.core.IGosuDocConstructor
uses gw.gosudoc.core.IGosuDocMethod
uses gw.gosudoc.core.IGosuDocProperty
uses gw.gosudoc.html.GosuDocConstructorHtml
uses gw.gosudoc.html.GosuDocFeatureHtml
uses gw.gosudoc.html.GosuDocHtmlFactory
uses gw.gosudoc.html.GosuDocMethodHtml
uses gw.gosudoc.html.GosuDocPropertyHtml

enhancement IGosuDocFeatureHtmlEnhancement: IGosuDocFeature {
  property get Html() : GosuDocFeatureHtml {
    return GosuDocHtmlFactory.getOrCreate(this, \ f -> {
      var featureHtml : GosuDocFeatureHtml = null
      if (f typeis IGosuDocConstructor) {
        featureHtml = new GosuDocConstructorHtml(f)
      } else if (f typeis IGosuDocProperty) {
        featureHtml = new GosuDocPropertyHtml(f)
      } else if (f typeis IGosuDocMethod) {
        featureHtml = new GosuDocMethodHtml(f)
      } else {
        throw new IllegalStateException("Unknown feature type " + f)
      }
      return featureHtml
    })
  }
}

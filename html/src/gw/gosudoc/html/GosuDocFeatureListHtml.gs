package gw.gosudoc.html

/**
 * Supports generation of HTML for a feature list, such as a list of constructors or properties 
 */
class GosuDocFeatureListHtml {

  var _title : String as readonly Title
  var _anchor : String as readonly Anchor
  var _features : List<GosuDocFeatureHtml> as readonly Features
  
  construct(title: String, features: List<GosuDocFeatureHtml>) {
    _title = title
    // Choose anchor that cannot clash with any valid feature name
    _anchor = ".." + title.toLowerCase().replaceAll("\\s", "")
    _features = features.freeze()
  }
}
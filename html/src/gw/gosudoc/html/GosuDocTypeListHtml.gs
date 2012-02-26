package gw.gosudoc.html

/**
 * Supports generation of HTML for a list of types within a package, such as all the interfaces or enums
 */
class GosuDocTypeListHtml {

  var _title : String as readonly Title
  var _anchor : String as readonly Anchor
  var _types : List<GosuDocTypeHtml> as readonly Types

  construct(title: String, types: List<GosuDocTypeHtml>) {
    _title = title
    // Choose anchor that cannot clash with any valid feature name
    _anchor = ".." + title.toLowerCase().replaceAll("\\s", "")
    _types = types.freeze()
  }
}
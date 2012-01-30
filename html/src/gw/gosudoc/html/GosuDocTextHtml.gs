package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocText

/**
 * Renders IGosuDocText as HTML. The text may already contain HTML tags, but it may also contain special JavaDoc
 * tags (such as link)
 */
class GosuDocTextHtml {

  var _text : IGosuDocText

  construct(text : IGosuDocText) {
    _text = text
  }

  function generate() : String {
    return _text.RawText
  }
}
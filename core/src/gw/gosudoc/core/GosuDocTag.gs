package gw.gosudoc.core

/**
 * Represents a tag within GosuDoc HTML text, such as @link or @see
 */
class GosuDocTag {

  /** The text enclosing this tag, also gives access to the scope */
  var _text : IGosuDocText as readonly EnclosingText

  /** The tag name, such as link, see etc. */
  var _name : String as readonly Name

  /** Arguments to the tag */
  var _arguments : String as readonly Arguments

  construct(text : IGosuDocText, tagName: String, tagArguments: String) {
    _text = text
    _name = tagName
    _arguments = tagArguments
  }
}
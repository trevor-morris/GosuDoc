package gw.gosudoc.core

/**
 * Represents a tag within GosuDoc HTML text, such as @link or @see
 */
class GosuDocTag {

  /** Is the tag inline (enclosed in brackets) or on a separate line? */
  var _inline : boolean as Inline

  /** The text enclosing this tag, also gives access to the scope */
  var _text : IGosuDocText as readonly EnclosingText

  /** The tag name, such as link, see etc. */
  var _name : String as readonly Name

  /** Arguments to the tag */
  var _arguments : String as readonly Arguments

  construct(inLineTag : boolean, text : IGosuDocText, tagName: String, tagArguments: String) {
    _inline = inLineTag
    _text = text
    _name = tagName
    _arguments = tagArguments
  }

  /**
   * Treat the body of the tag as a cross reference and return a {@link gw.gosudoc.core.GosuDocCrossReference} object
   * describing it
   */
  function parseCrossReference() : GosuDocCrossReference {
    return GosuDocCrossReference.parse(_text.Scope, _arguments)
  }
}
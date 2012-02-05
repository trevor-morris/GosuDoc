package gw.gosudoc.core

/**
 * GosuDoc text, as entered by the programmer when they write GosuDoc. The text often contains HTML elements and can
 * also contain tags, like @see or @link
 */
interface IGosuDocText {

  /**
   * Scope containing this text
   */
  property get Scope() : GosuDocScope

  /**
   * True if the text is empty, either non existent or entirely whitespace
   */
  property get IsEmpty() : boolean

  /**
   * The raw text, including all tags in their unprocessed form
   */
  property get RawText() : String

  /**
   * Return the text with any tags replaced using the given tag handler
   * @param tagHandler called to replace any tags embedded in the text
   */
  function format(tagHandler : block(tag : GosuDocTag) : String) : String

}
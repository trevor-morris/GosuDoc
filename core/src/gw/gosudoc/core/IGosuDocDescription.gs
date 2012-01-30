package gw.gosudoc.core

/**
 * A description for a feature with a summary optionally followed by details
 */
interface IGosuDocDescription {

  /**
   * Summary information, the first line (up to the first period) in the full description
   */
  property get Summary() : IGosuDocText

  /**
   * Detail information, everything after the first line (after the first period) in the full description
   */
  property get Details() : IGosuDocText

}
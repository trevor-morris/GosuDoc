package gw.gosudoc.core

uses gw.gosudoc.core.IGosuDocDescription
uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.core.GosuDocScope
uses java.util.regex.Pattern
uses java.lang.StringBuffer
uses java.lang.Character

/**
 * Standard implementation of IGosuDoc description, splits text into summary and details based on first
 * period in the text
 */
class GosuDocDescription implements IGosuDocDescription {

  final static var END_SUMMARY_CHARS = ".!?"
  final static var END_LINE_CHARS = "\n\r"
  final static var END_SUMMARY_PATTERN = Pattern.compile("([.?!])|(^\\s*(?=@))", Pattern.MULTILINE)

  var _scope : GosuDocScope as readonly Scope
  var _summary : IGosuDocText as readonly Summary
  var _details : IGosuDocText as readonly Details

  construct(gosuDocScope : GosuDocScope, rawText : String) {
    _scope = gosuDocScope
    var endOfSummary = findEndOfSummary(rawText)
    if (endOfSummary >= 0) {
      var summaryBuffer = new StringBuffer()
      _summary = new GosuDocText(gosuDocScope, rawText.substring(0, endOfSummary + 1))
      _details = new GosuDocText(gosuDocScope, rawText.substring(endOfSummary + 1))
    } else {
      _summary = new GosuDocText(gosuDocScope, rawText)
      _details = new GosuDocText(gosuDocScope, null)
    }
  }

  private static function findEndOfSummary(rawText : String) : int {
    var bracketNesting = 0
    for (ch in rawText index i) {
      if (ch == '{') {
        bracketNesting++
      } else if (ch == '}') {
        if (bracketNesting > 0) {
          bracketNesting--;
        }
      }
      if (bracketNesting == 0) {
        if (END_SUMMARY_CHARS.contains(ch)) {
          return i
        } else if (atTagFollowingNewline(rawText, i)) {
          return i - 1
        }
      }
    }
    return -1
  }

  private static function atTagFollowingNewline(rawText : String, pos : int) : boolean {
    if (rawText.charAt(pos) != '@') {
      return false
    }
    for (i in pos|..0) {
      var ch = rawText.charAt(i)
      if (END_LINE_CHARS.indexOf(ch) >= 0) {
        return true
      } else if (not Character.isWhitespace(ch)) {
        return false
      }
    }
    return true
  }

}
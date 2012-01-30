package gw.gosudoc.core

uses gw.gosudoc.core.IGosuDocDescription
uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.core.GosuDocScope
uses java.util.regex.Pattern
uses java.lang.StringBuffer

/**
 * Standard implementation of IGosuDoc description, splits text into summary and details based on first
 * period in the text
 */
class GosuDocDescription implements IGosuDocDescription {

  final static var END_SUMMARY_PATTERN = Pattern.compile("([.?!])|(^\\s*(?=@))", Pattern.MULTILINE)

  var _scope : GosuDocScope as readonly Scope
  var _summary : IGosuDocText as readonly Summary
  var _details : IGosuDocText as readonly Details

  construct(gosuDocScope : GosuDocScope, rawText : String) {
    _scope = gosuDocScope
    var matcher = END_SUMMARY_PATTERN.matcher(rawText != null ? rawText : "")
    if (matcher.find()) {
      var summaryBuffer = new StringBuffer()
      matcher.appendReplacement(summaryBuffer, matcher.group())
      _summary = new GosuDocText(gosuDocScope, summaryBuffer.toString())
      _details = new GosuDocText(gosuDocScope, matcher.appendTail(new StringBuffer()).toString())
    } else {
      _summary = new GosuDocText(gosuDocScope, rawText)
      _details = new GosuDocText(gosuDocScope, null)
    }
  }

}
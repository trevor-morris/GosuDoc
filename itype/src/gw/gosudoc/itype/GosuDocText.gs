package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.core.GosuDocTag
uses java.util.regex.Pattern
uses java.lang.StringBuffer
uses gw.gosudoc.core.IGosuDocSet
uses gw.gosudoc.core.GosuDocTag
uses gw.gosudoc.core.GosuDocScope

/**
 * Standard implementation of IGosuDocText, represents text with embedded tags
 */
internal class GosuDocText implements IGosuDocText {

  final static var TAG_PATTERN = Pattern.compile("(^\\s*@(\\w+)\\s*(.*?)\\s*$)|(\\{\\s*@(\\w+)\\s*(.*?)\\s*\\})", Pattern.MULTILINE)
  final static var INLINE_TAG_PATTERN = Pattern.compile("\\{\\s*@(\\w+)\\s*(.*?)\\s*\\}")

  var _scope : GosuDocScope as readonly Scope
  var _rawText : String as readonly RawText

  construct(gosuDocScope : GosuDocScope, raw : String) {
    _scope = gosuDocScope
    var trimmed = raw != null ? raw.trim() : ""
    _rawText = trimmed
  }

  override property get IsEmpty(): boolean {
    return RawText.Empty
  }

  override function format(tagHandler : block(tag : GosuDocTag) : String) : String {
    var buffer = new StringBuffer()
    var matcher = TAG_PATTERN.matcher(_rawText)
    while (matcher.find()) {
      var tag : GosuDocTag
      var isLineBasedTag = matcher.group(2) != null
      if (isLineBasedTag) {
        tag = new GosuDocTag(this, matcher.group(2), formatTagArguments(matcher.group(3), tagHandler))
      } else {
        tag = new GosuDocTag(this, matcher.group(5), matcher.group(6))
      }
      matcher.appendReplacement(buffer, tagHandler(tag))
    }
    matcher.appendTail(buffer)
    return buffer.toString()
  }

  private function formatTagArguments(args : String, tagHandler : block(tag : GosuDocTag) : String) : String {
    var buffer = new StringBuffer()
    var matcher = INLINE_TAG_PATTERN.matcher(args)
    while (matcher.find()) {
      var tag = new GosuDocTag(this, matcher.group(1), matcher.group(2))
      matcher.appendReplacement(buffer, tagHandler(tag))
    }
    matcher.appendTail(buffer)
    return buffer.toString()
  }

}
package gw.gosudoc.html

uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.core.GosuDocTag
uses java.util.ArrayList
uses gw.gosudoc.core.GosuDocCrossReference

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
    var lineTags = new ArrayList<GosuDocTag>()
    var body = _text.format( \ tag -> {
      if (tag.Inline) {
        return formatInlineTag(tag)
      } else {
        lineTags.add(tag)
        return ""
      }
    })
    // TODO non inline tags
    return body
  }

  private function formatInlineTag(tag : GosuDocTag) : String {
    switch (tag.Name) {
    case "link":
      return "<code>" + formatCrossReference(tag.parseCrossReference()) + "</code>"
    case "linkplain":
      return formatCrossReference(tag.parseCrossReference())
    default:
      return "<code>" + tag.Arguments + "</code>"
    }
  }

  private function formatCrossReference(crossReference : GosuDocCrossReference) : String {
    var link : String = null
    if (crossReference.Type != null) {
      var baseUrl = _text.Scope.Type != null ? _text.Scope.Type.Html.BaseUrl : _text.Scope.Package.Html.BaseUrl
      link = crossReference.Type.Html.url(baseUrl)
      if (crossReference.Feature != null) {
        link = link + "#" + crossReference.Feature.Html.Anchor
      }
    }
    return link != null ? '<a href="' + link + '">' + crossReference.Label + "</a>" : crossReference.Label
  }
}
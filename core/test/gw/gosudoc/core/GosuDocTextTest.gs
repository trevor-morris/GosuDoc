package gw.gosudoc.core

uses junit.framework.TestCase
uses gw.gosudoc.core.IGosuDocType
uses gw.lang.reflect.TypeSystem
uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.core.IGosuDocSet
uses gw.gosudoc.core.GosuDocTag
uses gw.gosudoc.core.GosuDocText
uses gw.gosudoc.core.IGosuDocPackage
uses java.util.Collections
uses gw.gosudoc.core.GosuDocScope

class GosuDocTextTest extends TestCase {

  function testLinkReplacement() {
    var text = new GosuDocText(GosuDocSetStub.emptyScope(), "Embedded {@link with args} followed by stuff")
    var formattedText = text.format(\ tag -> "<tag:${tag.Name} args:${tag.Arguments}>")
    assertEquals("Embedded <tag:link args:with args> followed by stuff", formattedText)
  }

  function testSeeReplacement() {
    var text = new GosuDocText(GosuDocSetStub.emptyScope(), "Something with see tags\n @see see1 \r\n @see see2")
    var formattedText = text.format(\ tag -> "<tag:${tag.Name} args:${tag.Arguments}>")
    assertEquals("Something with see tags\n<tag:see args:see1>\r\n<tag:see args:see2>", formattedText)
  }

  function testClassHeader() {
    var header = "Header with an inline link tag: {@link SimpleClass} and a couple of end of comment tags.\n"
              + "@see SimpleClass\n"
              + "@version 1.3"
    var b = \ tag : GosuDocTag -> "<tag:${tag.Name} args:${tag.Arguments}>"
    var formattedHeader = new GosuDocText(GosuDocSetStub.emptyScope(), header).format(b)
    var expected = "Header with an inline link tag: <tag:link args:SimpleClass> and a couple of end of comment tags.\n"
            + "<tag:see args:SimpleClass>\n"
            + "<tag:version args:1.3>"
    assertEquals(expected, formattedHeader)
  }

  function testNestedLinkTag() {
    var string = "Boring stuff. Some details.\n"
            + "@random test nesting {@link GosuDocTypeReferenceTest}, like that\n"
    var formattedText = new GosuDocText(GosuDocSetStub.emptyScope(), string).format( \ tag -> "<tag:${tag.Name} args:${tag.Arguments}>")
    assertEquals("Boring stuff. Some details.\n<tag:random args:test nesting <tag:link args:GosuDocTypeReferenceTest>, like that>", formattedText)
  }

}
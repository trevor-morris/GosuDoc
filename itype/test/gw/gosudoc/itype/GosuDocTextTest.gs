package gw.gosudoc.itype

uses junit.framework.TestCase
uses gw.gosudoc.core.IGosuDocType
uses gw.lang.reflect.TypeSystem
uses gw.gosudoc.core.IGosuDocText
uses gw.gosudoc.core.IGosuDocSet
uses gw.gosudoc.core.GosuDocTag

/**
 * Header with an inline link tag: {@link SimpleClass} and a couple of end of comment tags.
 * @see SimpleClass
 * @version 1.3
 */
class GosuDocTextTest extends TestCase {

  function testLinkReplacement() {
    var text = new GosuDocText(new GosuDocITypeSet ({}).Scope, "Embedded {@link with args} followed by stuff")
    var formattedText = text.format(\ tag -> "<tag:${tag.Name} args:${tag.Arguments}>")
    assertEquals("Embedded <tag:link args:with args> followed by stuff", formattedText)
  }

  function testSeeReplacement() {
    var text = new GosuDocText(new GosuDocITypeSet ({}).Scope, "Something with see tags\n @see see1 \r\n @see see2")
    var formattedText = text.format(\ tag -> "<tag:${tag.Name} args:${tag.Arguments}>")
    assertEquals("Something with see tags\n<tag:see args:see1>\r\n<tag:see args:see2>", formattedText)
  }

  function testClassHeader() {
    var type = getGosuDocTypeForThisClass()
    var b = \ tag : GosuDocTag -> "<tag:${tag.Name} args:${tag.Arguments}>"
    var formattedHeader = type.Description.Summary.format(b) + "\n" + type.Description.Details.format(b)
    var expected = "Header with an inline link tag: <tag:link args:SimpleClass> and a couple of end of comment tags.\n"
            + "<tag:see args:SimpleClass>\n"
            + "<tag:version args:1.3>"
    assertEquals(expected, formattedHeader)
  }

  /**
   * Boring stuff. Some details.
   * @random well not really but want to test nesting {@link GosuDocTypeReferenceTest}, like that
   */
  function testNestedLinkTag() {
    var method = getGosuDocTypeForThisClass().Methods.singleWhere( \ m -> m.Name == "testNestedLinkTag")
    var formattedText = method.Description.Details.format( \ tag -> "<tag:${tag.Name} args:${tag.Arguments}>")
    assertEquals("Some details.\n<tag:random args:well not really but want to test nesting <tag:link args:GosuDocTypeReferenceTest>, like that>", formattedText)
  }

  private function getGosuDocTypeForThisClass() : IGosuDocType {
    var type = typeof this
    var gosuDocSet = new GosuDocITypeSet ({type})
    return gosuDocSet.gosuDocTypeForIType(type)
  }

}
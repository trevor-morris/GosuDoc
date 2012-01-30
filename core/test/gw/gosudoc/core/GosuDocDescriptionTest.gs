package gw.gosudoc.core

uses junit.framework.TestCase

class GosuDocDescriptionTest extends TestCase {

  function testNull() {
    var nullDescription = new GosuDocDescription(GosuDocSetStub.emptyScope(), null)
    assertTrue(nullDescription.Summary.IsEmpty)
    assertTrue(nullDescription.Details.IsEmpty)
  }

  function testEmpty() {
    var nullDescription = new GosuDocDescription(GosuDocSetStub.emptyScope(), "")
    assertTrue(nullDescription.Summary.IsEmpty)
    assertTrue(nullDescription.Details.IsEmpty)
  }

  function testBlank() {
    var nullDescription = new GosuDocDescription(GosuDocSetStub.emptyScope(), "    \n")
    assertTrue(nullDescription.Summary.IsEmpty)
    assertTrue(nullDescription.Details.IsEmpty)
  }

  function testPeriod() {
    var description = new GosuDocDescription(GosuDocSetStub.emptyScope(), " Summary. Details ")
    assertEquals("Summary.", description.Summary.RawText)
    assertEquals("Details", description.Details.RawText)
  }

  function testQuestionMark() {
    var description = new GosuDocDescription(GosuDocSetStub.emptyScope(), " Summary? Details ")
    assertEquals("Summary?", description.Summary.RawText)
    assertEquals("Details", description.Details.RawText)
  }

  function testExclamationPoint() {
    var description = new GosuDocDescription(GosuDocSetStub.emptyScope(), " Summary! Details ")
    assertEquals("Summary!", description.Summary.RawText)
    assertEquals("Details", description.Details.RawText)
  }

  function testNewlineWithTag() {
    var description = new GosuDocDescription(GosuDocSetStub.emptyScope(), " Summary\n@tag Details ")
    assertEquals("Summary", description.Summary.RawText)
    assertEquals("@tag Details", description.Details.RawText)
  }

  function testJustTag() {
    var description = new GosuDocDescription(GosuDocSetStub.emptyScope(), " @tag Details ")
    assertTrue(description.Summary.IsEmpty)
    assertEquals("@tag Details", description.Details.RawText)
  }

}
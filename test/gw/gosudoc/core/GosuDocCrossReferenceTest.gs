package gw.gosudoc.core

uses junit.framework.TestCase
uses java.util.Date
uses java.io.Reader
uses gw.gosudoc.itype.GosuDocITypeSet
uses gw.lang.reflect.features.BoundMethodReference

class GosuDocCrossReferenceTest extends TestCase {

  var _thisType : IGosuDocType

  override function setUp() {
    _thisType = new GosuDocITypeSet({typeof this}).gosuDocTypeForIType(typeof this)
  }

  /**
   * Full link to this type {@link gw.gosudoc.core.GosuDocCrossReferenceTest}
   */
  function testSimpleTypeCrossReference() {
    var linkTag = findLinkTagFor(this#testSimpleTypeCrossReference())
    var crossReference = linkTag.parseCrossReference()
    assertNotNull(crossReference)
    assertEquals(_thisType, crossReference.Type)
    assertNull(crossReference.Feature)
    assertEquals("GosuDocCrossReferenceTest", crossReference.Label)
  }

  /**
   * Relative link to this type {@link GosuDocCrossReferenceTest}
   */
  function testRelativeTypeCrossReference() {
    var linkTag = findLinkTagFor(this#testRelativeTypeCrossReference())
    var crossReference = linkTag.parseCrossReference()
    assertNotNull(crossReference)
    assertEquals(_thisType, crossReference.Type)
    assertNull(crossReference.Feature)
    assertEquals("GosuDocCrossReferenceTest", crossReference.Label)
  }

  /**
   * Relative link to this type {@link GosuDocCrossReferenceTest with a label}
   */
  function testRelativeTypeCrossReferenceWithLabel() {
    var linkTag = findLinkTagFor(this#testRelativeTypeCrossReferenceWithLabel())
    var crossReference = linkTag.parseCrossReference()
    assertNotNull(crossReference)
    assertEquals(_thisType, crossReference.Type)
    assertNull(crossReference.Feature)
    assertEquals("with a label", crossReference.Label)
  }

  /**
   * Relative link to function in this type, name only {@link GosuDocCrossReferenceTest#simpleFunction}
   */
  function testRelativeMethodCrossReference() {
    var linkTag = findLinkTagFor(this#testRelativeMethodCrossReference())
    var crossReference = linkTag.parseCrossReference()
    assertNotNull(crossReference)
    assertEquals(_thisType, crossReference.Type)
    assertTrue(crossReference.Feature typeis IGosuDocMethod)
    assertEquals("simpleFunction", crossReference.Feature.Name)
    assertEquals("GosuDocCrossReferenceTest.simpleFunction()", crossReference.Label)
  }

  /**
   * Relative link to function/property in this type, name only {@link GosuDocCrossReferenceTest#confusingName}
   */
  function testRelativeAmbiguousNameCrossReference() {
    var linkTag = findLinkTagFor(this#testRelativeAmbiguousNameCrossReference())
    var crossReference = linkTag.parseCrossReference()
    assertNotNull(crossReference)
    assertEquals(_thisType, crossReference.Type)
    assertTrue(crossReference.Feature typeis IGosuDocProperty)
    assertEquals("confusingName", crossReference.Feature.Name)
    assertEquals("GosuDocCrossReferenceTest.confusingName", crossReference.Label)
  }

  /**
   * Relative link to function/property in this type, empty args {@link GosuDocCrossReferenceTest#confusingName()}
   */
  function testRelativeAmbiguousNameCrossReferenceWithArguments() {
    var linkTag = findLinkTagFor(this#testRelativeAmbiguousNameCrossReferenceWithArguments())
    var crossReference = linkTag.parseCrossReference()
    assertNotNull(crossReference)
    assertEquals(_thisType, crossReference.Type)
    assertTrue(crossReference.Feature typeis IGosuDocMethod)
    assertEquals("confusingName", crossReference.Feature.Name)
    assertEquals("GosuDocCrossReferenceTest.confusingName()", crossReference.Label)
  }

  /**
   * Relative link to overloaded function in this type, one arg {@link GosuDocCrossReferenceTest#overloadedSimple(int)}
   */
  function testRelativeOverloadedNameOneArg() {
    var linkTag = findLinkTagFor(this#testRelativeOverloadedNameOneArg())
    var crossReference = linkTag.parseCrossReference()
    assertNotNull(crossReference)
    assertEquals(_thisType, crossReference.Type)
    assertTrue(crossReference.Feature typeis IGosuDocMethod)
    assertEquals("overloadedSimple", crossReference.Feature.Name)
    assertEquals("GosuDocCrossReferenceTest.overloadedSimple(int)", crossReference.Label)
  }

  /**
   * Relative link to overloaded function in this type, two args {@link GosuDocCrossReferenceTest#overloadedSimple(int,int)}
   */
  function testRelativeOverloadedNameTwoArgs() {
    var linkTag = findLinkTagFor(this#testRelativeOverloadedNameTwoArgs())
    var crossReference = linkTag.parseCrossReference()
    assertNotNull(crossReference)
    assertEquals(_thisType, crossReference.Type)
    assertTrue(crossReference.Feature typeis IGosuDocMethod)
    assertEquals("overloadedSimple", crossReference.Feature.Name)
    assertEquals("GosuDocCrossReferenceTest.overloadedSimple(int,int)", crossReference.Label)
  }

  /**
   * Relative link to overloaded function in this type, block arg {@link GosuDocCrossReferenceTest#takesBlock(block(int, block(float, float) : String) : java.util.Date)}
   */
  function testRelativeOverloadedNameBlockArg() {
    var linkTag = findLinkTagFor(this#testRelativeOverloadedNameBlockArg())
    var crossReference = linkTag.parseCrossReference()
    assertNotNull(crossReference)
    assertEquals(_thisType, crossReference.Type)
    assertTrue(crossReference.Feature typeis IGosuDocMethod)
    assertEquals("takesBlock", crossReference.Feature.Name)
    assertEquals("GosuDocCrossReferenceTest.takesBlock(block(int,block(float,float) : String) : Date)", crossReference.Label)
  }

  function simpleFunction() {

  }

  function confusingName() : int {
    return 0
  }

  property get confusingName() : int {
    return 0
  }

  function overloadedSimple(arg1 : int) {

  }

  function overloadedSimple(arg1 : int, arg2 : int) {

  }

  function takesBlock(b : block(a : int, bb : block(x : float, y : float) : String) : Date) : Reader {
    return null
  }

  function takesBlock(b : block()  : Date) : Reader {
    return null
  }

  function findLinkTagFor(method : BoundMethodReference<Object,Object>) : GosuDocTag {
    var gosuDocMethod = _thisType.Methods.singleWhere( \ m -> m.Name == method.FeatureInfo.DisplayName)
    var linkTag : GosuDocTag
    gosuDocMethod.Description.Summary.format( \ tag -> {
            linkTag = tag;
            return ""
    })
    assertNotNull("Could not find link tag in summary GosuDoc for " + method, linkTag)
    return linkTag
  }

}
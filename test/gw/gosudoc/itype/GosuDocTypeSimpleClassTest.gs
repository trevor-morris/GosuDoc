package gw.gosudoc.itype

uses junit.framework.TestCase
uses gw.lang.reflect.TypeSystem
uses gw.gosudoc.core.GosuDocTypeCategory
uses gw.gosudoc.core.IGosuDocType

class GosuDocTypeSimpleClassTest extends TestCase {

  var _simpleClass : IGosuDocType

  override function setUp() {
    _simpleClass = getGosuDocTypeForSimpleClass()
  }

  function testSimpleClassCategory() {
    assertSame(GosuDocTypeCategory.C_CLASS, _simpleClass.Category)
  }

  function testSimpleClassName() {
    assertEquals("SimpleClass", _simpleClass.Name)
  }

  function testSimpleClassDescription() {
    assertEquals("Simple description", _simpleClass.Description.Summary.RawText)
    assertTrue(_simpleClass.Description.Details.IsEmpty)
  }

  function testSimpleClassConstructor() {
    var constructors = _simpleClass.Constructors
    assertEquals(1, constructors.Count)
    var constructor = constructors.first()
    assertEquals("Create with an integer argument", constructor.Description.Summary.RawText)
    assertTrue(constructor.Description.Details.IsEmpty)
    assertEquals("construct(int)", constructor.UniqueName)
  }

  function testSimpleClassProperty() {
    var properties = _simpleClass.Properties
    assertEquals(1, properties.Count)
    var prop = properties.first()
    assertEquals("Simple date property", prop.Description.Summary.RawText)
    assertTrue(prop.Description.Details.IsEmpty)
    assertEquals("SimpleProperty", prop.UniqueName)
  }

  function testSimpleClassMethod() {
    var methods = _simpleClass.Methods
    assertEquals(1, methods.Count)
    var method = methods.first()
    assertEquals("Simple method with a string argument", method.Description.Summary.RawText)
    assertTrue(method.Description.Details.IsEmpty)
    assertEquals("simpleMethod(String)", method.UniqueName)
  }

  function testSimpleClassPackage() {
    var pkg = _simpleClass.Package
    assertEquals("example.gosudoc", pkg.Name)
  }

  private function getGosuDocTypeForSimpleClass() : IGosuDocType {
    var type = TypeSystem.getByFullName("example.gosudoc.SimpleClass")
    var gosuDocSet = new GosuDocITypeSet ({type})
    return gosuDocSet.gosuDocTypeForIType(type)
  }
}
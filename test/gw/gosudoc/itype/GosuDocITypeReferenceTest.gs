package gw.gosudoc.itype

uses junit.framework.TestCase
uses gw.gosudoc.core.IGosuDocType
uses gw.gosudoc.core.IGosuDocConstructor
uses gw.gosudoc.core.IGosuDocProperty
uses gw.gosudoc.core.IGosuDocDescription
uses gw.gosudoc.core.IGosuDocMethod
uses gw.gosudoc.core.IGosuDocPackage
uses gw.gosudoc.core.GosuDocTypeCategory
uses gw.lang.reflect.IType
uses java.util.Map
uses gw.lang.reflect.TypeSystem
uses gw.lang.reflect.java.GosuTypes
uses gw.gosudoc.core.IGosuDocTypeReference
uses gw.gosudoc.core.IGosuDocTypeNameFormatter
uses java.util.Date
uses java.util.ArrayList
uses java.lang.Integer
uses gw.gosudoc.core.GosuDocRelationship
uses gw.gosudoc.core.GosuDocRelationship

class GosuDocITypeReferenceTest extends TestCase {

  function testSimpleArray() {
    var arrayType = TypeSystem.getByFullName("java.lang.String").ArrayType
    var ref = new GosuDocITypeReference (new TypeLookup({}), arrayType)
    assertEquals("String[]", ref.FullName)
  }

  function testSimpleBlock() {
    var method = GosuDocITypeReferenceTest#takesSimpleBlock()
    var blockType = method.MethodInfo.Parameters[0].FeatureType
    var ref = new GosuDocITypeReference (new TypeLookup({}), blockType)
    assertEquals("block(String) : Date", ref.FullName)
  }

  function testBlockWithExpansion() {
    var method = GosuDocITypeReferenceTest#takesSimpleBlock()
    var blockType = method.MethodInfo.Parameters[0].FeatureType
    var ref = new GosuDocITypeReference (new TypeLookup({String -> "GosuDocString"}), blockType)
    var formattedName = ref.formatFullName(createFormatter())
    assertEquals("block(s : @GosuDocString@) : #java.util.Date#", formattedName)
  }

  function testUnboundGenericType() {
    var listType = TypeSystem.getByFullName("java.util.List")
    var ref = new GosuDocITypeReference (new TypeLookup({}), listType)
    assertEquals("List&lt;E&gt;", ref.FullName)
  }

  function testBoundGenericType() {
    var method = GosuDocITypeReferenceTest#returnsBoundGeneric()
    var listType = method.MethodInfo.ReturnType
    var ref = new GosuDocITypeReference (new TypeLookup({}), listType)
    assertEquals("List&lt;String&gt;", ref.FullName)
  }

  function testBoundGenericBlockType() {
    var method = GosuDocITypeReferenceTest#returnsBoundGenericBlock()
    var blockType = method.MethodInfo.ReturnType
    var ref = new GosuDocITypeReference (new TypeLookup({String -> "GosuDocString"}), blockType)
    var formattedName = ref.formatFullName(createFormatter())
    assertEquals("block(map : #java.util.Map#&lt;#java.lang.Integer#,#java.util.Date#&gt;) : #java.util.List#&lt;@GosuDocString@&gt;", formattedName)
  }

  function testUnboundGenericBlockType() {
    var method = GosuDocITypeReferenceTest#returnsUnboundGenericBlock()
    var blockType = method.MethodInfo.ReturnType
    var ref = new GosuDocITypeReference (new TypeLookup({Integer -> "GosuDocInteger"}), blockType)
    var formattedName = ref.formatFullName(createFormatter())
    assertEquals("block(map : #java.util.Map#&lt;@GosuDocInteger@,T&gt;) : #java.util.List#&lt;T&gt;", formattedName)
  }

  private function takesSimpleBlock(b : block(s : String) : Date) {

  }

  private function returnsBoundGeneric() : List<String> {
    return null
  }

  private function returnsBoundGenericBlock() : block(map : Map<Integer, Date>) : List<String> {
    return null
  }

  private function returnsUnboundGenericBlock<T>() : block(map : Map<Integer, T>) : List<T> {
    return null
  }

  private function createFormatter() : IGosuDocTypeNameFormatter {
    return new IGosuDocTypeNameFormatter () {
      override property get IncludeBlockParameterNames(): boolean { return true }
      override function formatTypeName(fullName: String, relativeName: String): String { return "#" + fullName + "#" }
      override function formatGosuDocTypeName(type: IGosuDocType): String { return "@" + type.Name + "@"}
    }
  }

  private static class TypeLookup implements ITypeToGosuDocType {

    var _typeMap : Map<IType,IGosuDocType>

    construct(map : Map<IType,String>) {
      _typeMap = map.mapValues(\ name -> new MinimalGosuDocType(name))
    }

    override function gosuDocTypeForIType(type: IType): IGosuDocType {
      return _typeMap.get(type)
    }

  }

  private static class MinimalGosuDocType implements IGosuDocType {

    var _name : String as readonly Name

    construct(n : String) {
      _name = n
    }

    override property get Category(): GosuDocTypeCategory {
      return GosuDocTypeCategory.C_CLASS
    }

    override property get Package(): IGosuDocPackage {
      return null
    }

    override property get Description(): IGosuDocDescription {
      return null
    }

    override property get Constructors(): List<IGosuDocConstructor> {
      return {}
    }

    override property get Properties(): List<IGosuDocProperty> {
      return {}
    }

    override property get Methods(): List<IGosuDocMethod> {
      return {}
    }

    override property get Relationships(): List<GosuDocRelationship> {
      return null
    }
  }
}
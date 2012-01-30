package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocTypeReference
uses gw.gosudoc.core.IGosuDocType
uses gw.lang.reflect.IType
uses java.lang.StringBuilder
uses gw.gosudoc.core.IGosuDocTypeNameFormatter
uses gw.gosudoc.core.IGosuDocTypeNameFormatter
uses gw.lang.reflect.ITypeVariableType

/**
 * Represents a reference to another GosuDocType,
 */
internal class GosuDocITypeReference implements IGosuDocTypeReference {

  static var NULL_TYPE_LOOKUP = new ITypeToGosuDocType() {
    override function gosuDocTypeForIType(type: IType): GosuDocIType {
      return null
    }
  }

  static var FULL_NAME_FORMATTER = new IGosuDocTypeNameFormatter () {
    override property get IncludeBlockParameterNames() : boolean { return false }
    override function formatTypeName(fullName : String, relativeName : String) : String { return relativeName }
    override function formatGosuDocTypeName(type : IGosuDocType) : String { return null }
  }

  var _iTypeToGosuDocType : ITypeToGosuDocType
  var _type : IType
  var _fullName : String as readonly FullName

  construct(iTypeToGosuDocType : ITypeToGosuDocType, type : IType) {
    _iTypeToGosuDocType = iTypeToGosuDocType
    _type = type
    _fullName = internalFormatFullName(NULL_TYPE_LOOKUP, FULL_NAME_FORMATTER)
  }

  override function formatFullName(formatter : IGosuDocTypeNameFormatter): String {
    return internalFormatFullName(_iTypeToGosuDocType, formatter)
  }

  private function internalFormatFullName(iTypeToGosuDocType : ITypeToGosuDocType, formatter : IGosuDocTypeNameFormatter): String {
    var builder = new StringBuilder()
    appendFormattedFullName(builder, iTypeToGosuDocType, formatter, _type)
    return builder.toString()
  }

  private static function appendFormattedFullName(
          builder : StringBuilder,
          iTypeToGosuDocType : ITypeToGosuDocType,
          formatter : IGosuDocTypeNameFormatter,
          type : IType) {
    if (type.Array) {
      appendFormattedFullName(builder, iTypeToGosuDocType, formatter, type.ComponentType)
      builder.append("[]")
    } else if (type.Block) {
      appendFormattedBlockType(builder, iTypeToGosuDocType, formatter, type)
    } else if (type.TypeParameters?.HasElements) {
      appendFormattedBoundGenericType(builder, iTypeToGosuDocType, formatter, type)
    } else if (type.isGenericType()) {
      appendFormattedUnboundGenericType(builder, iTypeToGosuDocType, formatter, type)
    } else {
      appendFormattedSimpleType(builder, iTypeToGosuDocType, formatter, type)
    }
  }

  private static function appendFormattedBlockType(
          builder: StringBuilder,
          iTypeToGosuDocType: ITypeToGosuDocType,
          formatter: IGosuDocTypeNameFormatter,
          type: IType) {
    builder.append("block(")
    for (parameterType in type.AsBlock.ParameterTypes index i) {
      if (i != 0) {
        builder.append(',')
      }
      if (formatter.IncludeBlockParameterNames) {
        builder.append(type.AsBlock.ParameterNames[i])
        builder.append(" : ")
      }
      appendFormattedFullName(builder, iTypeToGosuDocType, formatter, parameterType)
    }
    builder.append(") : ")
    appendFormattedFullName(builder, iTypeToGosuDocType, formatter, type.AsBlock.ReturnType)
  }

  private static function appendFormattedBoundGenericType(
          builder: StringBuilder,
          iTypeToGosuDocType: ITypeToGosuDocType,
          formatter: IGosuDocTypeNameFormatter,
          type: IType) {
    appendFormattedSimpleType(builder, iTypeToGosuDocType, formatter, type.GenericType)
    builder.append("&lt;")
    for (parameterType in type.TypeParameters index i) {
      if (i != 0) {
        builder.append(",")
      }
      if (parameterType typeis ITypeVariableType) {
        builder.append(parameterType.RelativeName)
      } else {
        appendFormattedFullName(builder, iTypeToGosuDocType, formatter, parameterType)
      }
    }
    builder.append("&gt;")
  }

  private static function appendFormattedUnboundGenericType(
          builder: StringBuilder,
          iTypeToGosuDocType: ITypeToGosuDocType,
          formatter: IGosuDocTypeNameFormatter,
          type: IType) {
    appendFormattedSimpleType(builder, iTypeToGosuDocType, formatter, type.GenericType)
    var generics = type.GenericTypeVariables
    if (generics.HasElements) {
      builder.append("&lt;")
      for (generic in generics index i) {
        if (i != 0) {
          builder.append(",")
        }
        builder.append(generic.Name)
      }
      builder.append("&gt;")
    }
  }

  private static function appendFormattedSimpleType(
          builder: StringBuilder,
          iTypeToGosuDocType: ITypeToGosuDocType,
          formatter: IGosuDocTypeNameFormatter,
          type: IType) {
    var gosuDocType = iTypeToGosuDocType.gosuDocTypeForIType(type)
    if (gosuDocType != null) {
      builder.append(formatter.formatGosuDocTypeName(gosuDocType))
    } else {
      builder.append(formatter.formatTypeName(type.Name, type.RelativeName))
    }
  }
}
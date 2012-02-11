package gw.gosudoc.core

uses gw.lang.reflect.IConstructorInfo
uses gw.lang.reflect.IMethodInfo
uses gw.lang.reflect.IPropertyInfo

/**
 * Represents a class, interface, enum or enhancement for which GosuDoc should be generated
 *
 * @see IGosuDocType
 */
interface IGosuDocType {

  /**
   * Category of type - one of Class/Interface/Enum/Enhancement
   */
  property get Category() : GosuDocTypeCategory

  /**
   * Name of the type, excluding package
   */
  property get Name() : String

  /**
   * Package that contains this type
   */
  property get Package() : IGosuDocPackage

  /**
   * Description of this type
   */
  property get Description() : IGosuDocDescription

  /**
   * Constructors for this type. Constructors are sorted by the names of the types of their parameters
   * (e.g. (int) will come before (String))
   */
  property get Constructors() : List<IGosuDocConstructor>

  /**
   * Properties for this type. Only includes properties directly on this type, not any inherited properties or
   * properties added by enhancements. The properties are sorted in case insensitive alphabetic order.
   */
  property get Properties() : List<IGosuDocProperty>

  /**
   * Methods for this type. Only includes methods directly on this type, not any inherited methods or
   * methods added by enhancements. The methods are sorted in case insensitive alphabetic order; overloaded
   * methods are sorted by the names of the types of their parameters (e.g. (int) will come before (String))
   */
  property get Methods() : List<IGosuDocMethod>

  /**
   * Relationship lists for this type, superclasses, subclasses etc.
   */
  property get Relationships() : List<GosuDocRelationship>
}
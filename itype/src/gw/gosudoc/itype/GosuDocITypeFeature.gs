package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocDescription
uses java.lang.Comparable

/**
 * Superclass for GosuDoc constructors, properties and methods
 */
internal abstract class GosuDocITypeFeature implements Comparable<GosuDocITypeFeature> {

  var _ownerType : GosuDocIType as readonly OwnerType
  var _name : String as readonly Name
  var _description : IGosuDocDescription as readonly Description

  construct(owner: GosuDocIType, featureName: String, featureDescription: IGosuDocDescription) {
    _ownerType = owner
    _name = featureName
    _description = featureDescription
  }

  abstract property get UniqueName() : String

  override function compareTo(other: GosuDocITypeFeature): int {
    return String.CASE_INSENSITIVE_ORDER.compare(this.UniqueName, other.UniqueName)
  }
}
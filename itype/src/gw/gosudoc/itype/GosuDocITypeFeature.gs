package gw.gosudoc.itype

uses gw.gosudoc.core.IGosuDocDescription
uses java.lang.Comparable
uses gw.gosudoc.core.IGosuDocFeature
uses gw.gosudoc.core.GosuDocModifier
uses java.util.Set
uses gw.lang.reflect.IAttributedFeatureInfo
uses java.util.TreeSet

/**
 * Superclass for GosuDoc constructors, properties and methods
 */
internal abstract class GosuDocITypeFeature implements IGosuDocFeature, Comparable<GosuDocITypeFeature> {

  var _ownerType : GosuDocIType as readonly OwnerType
  var _modifiers : Set<GosuDocModifier> = null
  var _name : String as readonly Name
  var _description : IGosuDocDescription as readonly Description

  construct(owner: GosuDocIType, featureName: String, featureDescription: IGosuDocDescription) {
    _ownerType = owner
    _name = featureName
    _description = featureDescription
  }

  override function compareTo(other: GosuDocITypeFeature): int {
    return String.CASE_INSENSITIVE_ORDER.compare(this.UniqueName, other.UniqueName)
  }

  override property get Modifiers() : Set<GosuDocModifier> {
    if (_modifiers == null) {
      _modifiers = createModifiers().freeze()
    }
    return _modifiers
  }

  protected abstract function createModifiers() : Set<GosuDocModifier>

  /**
   * Creates initial, mutable, modifier set from the given feature. Typically used in the subclass specific
   * implementation of {@link #createModifiers()}
   */
  protected final function initializeModifiers(feature : IAttributedFeatureInfo) : Set<GosuDocModifier> {
    var modifierSet = new TreeSet<GosuDocModifier>()
    if (feature.Private) {
      modifierSet.add(M_PRIVATE)
    } else if (feature.Public) {
      modifierSet.add(M_PUBLIC)
    } else if (feature.Protected) {
      modifierSet.add(M_PROTECTED)
    } else {
      modifierSet.add(M_INTERNAL)
    }
    if (feature.Abstract and not feature.OwnersType.Interface) {
      modifierSet.add(M_ABSTRACT)
    }
    if (feature.Static) {
      modifierSet.add(M_STATIC)
    }
    return modifierSet
  }
}
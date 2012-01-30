package gw.gosudoc.html

uses java.util.WeakHashMap
uses gw.lang.reflect.ReflectUtil

/**
 * Creates and maintains the HTML objects that generate HTML GosuDoc. Core GosuDoc objects are given enhancements
 * that return an HTML generation object e.g. coreObject.Html.doHtmlStuff(). This factory creates and maintains
 * the Html objects that correspond to the core objects.
 */
class GosuDocHtmlFactory {

  static var _htmlObjects = new WeakHashMap<Object,Object>()

  static function getOrCreateFromType<T,H>(coreObject : T, type : Type<H>) : H {
    return getOrCreate(coreObject, \ core -> defaultCreate(type, core))
  }

  static function getOrCreate<T,H>(coreObject : T, factoryBlock : block(core : T) : H) : H {
    if (not _htmlObjects.containsKey(coreObject)) {
      _htmlObjects.put(coreObject, factoryBlock(coreObject))
    }
    return _htmlObjects.get(coreObject) as H
  }

  private static function defaultCreate<T,H>(type : Type<H>, coreObject : T) : H {
    return ReflectUtil.construct(type.Name, {coreObject}) as H
  }
}
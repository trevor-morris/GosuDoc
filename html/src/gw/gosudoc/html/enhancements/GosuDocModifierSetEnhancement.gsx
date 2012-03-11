package gw.gosudoc.html.enhancements

uses gw.gosudoc.core.GosuDocModifier
uses java.util.Set
uses java.lang.StringBuilder

enhancement GosuDocModifierSetEnhancement : Set<GosuDocModifier> {

  property get Signature() : String {
    var builder = new StringBuilder()
    for (m in this) {
      builder.append(m.Label)
      builder.append(" ")
    }
    return builder.toString()
  }

}

package gw.gosudoc

uses gw.lang.cli.Required

/**
 * Arguments for GosuDoc
 */
class Args {

  /**
   * The packages for which to generate GosuDoc
   */
  static var _packages : String as Packages

  /**
   * The source paths containing the Gosu for which GosuDoc should be generated
   */
  static var _sources : String as Sources

  /**
   * The output directory to which GosuDoc should be generated
   */
  @Required
  static var _output : String as Output

  static property get PackageList() : List<String> {
    return _packages != null ? _packages.split("\\s*,\\s*").toList() : {}
  }

  static property get SourceDirectoryList() : List<String> {
    return _sources != null ? _sources.split("\\s*,\\s*").toList() : {}
  }
}
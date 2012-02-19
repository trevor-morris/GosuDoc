package example.gosudoc

uses java.util.Date

/**
 * Simple description
 */
class SimpleClass {

  /**
   * Create with an integer argument
   * @param intArg the integer argument
   */
  construct(intArg : int) {
    // Do nothing
  }

  /**
   * Simple date property
   */
  property get SimpleProperty() : Date {
    return null
  }

  /**
   * Simple method with a string argument
   * @param stringArg the string argument
   * @return the boolean result
   */
  function simpleMethod(stringArg : String) : boolean {
    return true
  }

  /**
   * Method with no return type
   */
  function simpleMethodNoReturn() {
  }
}
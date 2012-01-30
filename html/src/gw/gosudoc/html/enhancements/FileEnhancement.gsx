package gw.gosudoc.html.enhancements

uses java.io.File
uses java.io.FileWriter
uses java.io.IOException
uses java.io.Writer

enhancement FileEnhancement : java.io.File {

  function writeToChild(childName : String) : Writer {
    return this.getChild(childName).writeTo()
  }

  function writeTo() : Writer {
    return new FileWriter(this)
  }

  function ensureDirectoryExists() : File {
    if (not this.Directory and not this.mkdirs()) {
      throw new IOException("Unable to create directory ${this}")
    }
    return this
  }
}

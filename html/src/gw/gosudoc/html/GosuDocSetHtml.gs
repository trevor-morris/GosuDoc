package gw.gosudoc.html

uses java.io.File
uses java.lang.IllegalArgumentException
uses java.io.Writer
uses java.io.FileWriter
uses gw.fs.IDirectory
uses gw.gosudoc.core.IGosuDocSet
uses gw.gosudoc.html.templates.GosuDocGlobalJavaScriptTemplate
uses gw.gosudoc.html.templates.GosuDocGlobalJavaScriptTemplate
uses gw.gosudoc.html.templates.GosuDocIndexHtmlTemplate

/**
 * Generate HTML for an IGosuDocSet
 */
class GosuDocSetHtml {

  var _docSet : IGosuDocSet

  construct(docSet : IGosuDocSet) {
    _docSet = docSet
  }

  function generate(dir : File) {
    dir.ensureDirectoryExists()
    copyResources(dir)
    createJavaScript(dir)
    createIndexFile(dir)
    createTypeFiles(dir)
  }

  property get BaseUrl() : String {
    return "../"
  }

  property get Packages() : List<GosuDocPackageHtml> {
    return _docSet.Packages.map(\ p -> p.Html)
  }

  private function copyResources(dir : File) {
    copyResourceDirToDestinationDir(ResourceRoot, dir)
  }

  private function copyResourceDirToDestinationDir(resourceDir : IDirectory, destinationDir : File) {
    for (file in resourceDir.listFiles()) {
      file.toJavaFile().copyTo(new File(destinationDir, file.Name))
    }
    for (subDir in resourceDir.listDirs()) {
      copyResourceDirToDestinationDir(subDir, destinationDir.getChild(subDir.Name).ensureDirectoryExists())
    }
  }

  private property get ResourceRoot(): IDirectory {
    // TODO must be a better way than this?
    var gosuDocCss = (typeof this).TypeLoader.Module.FileRepository.findFirstFile("gw/gosudoc/html/resources/style/gosudoc.css")
    return gosuDocCss.Parent.Parent
  }

  private function createJavaScript(dir : File) {
    using (var writer = dir.writeToChild("script/gosudoc.js")) {
      GosuDocGlobalJavaScriptTemplate.render(writer, _docSet)
    }
  }

  private function createIndexFile(dir : File) {
    using (var writer = dir.writeToChild("doc/index.html")) {
      GosuDocIndexHtmlTemplate.render(writer, this)
    }
  }

  private function createTypeFiles(dir : File) {
    for (p in Packages) {
      p.generateHtml(dir)
    }
  }

}
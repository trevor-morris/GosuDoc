package gw.gosudoc.html

uses java.io.File
uses java.lang.IllegalArgumentException
uses java.io.Writer
uses java.io.FileWriter
uses gw.fs.IDirectory
uses gw.gosudoc.core.IGosuDocSet
uses gw.gosudoc.html.templates.GosuDocJavaScriptTemplate

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
    createTypeFiles(dir)
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
    var gosuDocCss = (typeof this).TypeLoader.Module.FileRepository.findFirstFile("gw/gosudoc/html/resources/css/gosudoc.css")
    return gosuDocCss.Parent.Parent
  }

  private function createJavaScript(dir : File) {
    using (var writer = dir.writeToChild("js/gosudoc.js")) {
      GosuDocJavaScriptTemplate.render(writer, _docSet)
    }
  }

  private function createTypeFiles(dir : File) {
    for (p in _docSet.Packages) {
      for (t in p.Types) {
        t.Html.generateHtml(dir)
      }
    }
  }

}
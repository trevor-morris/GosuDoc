uses gw.lang.cli.CommandLineAccess
uses gw.gosudoc.itype.GosuDocITypeSet
uses gw.gosudoc.html.GosuDocHtmlGenerator

CommandLineAccess.initialize(Args)

if (Args.SourceDirectoryList.Empty and Args.PackageList.Empty) {
  print("Please specify at least one of -sources <sourcedirs> or -packages <packagenames>")
  return
}

var generator = new GosuDocHtmlGenerator()
var docSet = GosuDocITypeSet.create(Args.SourceDirectoryList, Args.PackageList)
generator.generateGosuDoc(docSet, new java.io.File(Args.Output))

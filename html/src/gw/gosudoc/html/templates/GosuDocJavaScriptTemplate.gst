<%@ params(docSet: gw.gosudoc.core.IGosuDocSet) %>
<% var packages = docSet.Packages %>
var gosuTypesByPackage = {<% for (p in packages index i) { %>
  "<%=p.Name%>" : [<%=p.Types.map( \ t -> '"' + t.Name + '"').join(",")%>]<%=(i < packages.Count - 1) ? "," : ""%>
<% } %>};
var gosuDocBaseUrl = ""
function filterGosuTypes(value) {
  var lowerCaseValue = value.toLowerCase();
  var autoCompleteSource = new Array();
  for (var package in gosuTypesByPackage) {
    var types = gosuTypesByPackage[package];
    for (var i in types) {
      var shortName = types[i];
      if (shortName.toLowerCase().lastIndexOf(lowerCaseValue, 0) == 0) {
        var fullName = package + "." + shortName;
        autoCompleteSource[autoCompleteSource.length] = {
          value: fullName, label: shortName, url: "doc/" + package.replace(/\./g, '/') + "/" + shortName + ".html"
        };
      }
    }
  }
  return autoCompleteSource.sort(function(a,b) {
    return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
  });
}
$(document).ready(function() {
  $("#search").autocomplete({
    source: function(request, response) {
      response(filterGosuTypes(request.term));
    },
    select: function(event, ui) {
      window.location = gosuDocBaseUrl + ui.item.url;
    }
  }).data( "autocomplete" )._renderItem = function( ul, item ) {
    return $("<li></li>")
      .data("item.autocomplete", item)
      .append( "<a>" + item.value + "</a>" )
      .appendTo( ul );
    };
  $(".feature").each(function() {
    var summary = $(this).find(".summary")
    if (summary.length) {
      $(this).find(".overview").append(summary.clone());
    }
  });
  $(".feature .overview h3").click(function() {
    var details = $(this).parent().next()
    var summary = $(this).next()
    if (summary.length) {
      details.add(summary).slideToggle('fast');
    } else {
      details.slideToggle('fast');
    }
    return false;
  }).hover(function() {
    $(this).css('cursor','pointer');
  }, function() {
    $(this).css('cursor','auto');
  }).parent().next().hide();
  prettyPrint();
});

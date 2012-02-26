<%@ params(docSet: gw.gosudoc.core.IGosuDocSet) %>
<% var packages = docSet.Packages %>
var gosuTypesByPackage = {<% for (p in packages index i) { %>
  "<%=p.Name%>" : [<%=p.Types.map( \ t -> '"' + t.Name + '"').join(",")%>]<%=(i < packages.Count - 1) ? "," : ""%>
<% } %>};
var gosuDocBaseUrl = ""
function filterGosuTypes(value) {
  var regExp = convertToRegExp(value);
  var autoCompleteSource = new Array();
  for (var package in gosuTypesByPackage) {
    var types = gosuTypesByPackage[package];
    for (var i in types) {
      var shortName = types[i];
      if (regExp.test(shortName)) {
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
function convertToRegExp(pattern) {
  var length = pattern.length;
  var regExp = "^";
  for (var i = 0; i < length; i++) {
    var patternChar = pattern.charAt(i);
    var lower = patternChar.toLowerCase();
    var upper = patternChar.toUpperCase();
    var isAlpha = lower != upper;
    if (isAlpha) {
      if (i == 0) {
        regExp += "[" + lower + upper + "]";
      } else if (lower == patternChar) {
        regExp += "(.*" + upper + "|" + lower + ")";
      } else {
        regExp += ".*" + patternChar;
      }
    } else if (patternChar = '*') {
      regExp += ".*";
    } else {
      regExp += "\\" + patternChar;
    }
  }
  return new RegExp(regExp);
}
function initializeGoToClass() {
  $("#gotoclass").autocomplete({
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
}
function initializeSubNav() {
  // Support for sub nav bar, not fully supported Bootstrap feature
  var $win = $(window)
    , $nav = $('.subnav')
    , navTop = $('.subnav').length && $('.subnav').offset().top - 40
    , isFixed = 0

  processScroll()

  $win.on('scroll', processScroll)

  function processScroll() {
    var i, scrollTop = $win.scrollTop()
    if (scrollTop >= navTop && !isFixed) {
      isFixed = 1
      $nav.addClass('subnav-fixed')
    } else if (scrollTop <= navTop && isFixed) {
      isFixed = 0
      $nav.removeClass('subnav-fixed')
    }
  }
}

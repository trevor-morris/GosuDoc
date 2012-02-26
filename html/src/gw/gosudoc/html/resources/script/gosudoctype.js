$(document).ready(function() {
  initializeGoToClass();
  initializeSubNav();
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

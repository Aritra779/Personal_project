
$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 991) {
      $("#navbarNav").collapse('hide');
    }
  })
  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});


// On page load (before images or CSS)
(function (global){

var dc = {};
var homeHtml = "snippets/home-snippet.html";
var about = "snippets/about-snippet.html"
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};
 
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}

var switchMenuToActive = function () {
  // Remove 'active' from home button
  //classes = classes.replace(new RegExp("active", "g"), "");
  //document.querySelector("#navHomeButton").className = classes;
  clas = $("#navHomeButton").hasClass("active");
  if(clas){
    $("#navHomeButton").removeClass("active");
    $("#navAboutButton").addClass("active");
  }
  else{
    $("#navAboutButton").removeClass("active");
    $("#navHomeButton").addClass("active");
  }
  // Add 'active' to menu button if not already there
  /*classes = $("#navAboutButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navAboutButton").className = classes;
  }*/
};

document.addEventListener("DOMContentLoaded", function (event) {
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#intro")
      .innerHTML = responseText;
  },
  false);
});

dc.loadhome = function () {
  showLoading("#intro");
  switchMenuToActive();
  $ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#intro")
      .innerHTML = responseText;
  },
  false);
};
dc.loadabout = function () {
  showLoading("#intro");
  switchMenuToActive();
  $ajaxUtils.sendGetRequest(
  about,
  function (responseText) {
    document.querySelector("#intro")
      .innerHTML = responseText;
  },
  false);
};


global.$dc = dc;
})(window);

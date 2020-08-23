
$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
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
var mag_1 = "snippets/magazine_2020_p1.html"
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

document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});

dc.loadMag = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    mag_1,
    function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
};

global.$dc = dc;
})(window);

function openNav() {
  document.getElementById("mySidenav").style.width = "70%";
  document.getElementById("mySidenav").style.padding = "3%";
  document.getElementById("mySidenav").style.paddingTop = "10%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.padding = "0";
  document.getElementById("mySidenav").style.paddingTop = "10%";
}
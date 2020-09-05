// function to open/close nav
function toggleNav(){
  // if nav is open, close it
  if($("nav").is(":visible")){
    $("nav").fadeOut();
    $("button").removeClass("menu");
    $("div.container").fadeIn(1500).removeClass("hidden");
  }
  // if nav is closed, open it
  else{
    $("button").addClass("menu");
    $("nav").fadeIn().css('display', 'flex');
  }
}

// when clicking + or ☰ button
$("button").click(function(){
  // when clicking ☰ button, open nav
  if($("main").hasClass("open")){
    toggleNav();
    $("div.container").addClass("hidden");
  }
  // when clicking + button, open header
  else{
    $("main").addClass("open");
    $("#canvas").fadeIn(3000).removeClass("hidden");
    loadApp();
  }
});

// close nav
$("#nav-close").click(function(){
  toggleNav();
});

$("nav li").click(function(){
  var index = $(this).index(); 
  toggleNav();
  $('.magazine').turn('page', index);
});

$("#pop-close").click(function(){
  $('.container-fluid').hide();
  $('.container-fluid').removeClass("d");

});
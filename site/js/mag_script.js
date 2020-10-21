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
    var i = 0.1;
    var s = 0.7;
    $("tr").each(function(){
      var x = s.toString(10)+"s";
      $(this).css("animation-delay",x);
      s = s + i;
    });
  }
}

// when clicking + or ☰ button
$("button").on("click",function(){
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
$("#nav-close").on("click",function(){
  toggleNav();
});

$("tr").on('click',function(){
  var index = $(this).find("#p").text();
  index = parseInt(index);
  toggleNav();
  $('.magazine').turn('page', index);
});

$("#pop-close").on("click",function(){
  $('.container-fluid').hide();
  $('.container-fluid').removeClass("d");

});
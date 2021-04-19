// Starting with Fade In function
$(document).ready(function() { 
  $("h1").pagefade(1500, 1500); 
  $("nav").pagefade(3000, 3000); 
});

// Set up Controller
//STARTER CODE: https://codepen.io/grayghostvisuals/pen/EtdwL
// Init controller
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    duration: $('section').height() * .75,
    reverse: true
  }
});

/*
object to hold href values of links inside our nav with
the class '.anchor-nav'

scene_object = {
  '[scene-name]' : {
    '[target-scene-id]' : '[anchor-href-value]'
  }
}
*/

var scenes = {
  'intro': {
    'intro': 'intro-anchor'
  },
  'scene2': {
    'section-1': 'anchor1'
  },
  'scene3': {
    'section-2': 'anchor2'
  },
  'scene4': {
    'section-3': 'anchor3'
  }
}

for(var key in scenes) {
  // skip loop if the property is from prototype
  if (!scenes.hasOwnProperty(key)) continue;

  var obj = scenes[key];
  
  for (var prop in obj) {
    // skip loop if the property is from prototype
    if(!obj.hasOwnProperty(prop)) continue;

    new ScrollMagic.Scene({ 
        triggerElement: '#' + prop 
        })
        .setClassToggle('#' + obj[prop], 'active')
        .addTo(controller);
  }
}



// Fade in title function: https://www.jqueryscript.net/animation/Creating-A-Simple-Fade-In-Effect-On-Page-Load-with-jQuery.html
(function($) {
$.fn.pagefade = function(fadein, fadeout) {
        this.css("display", "none");
        this.fadeIn(fadein);
  $("a").click(function(event) {
event.preventDefault();
linkLocation = this.href;
this.fadeOut(fadeout, redirectPage);
  });
  function redirectPage() {
window.location.disabled= linkLocation;
  }
  return this;
};
}(jQuery));

//NEXT BUTTON

$('.js-next').click(function(e) {

  var selected = $(".js-list-item.active");
  var anchors = $(".js-list-item");

  var pos = anchors.index(selected);
  var next = anchors.get(pos+1);
  var prev = anchors.get(pos-1);
  
  $(selected).removeClass("active");
  $(next).addClass("active");
  
  var id = $(next).attr("href");
  controller.scrollTo(id);
  
	e.preventDefault();
});

$('.js-prev').click(function(e) {

  var selected = $(".js-list-item.active");
  var anchors = $(".js-list-item");

  var pos = anchors.index(selected);
  var next = anchors.get(pos+1);
  var prev = anchors.get(pos-1);
  
  $(selected).removeClass("active");
  $(prev).addClass("active");
  
  var id = $(prev).attr("href");
  controller.scrollTo(id);
  
	e.preventDefault();
});
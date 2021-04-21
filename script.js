// Starting with Fade In function
$(document).ready(function() { 
  $("h1").pagefade(1000, 1000); 
  $("nav, .title-text, .js-next").pagefade(3000, 3000); 
});

// Set up Controller
//STARTER CODE: https://codepen.io/grayghostvisuals/pen/EtdwL
// Init controller
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    duration: $('section').height(),
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
  },
  'scene5': {
    'section-4': 'anchor4'
  },
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



// Change behaviour of controller
// to animate scroll instead of jump
controller.scrollTo(function(target) {

  TweenMax.to(window, 2, {
    scrollTo : {
      y : target,
      autoKill : false // Allow scroll position to change outside itself
    },
    ease : Cubic.easeInOut
  })
  
});


// Custom CSS to make text blink

var sceneA = new ScrollMagic.Scene({triggerElement: "#trigger1"})
					// trigger animation by adding a css class
          .setPin("#animate1")					
          .setClassToggle("#animate1", "typewriter")
					.addTo(controller);

var sceneB = new ScrollMagic.Scene({triggerElement: "#trigger2"})
					// trigger animation by adding a css class
          //.setPin("#animate2")					
          .setClassToggle("#animate2", "typewriter")
					.addTo(controller);

var sceneC = new ScrollMagic.Scene({triggerElement: "#trigger3"})
					// trigger animation by adding a css class
          // .setPin("#animate3")					
          .setClassToggle("#animate3", "typewriter")
					.addTo(controller);

var sceneD = new ScrollMagic.Scene({triggerElement: "#trigger4"})
					// trigger animation by adding a css class
          // .setPin("#animate3")					
          .setClassToggle("#animate4", "typewriter")
					.addTo(controller);


//  Bind scroll to anchor links using Vanilla JavaScript
var anchor_nav = document.querySelector('.anchor-nav');

anchor_nav.addEventListener('click', function(e) {
  var target = e.target,
      id     = target.getAttribute('href');

  if(id !== null) {
    if(id.length > 0) {
      e.preventDefault();
      controller.scrollTo(id);

      if(window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  }
});



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

// $('.js-prev').click(function(e) {

//   var selected = $(".js-list-item.active");
//   var anchors = $(".js-list-item");

//   var pos = anchors.index(selected);
//   var next = anchors.get(pos+1);
//   var prev = anchors.get(pos-1);
  
//   $(selected).removeClass("active");
//   $(prev).addClass("active");
  
//   var id = $(prev).attr("href");
//   controller.scrollTo(id);
  
// 	e.preventDefault();
// });
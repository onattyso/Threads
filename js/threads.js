//Our animation
var lines = [];


var THREADS = (function() {
	return {
		line1: null,
		line2: null,
		line3: null
		init: function() {
			this.line1 = new OurVRLine();
			this.line2 = new OurVRLine();
			this.line3 = new OurVRLine();
		},
		load: function() {

		},
		draw: function() {
			this.line1.draw();
			this.line2.draw();
			this.line3.draw();
		},
		update: function() {

		},
		resize: function() {

		}
	};
})();






function OurVRLine() {
  Console.log("Initalizing the user input handler...");
  this.init();
  Console.log("User Input initialized!")
}

OurVRLine.prototype = {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  


  // Do we need this? Since we won't be having any interaction with the lines.//
  // pressed: {},
  // LEFT: 37,
  // UP: 38,
  // RIGHT: 39,
  // DOWN: 40,
  // SPACEBAR: 32, 
  // init: function() {
  //   Console.log("Keyboard init...");
  //   var that = this;
  //   window.addEventListener('keyup', function(event) { that.onKeyup(event); }, false);
  //   window.addEventListener('keydown', function(event) { that.onKeydown(event); }, false);
  // },
  // isDown: function(keyCode) {
  //   return this.pressed[keyCode];
  // },
  // onKeydown: function(event) {
  //   // console.log("keyCode pressed: " + event.keyCode);
  //   this.pressed[event.keyCode] = true;
  // },
  // onKeyup: function(event) {
  //   delete this.pressed[event.keyCode];
  // },
  draw: function() {
//  	actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
  }
};





$(document).ready(function() {
	THREADS.init();
});
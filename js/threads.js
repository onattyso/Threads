//code from index.html
//Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene. Fog so the lines disappear in the distance.
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0016);

// Create a three.js camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

// Apply VR headset positional data to camera.
var controls = new THREE.VRControls(camera);

// Apply VR stereo rendering to renderer
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

// Create a VR manager helper to enter and exit VR mode.
var vrmgr = new WebVRManager(effect);

// Create 3d objects
var geometry = new THREE.PlaneBufferGeometry( -20, -10, 10, 10);
var material = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
var line = new THREE.Mesh(geometry, material);
line.position.x = 0;
line.position.y = 0;
line.position.z = -20;
line.rotation.x = -50*Math.PI/180;

// Add mesh to your three.js scene
scene.add(line);

// Request animation frame loop function
function animate() {
  // Apply rotation to cube mesh
  // cube.rotation.y += 0.01;

  // line.rotation.y += 0.01;

  // Update VR headset position and apply to camera.
  controls.update();

  // Render the scene through the VREffect, but only if it's in VR mode.
  if (vrmgr.isVRMode()) {
    effect.render(scene, camera);
  } else {
    renderer.render(scene, camera);
  }

  requestAnimationFrame( animate );
}

// Kick off animation loop
animate();

// Listen for keyboard event and zero positional sensor on appropriate keypress.
function onKey(event) {
  if (event.keyCode == 90) { // z
    controls.zeroSensor();
  }

  // Key codes https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode

  if (event.keyCode == 74) { // "J"
    line.position.x = line.position.x - 1;
  }
  if (event.keyCode == 76) { // "L"
    line.position.x = line.position.x + 1;
  }

  if (event.keyCode == 73) { // "I"
    line.position.z = line.position.z - 1;
  }
  if (event.keyCode == 75) { // "K"
    line.position.z = line.position.z + 1;
  }

};

window.addEventListener('keydown', onKey, true);


// Handle window resizes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  effect.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize, false);


//Our animation
// var lines = [];


// var THREADS = (function() {
// 	return {
// 		line1: null,
// 		line2: null,
// 		line3: null
// 		init: function() {
// 			this.line1 = new OurVRLine();
// 			this.line2 = new OurVRLine();
// 			this.line3 = new OurVRLine();
// 		},
// 		load: function() {

// 		},
// 		draw: function() {
// 			this.line1.draw();
// 			this.line2.draw();
// 			this.line3.draw();
// 		},
// 		update: function() {

// 		},
// 		resize: function() {

// 		}
// 	};
// })();






// function OurVRLine() {
//   Console.log("Initalizing the user input handler...");
//   this.init();
//   Console.log("User Input initialized!")
// }

// OurVRLine.prototype = {
//   this.x = 0;
//   this.y = 0;
//   this.z = 0;



//   // Do we need this? Since we won't be having any interaction with the lines.//
//   // pressed: {},
//   // LEFT: 37,
//   // UP: 38,
//   // RIGHT: 39,
//   // DOWN: 40,
//   // SPACEBAR: 32, 
//   // init: function() {
//   //   Console.log("Keyboard init...");
//   //   var that = this;
//   //   window.addEventListener('keyup', function(event) { that.onKeyup(event); }, false);
//   //   window.addEventListener('keydown', function(event) { that.onKeydown(event); }, false);
//   // },
//   // isDown: function(keyCode) {
//   //   return this.pressed[keyCode];
//   // },
//   // onKeydown: function(event) {
//   //   // console.log("keyCode pressed: " + event.keyCode);
//   //   this.pressed[event.keyCode] = true;
//   // },
//   // onKeyup: function(event) {
//   //   delete this.pressed[event.keyCode];
//   // },
//   draw: function() {
// //  	actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
//   }
// };





// $(document).ready(function() {
// 	THREADS.init();
// });
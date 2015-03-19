//code from index.html

var THREADS = (function() {
  return {
    aBunchOfCubes: [],
    init: function() {
      console.log("Initializing Threads!");

      console.log("Creating some cubes...");
      this.createCube();
      this.createCube();
      this.createCube();

      console.log("Listing all of the cubes we just made...");
      this.listCubes();
      //write a function that draws to the screen
    },
    createCube: function() {
      console.log("Making a 3D cube!");
      // Build a cube here...
      var geometry = new THREE.BoxGeometry(15,15,15);// = Some geometry here;
      var material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});// = Some material here;
      
      for ( var i = 0; i < 600; i++ ) {

	      var cube = new THREE.Mesh(geometry, material);
	      		cube.position.x = Math.random() * 800 - 400;
				cube.position.y = Math.random() * 800 - 400;
				cube.position.z = Math.random() * 800 - 400;

				cube.rotation.x = Math.random() * 2 * Math.PI;
				cube.rotation.y = Math.random() * 2 * Math.PI;
				cube.rotation.z = Math.random() * 2 * Math.PI;

				cube.scale.x = Math.random() + 0.5;
				cube.scale.y = Math.random() + 0.5;
				cube.scale.z = Math.random() + 0.5;

	      scene.add(cube);
	  }

      // And then save it to the aBunchOfCubes array:
      this.aBunchOfCubes.push(cube);

      // Comment this out to STOP adding FAKE cubes to the list:
      this.aBunchOfCubes.push("NOT A CUBE! Go write some code!");
    },
    listCubes: function() {
      var cubeCount = this.aBunchOfCubes.length;
      if (cubeCount == 0) {
        console.log("No cubes found!");
      } else {
        console.log(cubeCount + " cubes found!");
        for (var i = 0; i < cubeCount; i++) {
          console.log("Cube " + i + ":");
          console.dir(this.aBunchOfCubes[i]);
        }
      }

    }
  };
})();








//Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene. Fog so the lines disappear in the distance.
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0016);

//lights!
var light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 1, 1, 1 ).normalize();
scene.add( light );

var amblight = new  THREE.AmbientLight (0x333333);
scene.add(amblight);

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
var material = new THREE.MeshPhongMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
var line = new THREE.Mesh(geometry, material);
line.position.x = 0;
line.position.y = 0;
line.position.z = -20;
line.rotation.x = -50*Math.PI/180;

// Add mesh to your three.js scene
scene.add(line);

// Request animation frame loop function
function animate() {

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

}

window.addEventListener('keydown', onKey, true);


// Handle window resizes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  effect.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize, false);



$(document).ready(function() {
  THREADS.init();
});




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
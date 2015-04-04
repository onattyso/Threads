//
// thread.js

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function randomBetween(start, end){
return Math.floor(Math.random() * (end - start + 1) + start);
}

var THREADS = (function () {
  return {
    aBunchOfCubes: [],
    allObjects: [],
    timer: 0,

    init: function () {
      this.rot_speed=Math.random();
      for (var i = 0; i < 400; i++) {
        this.createCube();
      }
      this.listCubes();
      this.createLine();
      requestAnimationFrame(this.animate)

    },
    createCube: function () {
      var aCube = new OurVRCube();
      // And then save it to the aBunchOfCubes array:
      this.aBunchOfCubes.push(aCube);
      scene.add(aCube.cube);

    },
    createLine: function () {
      var aLine = new OurVRLine();
      this.allObjects.push(aLine);
      scene.add(aLine.line);

    },

    listCubes: function () {
      var cubeCount = this.aBunchOfCubes.length;
      if (cubeCount > 0) {
        for (var i = 0; i < cubeCount; i++) {
          console.log("Cube " + i + ":");
          console.dir(this.aBunchOfCubes[i]);
        }
      } else {
        console.log("No cubes found!");
      }
    },

    listLines: function () {
      var lineCount = this.allObjects.length;
      if (lineCount > 0) {
        for (var i = 0; i < lineCount; i++) {
          console.log("line " + i + ":");
          console.dir(this.allObjects[i]);
        }
      } else {
        console.log("No lines found!");
      }

    },

    updateAll: function() {
      var count = this.allObjects.length;
      if (count > 0) {
        for (var i = 0; i < count; i++) {
          this.allObjects[i].update();
        }
      } else {
        console.log("No objects found!");
      }
      var cubecount = this.aBunchOfCubes.length;
      if (cubecount > 0) {
        for (var i = 0; i < cubecount; i++) {
          this.aBunchOfCubes[i].update();
        }
      } else {
        console.log("No cubes found!");
      }
    },

	animate: function() {
	  // Update VR headset position and apply to camera.
	  controls.update();
	  THREADS.updateAll();
	  camera.position.z--;
	  // Render the scene through the VREffect, but only if it's in VR mode.
	  if (vrmgr.isVRMode()) {
	    effect.render(scene, camera);
	  } else {
	    renderer.render(scene, camera);
	  }
  	  THREADS.timer += 1;
	  requestAnimationFrame(THREADS.animate);
	}
  };
})();


function OurVRCube() {
  this.init();
}
OurVRCube.prototype = {
  x: 0,
  y: 0,
  z: 0,
  geometry: 0,
  material: 0,
  cube: 0,
  rot_speed: null,
  init: function () {
    // Build a cube here...
    this.geometry = new THREE.BoxGeometry(15, 15, 15);
    this.material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
    this.cube = new THREE.Mesh(this.geometry, this.material);

    this.cube.position.x = Math.random() * 800 - 400;
    this.cube.position.y = Math.random() * 800 - 400;
    this.cube.position.z = Math.random() * 800 - 400;

    this.cube.rotation.x = Math.random() * 2 * Math.PI;
    this.cube.rotation.y = Math.random() * 2 * Math.PI;
    this.cube.rotation.z = Math.random() * 2 * Math.PI;
  },
  update: function() {
    this.cube.position.x += Math.sin(toRadians(THREADS.timer)*this.rot_speed)/6;
    this.cube.position.y += Math.cos(toRadians(THREADS.timer)*this.rot_speed)/6;
  },
  draw: function () {
//   actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
  }
};


function OurVRLine() {
  this.init();
}
OurVRLine.prototype = {
  x: 0,
  y: 0,
  z: 0,
  line: null,
  init: function () {

	this.geometry = new THREE.PlaneBufferGeometry(-20, -10, 10, 10);
	this.material = new THREE.MeshPhongMaterial({color: 0xff0000, side: THREE.DoubleSide});
	this.line = new THREE.Mesh(this.geometry, this.material);
	this.line.position.x = 0;
	this.line.position.y = -15;
	this.line.position.z = -20;
	this.line.rotation.x = -80 * Math.PI / 180;
	
  },
  update: function() {
  	// this.line.rotation.x += 1*Math.PI/180;    
  	this.line.scale.y++;
  },
  draw: function () {
//   actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
  }
};

// function OurVRCamera(camera) {
//   console.log("Building a new camera");
//   this.init();
// }
// OurVRCamera.prototype = {
//   x: 0,
//   y: 0,
//   z: 0,
//   line: null,
//   init: function () {
//   	this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
//   	this.camera.position.set(0, 50, 500);
//   },
//   update: function() {
//   	this.camera.position.z--;
//   },
//   draw: function () {
// //   actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
//   }
// };


//=====================
// Everything after here is going to be moving somewhere else at some point...

//Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer({antialias: true});

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene. Fog so the lines disappear in the distance.
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0016);

//lights!
var light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(1, 1, 1).normalize();
light.position.set(1, 1, 1);
scene.add(light);

var amblight = new THREE.AmbientLight(0x333333);
scene.add(amblight);

// Create a three.js camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 0, 0);
scene.add(camera);

// Apply VR headset positional data to camera.
var controls = new THREE.VRControls(camera);

// Apply VR stereo rendering to renderer
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

// Create a VR manager helper to enter and exit VR mode.
var vrmgr = new WebVRManager(effect);

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

function onWindowResize() {
  THREADS.camera.aspect = window.innerWidth / window.innerHeight;
  THREADS.camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);


// Everything above here is going to be moved somewhere else where it can be better managed...
//=====================



//=====================
// As long as this is AFTER all of the other code, we can put the "var THREAD" definition anywhere in this file
// (assuming it's not in another block...)
$(document).ready(function () {
  THREADS.init();
});


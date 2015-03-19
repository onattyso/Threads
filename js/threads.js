//
// thread.js
// 2015/03/14
//
// I moved THREADS back up to the top because the rest of the app is not going to stay where it is for very long...
// It'll all get moved into THREADS in some way or another down the road...
var THREADS = (function () {
  return {
    aBunchOfCubes: [],
    allObjects: [],

    init: function () {
      console.log("Initializing Threads!");

      console.log("Creating some cubes...");

      for (var i = 0; i < 600; i++) {
        this.createCube();
      }

      console.log("Listing all of the cubes we just made...");
      this.listCubes();
      //write a function that draws to the screen

      this.createLine();
    },
    createCube: function () {
      var aCube = new OurVRCube();

      // And then save it to the aBunchOfCubes array:
      this.aBunchOfCubes.push(aCube);

      // And add it to the scene (this could be move to a later point in the app...)
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
        console.log(cubeCount + " cubes found!");
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
        console.log(lineCount + " lines found!");
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
        console.log(count + " lines found!");
        for (var i = 0; i < lineCount; i++) {
          this.allObjects[i].update();
        }
      } else {
        console.log("No objects found!");
      }
    }
  };
})();


function OurVRCube() {
  console.log("Building a new Cube");
  this.init();
}
OurVRCube.prototype = {
  x: 0,
  y: 0,
  z: 0,
  geometry: 0,
  material: 0,
  cube: 0,
  init: function () {
    console.log("Making a 3D cube!");
    // Build a cube here...
    this.geometry = new THREE.BoxGeometry(15, 15, 15);// = Some geometry here;

    this.material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});

    this.cube = new THREE.Mesh(this.geometry, this.material);

    //var cube = new THREE.Mesh(geometry, (new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff})));
    //this.cube.material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});

    this.cube.position.x = Math.random() * 800 - 400;
    this.cube.position.y = Math.random() * 800 - 400;
    this.cube.position.z = Math.random() * 800 - 400;

    this.cube.rotation.x = Math.random() * 2 * Math.PI;
    this.cube.rotation.y = Math.random() * 2 * Math.PI;
    this.cube.rotation.z = Math.random() * 2 * Math.PI;
  },
  update: function() {
    
  },
  draw: function () {
//   actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
  }
};


function OurVRLine() {
  console.log("Building a new line");
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
	this.line.position.y = 0;
	this.line.position.z = -20;
	this.line.rotation.x = -50 * Math.PI / 180;
	
  },
  update: function() {
    
  },
  draw: function () {
//   actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
  }
};




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
light.position.set(1, 1, 1).normalize();
scene.add(light);

var amblight = new THREE.AmbientLight(0x333333);
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

  requestAnimationFrame(animate);
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


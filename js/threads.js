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
    },
    createCube: function() {
      console.log("Making a 3D cube!");
      // Build a cube here...
      var cube_geometry;// = Some geometry here;
      var cube_material;// = Some material here;
      // And then save it to the aBunchOfCubes array:
      //this.aBunchOfCubes.push(new THREE.Mesh(cube_geometry, cube_material));

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


//============
// triangle test

var tri_geo = new THREE.Geometry();
// var normal = new THREE.Vector3( 0, 1, 0 );
// var color = new THREE.Color( 0xffaa00 );
// var face = new THREE.Face3( 0, 1, 2, normal, color, 0 );

var v1 = new THREE.Vector3(0,0,0);
var v2 = new THREE.Vector3(5,0,0);
var v3 = new THREE.Vector3(0,5,0);

tri_geo.vertices.push(v1);
tri_geo.vertices.push(v2);
tri_geo.vertices.push(v3);

tri_geo.faces.push( new THREE.Face3( 0, 1, 2 ) );
tri_geo.computeFaceNormals();

// tri_geo.computeBoundingSphere();
var redMat = new THREE.MeshBasicMaterial({color: 0xff0000});
var triMat = new THREE.MeshNormalMaterial();
var triangle = new THREE.Mesh(tri_geo, redMat);

triangle.position.z = -20;
triangle.position.y = 10;

// And we should be good to go on adding it to the scene in the correct location:
scene.add(triangle);

// triangle test
//============








//============
// Cube object:

// Create 3d objects
var geometry = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);

// Position cube mesh:
// This time, we'll use a Vector3 to position the object.
// So, instead of these two lines:
// cube.position.z = -20;

// We'll use a Vector3
var cube_start_pos = new THREE.Vector3( 0, 0, -20 ); // x, y, z

var quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), 45*Math.PI / 180 );

// And set the objects position directly using that vector:
// cube.position = cube_start_pos;

console.log("What: " + cube.position.z);

// cube.position.setZ(cube_start_pos.z); // works but is too tedius to use
// cube.position.set(cube_start_pos); // z is undefined
cube.position = cube_start_pos; // Doesn't work, leaves z at zero.
cube.quaternion = quaternion;
cube.updateMatrix();
cube.matrixAutoUpdate = true;
// cube.matrixAutoUpdate = false;

console.log("The fuck: " + cube.position.z);
console.log("Type: " + cube.type);
// Then we need to update the objects matrix...
// cube.updateMatrix();
// cube.updateMatrixWorld();
// cube.matrixWorldNeedsUpdate = true;

// Add cube mesh to your three.js scene
scene.add(cube);

// Cube object
//============










//============
// Text object
var textParams = {
  size: 1,
  height: 1,
  font: 'helvetiker'
};

var textMesh = new THREE.TextGeometry( "Console..........:!@#42350\/", textParams);
// var textMaterial = new THREE.MeshBasicMaterial({color: 0xFF5555});
var textMaterial = new THREE.MeshNormalMaterial();
var textObj = new THREE.Mesh(textMesh, textMaterial);

textObj.position.z = -20;
textMesh.computeBoundingBox();
console.log("Size max x: " + textMesh.boundingBox.max.x);
console.log("Size min x: " + textMesh.boundingBox.min.x);
textObj.position.x = -textMesh.boundingBox.max.x/2;
textObj.position.y = 10;
textObj.rotation.x = 30*Math.PI/180;

// Add text to the scene
scene.add(textObj);

// Text object
//============



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

function OurVRCube() {
  //this.init();

  // Build a cube here...
  this.geometry = new THREE.BoxGeometry(15, 15, 15);
  //this.material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
  this.material = new THREE.MeshPhongMaterial({color: Math.random() * 0xff << 4 });
  this.cube = new THREE.Mesh(this.geometry, this.material);

  this.cube.position.x = Math.random() * 800 - 400;
  this.cube.position.y = Math.random() * 800 - 400;
  this.cube.position.z = Math.random() * 800 - 400;

  this.cube.position.x = 0;
  this.cube.position.y = 0;
  this.cube.position.z = -20;

  this.cube.rotation.x = Math.random() * 1 * Math.PI;
  this.cube.rotation.y = Math.random() * 1 * Math.PI;
  this.cube.rotation.z = Math.random() * 1 * Math.PI;
}
OurVRCube.prototype = {
  x: 0,
  y: 0,
  z: 0,
  geometry: 0,
  material: 0,
  cube: 0,

  update: function () {
    this.cube.rotation.x += 0.1 * Math.PI / 180;
    //this.cube.position.z--;
  },
  draw: function () {
//   actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
  }
};


function OurVRLine() {
  //this.init();

  this.geometry = new THREE.PlaneBufferGeometry(-20, -10, 10, 10);
  this.material = new THREE.MeshPhongMaterial({color: 0xff0000, side: THREE.DoubleSide});
  this.line = new THREE.Mesh(this.geometry, this.material);
  this.line.position.x = 0;
  this.line.position.y = -15;
  this.line.position.z = -20;
  this.line.rotation.x = -80 * Math.PI / 180;
}
OurVRLine.prototype = {
  x: 0,
  y: 0,
  z: 0,
  line: null,

  update: function () {
    // this.line.rotation.x += 1*Math.PI/180;
    //this.line.scale.y++;
  },
  draw: function () {
//   actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
  }
};

function objectStrange() {
  // Create 3d objects
  var geometry = new THREE.PlaneBufferGeometry(-20, -10, 10, 10);
  var material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
  var line = new THREE.Mesh(geometry, material);
  line.position.x = 0;
  line.position.y = 0;
  line.position.z = -20;
  line.rotation.x = -50 * Math.PI / 180;

// Add mesh to your three.js scene
  SCENE.add(line);
}

function objectText() {
  var textParams = {
    size: 1,
    height: 1,
    font: 'helvetiker'
  };

  var textMesh = new THREE.TextGeometry("Console..........:!@#42350\/", textParams);
// var textMaterial = new THREE.MeshBasicMaterial({color: 0xFF5555});
  var textMaterial = new THREE.MeshNormalMaterial();
  var textObj = new THREE.Mesh(textMesh, textMaterial);

  textObj.position.z = -20;
  textMesh.computeBoundingBox();
  console.log("Size max x: " + textMesh.boundingBox.max.x);
  console.log("Size min x: " + textMesh.boundingBox.min.x);
  textObj.position.x = -textMesh.boundingBox.max.x / 2;
  textObj.position.y = 10;
  textObj.rotation.x = 30 * Math.PI / 180;

// Add text to the scene
  SCENE.add(textObj);
}

function Cube() {
  // Create 3d objects
  this.geometry = new THREE.BoxGeometry(10, 10, 10);
  this.material = new THREE.MeshNormalMaterial();
  this.cube = new THREE.Mesh(this.geometry, this.material);

  // Position cube mesh:
  // This time, we'll use a Vector3 to position the object.
  // So, instead of these two lines:
  // cube.position.z = -20;

  // We'll use a Vector3
  var cube_start_pos = new THREE.Vector3(0, 0, -20); // x, y, z

  // And set the objects position directly using that vector:
  this.cube.position.set(cube_start_pos.x, cube_start_pos.y, cube_start_pos.z);

}
Cube.prototype = {
  x: 0,
  y: 0,
  z: 0,
  cube: 0,
  angle: 0,

  update: function () {

    this.angle += 1;

    // Rotate the cube mesh:
    // This time, we'll use Quaternion's to rotate the object..
    // So, we build a quaternion:
    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), this.angle * Math.PI / 180);

    //console.dir(quaternion._w);

    // Then apply the quaternion instead of the Object3D's rotation parameters:

    this.cube.rotation.setFromQuaternion(quaternion);

    //this.cube.quaternion = quaternion;
    //
    //// Then we need to update the objects matrix...
    //this.cube.updateMatrix();
    //this.cube.matrixAutoUpdate = true;
    //this.cube.updateMatrixWorld();
    //this.cube.matrixWorldNeedsUpdate = true;
  },
  draw: function () {
//   actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
  }
};


function objectTriangleTest() {
  var tri_geo = new THREE.Geometry();
// var normal = new THREE.Vector3( 0, 1, 0 );
// var color = new THREE.Color( 0xffaa00 );
// var face = new THREE.Face3( 0, 1, 2, normal, color, 0 );

  var v1 = new THREE.Vector3(0, 0, 0);
  var v2 = new THREE.Vector3(5, 0, 0);
  var v3 = new THREE.Vector3(0, 5, 0);

  tri_geo.vertices.push(v1);
  tri_geo.vertices.push(v2);
  tri_geo.vertices.push(v3);

  tri_geo.faces.push(new THREE.Face3(0, 1, 2));
  tri_geo.computeFaceNormals();

// tri_geo.computeBoundingSphere();
  var redMat = new THREE.MeshBasicMaterial({color: 0xff0000});
  var triMat = new THREE.MeshNormalMaterial();
  var triangle = new THREE.Mesh(tri_geo, redMat);

  triangle.position.z = -20;
  triangle.position.y = 10;

// And we should be good to go on adding it to the scene in the correct location:
  SCENE.add(triangle);
}

function objectLineTest() {
  //Create a closed bent a sine-like wave
  var curve = new THREE.SplineCurve3( [
    new THREE.Vector3( -10, 0, 10 ),
    new THREE.Vector3( -5, 5, 5 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 5, -5, 5 ),
    new THREE.Vector3( 10, 0, 10 )
  ] );

  var geometry = new THREE.Geometry();
  geometry.vertices = curve.getPoints( 50 );

  var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

//Create the final Object3d to add to the scene
  var splineObject = new THREE.Line( geometry, material );

  splineObject.position.z = -20;
  SCENE.add(splineObject);
}

function randomCurve() {
  var aVec3 = new THREE.Vector3(1,2,3);

  var points = [];
  for (var i = 0; i < 10; i++) {
    points.push(new THREE.Vector3(randomBetween(-10,10), randomBetween(-10,10), randomBetween(-20, -200)));
  }

  var curve = new THREE.SplineCurve3(points);
  var geometry = new THREE.Geometry();
  geometry.vertices = curve.getPoints( 50 );
  var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
  var splineObject = new THREE.Line( geometry, material );
  SCENE.add(splineObject);

}
//
// thread.js

var THREADS = (function () {
  return {
    aBunchOfCubes: [],
    allObjects: [],

    init: function () {
      console.log("Initializing Threads!");

      for (var i = 0; i < 400; i++) {
        this.createCube();
      }

      //this.createLine();


      //objectText();
      //objectLineTest();
      //randomCurve();


      //this.createJamesCube();

      requestAnimationFrame(this.animate)

    },
    createJamesCube: function () {
      var jamesCube = new Cube();

      // And then save it to the aBunchOfCubes array:
      this.allObjects.push(jamesCube);

      // And add it to the scene (this could be move to a later point in the app...)
      SCENE.add(jamesCube.cube);

    },
    createCube: function () {
      var aCube = new OurVRCube();

      // And then save it to the aBunchOfCubes array:
      this.aBunchOfCubes.push(aCube);

      // And add it to the scene (this could be move to a later point in the app...)
      SCENE.add(aCube.cube);

    },
    createLine: function () {
      var aLine = new OurVRLine();

      this.allObjects.push(aLine);
      SCENE.add(aLine.line);

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

    updateAll: function () {
      var count = this.allObjects.length;
      if (count > 0) {
        for (var i = 0; i < count; i++) {
          this.allObjects[i].update();
        }
      }
      var cubecount = this.aBunchOfCubes.length;
      if (cubecount > 0) {
        for (i = 0; i < cubecount; i++) {
          this.aBunchOfCubes[i].update();
        }
      }
    },

    animate: function () {

      // Update VR headset position and apply to camera.
      SCENE.update();
      THREADS.updateAll();
      //camera.position.z += -1;

      SCENE.draw();

      requestAnimationFrame(THREADS.animate);
    }
  };
})();


//=====================
// Kick off the VR/3D scene, then start the app itself:
$(document).ready(function () {
  SCENE.init();
  THREADS.init();
});




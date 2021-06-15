import * as THREE from "three";
import "../bootstrap";

THREE.Bootstrap.registerPlugin("scene", {
  install: function (three) {
    three.scene = new THREE.Scene();
  },

  uninstall: function (three) {
    delete three.scene;
  },
});

import { Scene } from "three/src/scenes/Scene.js";
import { Bootstrap } from "../bootstrap";

Bootstrap.registerPlugin("scene", {
  install: function (three) {
    three.scene = new Scene();
  },

  uninstall: function (three) {
    delete three.scene;
  },
});

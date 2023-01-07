import { Scene } from "three";
import { Bootstrap } from "../bootstrap";

Bootstrap.registerPlugin("scene", {
  install: function (three) {
    three.scene = new Scene();
  },

  uninstall: function (three) {
    delete three.scene;
  },
});

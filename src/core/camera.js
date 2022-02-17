import { Camera } from "three/src/cameras/Camera.js";
import { OrthographicCamera } from "three/src/cameras/OrthographicCamera.js";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera.js";
import { Bootstrap } from "../bootstrap";

Bootstrap.registerPlugin("camera", {
  defaults: {
    near: 0.01,
    far: 10000,

    type: "perspective",
    fov: 60,
    aspect: null,

    // type: 'orthographic',
    left: -1,
    right: 1,
    bottom: -1,
    top: 1,

    klass: null,
    parameters: null,
  },

  listen: ["resize", "this.change"],

  install: function (three) {
    three.Camera = this.api();
    three.camera = null;

    this.aspect = 1;
    this.change({}, three);
  },

  uninstall: function (three) {
    delete three.Camera;
    delete three.camera;
  },

  change: function (event, three) {
    var o = this.options;
    var old = three.camera;

    if (!three.camera || event.changes.type || event.changes.klass) {
      var klass =
        o.klass ||
        {
          perspective: PerspectiveCamera,
          orthographic: OrthographicCamera,
        }[o.type] ||
        Camera;

      three.camera = o.parameters ? new klass(o.parameters) : new klass();
    }

    Object.entries(o).forEach(
      function ([key]) {
        if (Object.prototype.hasOwnProperty.call(three.camera, key))
          three.camera[key] = o[key];
      }.bind(this)
    );

    this.update(three);

    old === three.camera ||
      three.trigger({
        type: "camera",
        camera: three.camera,
      });
  },

  resize: function (event, three) {
    this.aspect = event.viewWidth / Math.max(1, event.viewHeight);

    this.update(three);
  },

  update: function (three) {
    three.camera.aspect = this.options.aspect || this.aspect;
    three.camera.updateProjectionMatrix();
  },
});

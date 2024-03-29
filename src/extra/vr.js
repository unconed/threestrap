import { Bootstrap } from "../bootstrap.js";
import { VRRenderer } from "../renderers/VRRenderer.js";

/*
VR sensor / HMD hookup.
*/
Bootstrap.registerPlugin("vr", {
  defaults: {
    mode: "auto", // 'auto', '2d'
    device: null,
    fov: 80, // emulated FOV for fallback
  },

  listen: ["window.load", "pre", "render", "resize", "this.change"],

  install: function (three) {
    three.VR = this.api(
      {
        active: false,
        devices: [],
        hmd: null,
        sensor: null,
        renderer: null,
        state: null,
      },
      three
    );
  },

  uninstall: function (three) {
    delete three.VR;
  },

  mocks: function (three, fov, def) {
    // Fake VR device for cardboard / desktop

    // Interpuppilary distance
    const ipd = 0.03;

    // Symmetric eye FOVs (Cardboard style)
    const getEyeTranslation = function (key) {
      return { left: { x: -ipd, y: 0, z: 0 }, right: { x: ipd, y: 0, z: 0 } }[
        key
      ];
    };
    const getRecommendedEyeFieldOfView = function (key) {
      const camera = three.camera;
      const aspect = (camera && camera.aspect) || 16 / 9;
      const fov2 = (fov || (camera && camera.fov) || def) / 2;
      const fovX =
        (Math.atan((Math.tan((fov2 * Math.PI) / 180) * aspect) / 2) * 180) /
        Math.PI;
      const fovY = fov2;

      return {
        left: {
          rightDegrees: fovX,
          leftDegrees: fovX,
          downDegrees: fovY,
          upDegrees: fovY,
        },
        right: {
          rightDegrees: fovX,
          leftDegrees: fovX,
          downDegrees: fovY,
          upDegrees: fovY,
        },
      }[key];
    };
    // Will be replaced with orbit controls or device orientation controls by VRControls
    const getState = function () {
      return {};
    };

    return [
      {
        fake: true,
        force: 1,
        deviceId: "emu",
        deviceName: "Emulated",
        getEyeTranslation: getEyeTranslation,
        getRecommendedEyeFieldOfView: getRecommendedEyeFieldOfView,
      },
      {
        force: 2,
        getState: getState,
      },
    ];
  },

  load: function (event, three) {
    const callback = function (devs) {
      this.callback(devs, three);
    }.bind(this);

    if (navigator.getVRDevices) {
      navigator.getVRDevices().then(callback);
    } else if (navigator.mozGetVRDevices) {
      navigator.mozGetVRDevices(callback);
    } else {
      console.warn("No native VR support detected.");
      callback(this.mocks(three, this.options.fov, this.defaults.fov), three);
    }
  },

  callback: function (vrdevs, three) {
    let hmd, sensor;

    const HMD = window.HMDVRDevice || function () {};
    const SENSOR = window.PositionSensorVRDevice || function () {};

    // Export list of devices
    vrdevs = three.VR.devices = vrdevs || three.VR.devices;

    // Get HMD device
    const deviceId = this.options.device;
    let dev;

    for (let i = 0; i < vrdevs.length; ++i) {
      dev = vrdevs[i];
      if (dev.force == 1 || dev instanceof HMD) {
        if (deviceId && deviceId != dev.deviceId) continue;
        hmd = dev;
        break;
      }
    }

    if (hmd) {
      // Get sensor device
      let dev;
      for (let i = 0; i < vrdevs.length; ++i) {
        dev = vrdevs[i];
        if (
          dev.force == 2 ||
          (dev instanceof SENSOR && dev.hardwareUnitId == hmd.hardwareUnitId)
        ) {
          sensor = dev;
          break;
        }
      }

      this.hookup(hmd, sensor, three);
    }
  },

  hookup: function (hmd, sensor, three) {
    if (!VRRenderer) console.log("VRRenderer not found");
    const klass = VRRenderer || function () {};

    this.renderer = new klass(three.renderer, hmd);
    this.hmd = hmd;
    this.sensor = sensor;

    three.VR.renderer = this.renderer;
    three.VR.hmd = hmd;
    three.VR.sensor = sensor;

    console.log("VRRenderer", hmd.deviceName);
  },

  change: function (event, three) {
    if (event.changes.device) {
      this.callback(null, three);
    }
    this.pre(event, three);
  },

  pre: function (event, three) {
    const last = this.active;

    // Global active flag
    const active = (this.active = this.renderer && this.options.mode != "2d");
    three.VR.active = active;

    // Load sensor state
    if (active && this.sensor) {
      const state = this.sensor.getState();
      three.VR.state = state;
    } else {
      three.VR.state = null;
    }

    // Notify if VR state changed
    if (last != this.active) {
      three.trigger({
        type: "vr",
        active: active,
        hmd: this.hmd,
        sensor: this.sensor,
      });
    }
  },

  resize: function (_event, _three) {
    if (this.active) {
      // Reinit HMD projection
      this.renderer.initialize();
    }
  },

  render: function (event, three) {
    if (three.scene && three.camera) {
      const renderer = this.active ? this.renderer : three.renderer;

      if (this.last != renderer) {
        if (renderer == three.renderer) {
          // Cleanup leftover renderer state when swapping back to normal
          const dpr = renderer.getPixelRatio();
          const width = renderer.domElement.width / dpr;
          const height = renderer.domElement.height / dpr;
          renderer.setScissorTest(false);
          renderer.setViewport(0, 0, width, height);
        }
      }

      this.last = renderer;

      renderer.render(three.scene, three.camera);
    }
  },
});

/*
VR rendering pass + sensor / HMD hookup.
*/
THREE.Bootstrap.registerPlugin('vr', {

  defaults: {
    mode:   'auto',    // 'auto', '2d'
    device:  null,
  },

  listen: ['window.load', 'pre', 'render', 'this.change'],

  install: function (three) {
    three.VR = this.api({
      active:   false,
      devices:  [],
      hmd:      null,
      sensor:   null,
      renderer: null,
      state:    null,
    }, three);
  },

  uninstall: function (three) {
    delete three.VR
  },

  mocks: function (camera) {
    var aspect = camera.aspect;
    var fov    = camera.fov;

    var fovX = Math.atan(Math.tan(fov * Math.PI / 360) * aspect / 2) * 360 / Math.PI;
    var fovY = fov;

    // Fake VR device for cardboard / desktop
    var getEyeTranslation = function (key) { return {left: {x: -0.03, y: 0, z: 0}, right: {x: 0.03, y: 0, z: 0}}[key]; };
    var getRecommendedEyeFieldOfView = function (key) { return {
        left: {
          "rightDegrees": fovX,
          "leftDegrees":  fovX,
          "downDegrees":  fovY,
          "upDegrees":    fovY,
        },
        right: {
          "rightDegrees": fovX,
          "leftDegrees":  fovX,
          "downDegrees":  fovY,
          "upDegrees":    fovY,
        },
      }[key];
    };
    // Will be replaced with orbit controls or device orientation controls by THREE.VRControls
    var getState = function () { return {} };

    return [
      {
        fake: true,
        force: 1,
        deviceId: 'emu',
        deviceName: 'Emulated',
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
    var callback = function (devs) {
      this.callback(devs, three);
    }.bind(this);

    if (navigator.getVRDevices) {
      navigator.getVRDevices().then(callback);
    }
    else if (navigator.mozGetVRDevices) {
      navigator.mozGetVRDevices(callback);
    }
    else {
      console.warn('No VR support detected in browser.');
      callback(this.mocks(three.camera), three);
    }
  },

  callback: function (vrdevs, three) {
    var hmd, sensor;

    var HMD    = window.HMDVRDevice            || function () {};
    var SENSOR = window.PositionSensorVRDevice || function () {};

    // Export list of devices
    vrdevs = three.VR.devices = vrdevs || three.VR.devices;

    // Get HMD device
    var deviceId = this.options.device;
    for (var i = 0; i < vrdevs.length; ++i) {
      var dev = vrdevs[i];
      if (dev.force == 1 || (dev instanceof HMD)) {
        if (deviceId && deviceId != dev.deviceId) continue;
        hmd = dev;
        break;
      }
    }

    if (hmd) {
      // Get sensor device
      for (var i = 0; i < vrdevs.length; ++i) {
        var dev = vrdevs[i];
        if (dev.force == 2 || (dev instanceof SENSOR && dev.hardwareUnitId == hmd.hardwareUnitId)) {
          sensor = dev;
          break;
        }
      }

      this.hookup(hmd, sensor, three);
    }
  },

  hookup: function (hmd, sensor, three) {
    var klass = THREE.VRRenderer || function () {};

    this.renderer = new klass(three.renderer, hmd);
    this.hmd      = hmd;
    this.sensor   = sensor;

    three.VR.renderer = this.renderer;
    three.VR.hmd      = hmd;
    three.VR.sensor   = sensor;

    console.log("THREE.VRRenderer", hmd.deviceName);
  },

  change: function (event, three) {
    if (event.changes.device) {
      this.callback(null, three);
    }
    this.pre(event, three);
  },

  pre: function (event, three) {
    var last = this.active;

    // Global active flag
    var active = this.active = this.renderer && this.options.mode != '2d';
    three.VR.active = active;

    // Load sensor state
    if (active && this.sensor) {
      var state = this.sensor.getState();
      three.VR.state = state;
    }
    else {
      three.VR.state = null;
    }

    // Notify if VR state changed
    if (last != this.active) {
      three.trigger({ type: 'vr', active: active, hmd: this.hmd, sensor: this.sensor });
    }

  },

  render: function (event, three) {
    if (three.scene && three.camera) {
      var renderer = this.active ? this.renderer : three.renderer;

      // Cleanup leftover renderer state when swapping back to normal
      if (this.last != renderer && renderer == three.renderer) {
        var dpr    = renderer.devicePixelRatio;
        var width  = renderer.domElement.width / dpr;
        var height = renderer.domElement.height / dpr;
        renderer.enableScissorTest(false);
        renderer.setViewport(0, 0, width, height);
      }
      this.last = renderer;

      renderer.render(three.scene, three.camera);
    }
  },

});


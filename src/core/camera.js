THREE.Bootstrap.registerPlugin('camera', {

  defaults: {
    near: .1,
    far: 10000,

    type: 'perspective',
    fov: 60,
    aspect: null,

    // type: 'orthographic',
    left: -1,
    right: 1,
    bottom: -1,
    top: 1,
  },

  listen: ['resize', 'this.change'],

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

    if (three.camera && !event.changes.type) {
      ['near', 'far', 'left', 'right', 'top', 'bottom', 'fov'].map(function (key) {
        if (o[key] !== undefined) {
          three.camera[key] = o[key];
        }
      }.bind(this));
    }
    else {
      switch (o.type) {
        case 'perspective':
          three.camera = new THREE.PerspectiveCamera(o.fov, this.aspect, o.near, o.far);
          break;

        case 'orthographic':
          three.camera = new THREE.OrthographicCamera(o.left, o.right, o.top, o.bottom, o.near, o.far);
          break;
      }
    }

    three.camera.updateProjectionMatrix();

    three.trigger({
      type: 'camera',
      camera: three.camera,
    });
  },

  resize: function (event, three) {
    this.aspect = this.options.aspect || event.viewWidth / Math.max(1, event.viewHeight) || 1;
    three.camera.aspect = this.aspect;
    three.camera.updateProjectionMatrix();
  },

});
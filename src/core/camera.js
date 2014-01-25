THREE.Bootstrap.registerPlugin('camera', {

  defaults: {
    near: .1,
    far: 10000,

    type: 'perspective',
    fov: 60,
    aspect: 'auto',

    // type: 'orthographic',
    left: -1,
    right: 1,
    bottom: -1,
    top: 1,
  },

  install: function (three, renderer, element) {

    this.three = three;

    this.handler = this.resize.bind(this);
    three.addEventListener('resize', this.handler);

    three.Camera = this.api();
    three.camera = null;

    this.aspect = 1;
    this.change();

    this.addEventListener('change', this.change.bind(this));
  },

  uninstall: function (three, renderer, element) {
    three.removeEventListener('resize', this.handler);

    delete three.Camera;
    delete three.camera;
  },

  change: function () {
    var o = this.options;

    if (this.camera && o.type == this.cameraType) {
      ['near', 'far', 'left', 'right', 'top', 'bottom', 'fov'].map(function (key) {
        if (o[key] !== undefined) {
          this.camera[key] = o[key];
        }
      }.bind(this));
    }
    else {
      switch (o.type) {
        case 'perspective':
          this.camera = new THREE.PerspectiveCamera(o.fov, 1, o.near, o.far);
          break;

        case 'orthographic':
          this.camera = new THREE.OrthographicCamera(o.left, o.right, o.top, o.bottom, o.near, o.far);
          break;
      }
    }

    this.cameraType = o.type;

    this.three.camera = this.camera;

    this.update();
  },

  update: function () {
    var o = this.options;
    if (o.aspect == 'auto') o.aspect = 0;

    this.camera.aspect = o.aspect || this.aspect;
    this.camera.updateProjectionMatrix();

    this.three.dispatchEvent({
      type: 'camera',
      camera: this.camera,
    });
  },

  resize: function (event) {
    this.aspect = event.viewWidth / Math.max(1, event.viewHeight) || 1;
    this.update();
  },

});
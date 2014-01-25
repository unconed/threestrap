THREE.Bootstrap.registerPlugin('controls', {

  listen: ['update', 'resize', 'camera', 'this.change'],

  defaults: {
    klass: null,
    parameters: {},
  },

  install: function (three) {
    if (!this.options.klass) throw "Must provide class for `controls.klass`";

    three.controls = null;

    this._camera = three.camera || new THREE.PerspectiveCamera();
    this.change({}, three);
  },

  uninstall: function (three) {
    delete three.controls;
  },

  change: function (event, three) {
    if (this.options.klass) {
      if (this.klass !== this.options.klass) {
        three.controls = new this.options.klass(this._camera, three.renderer.domElement);
        this.klass = this.options.klass;
      }

      _.extend(three.controls, this.options.parameters);
    }
    else {
      three.controls = null;
    }
  },

  update: function (event, three) {
    var delta = three.Time && three.Time.delta || 1/60;
    three.controls.update(delta);
  },

  camera: function (event, three) {
    three.controls.object = this._camera = event.camera;
  },

  resize: function (event, three) {
    three.controls.handleResize && three.controls.handleResize();
  },

});
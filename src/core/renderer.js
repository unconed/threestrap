THREE.Bootstrap.registerPlugin('renderer', {

  defaults: {
    klass: THREE.WebGLRenderer,
    parameters: {
      depth: true,
      stencil: true,
      preserveDrawingBuffer: true,
      antialias: true,
    },
  },

  install: function (three) {
    // Instantiate Three renderer
    var renderer = three.renderer = new this.options.klass(this.options.parameters);
    three.canvas = renderer.domElement;

    // Add to DOM
    three.element.appendChild(renderer.domElement);
  },

  uninstall: function (three) {
    // Remove from DOM
    three.element.removeChild(three.renderer.domElement);
    three.renderer = null;

    delete three.renderer;
    delete three.canvas;
  },

});

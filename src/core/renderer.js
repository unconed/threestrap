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

  listen: ['resize'],

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

    delete three.renderer;
    delete three.canvas;
  },

  resize: function (event, three) {
    var renderer = three.renderer;
    var el = renderer.domElement;

    // Resize renderer to render size if it's a canvas
    if (el && el.tagName == 'CANVAS') {
      renderer.setSize(event.renderWidth, event.renderHeight, false);
    }
    // Or view size if it's just a DOM element or multi-renderer
    else {
      if (renderer.setRenderSize) {
        renderer.setRenderSize(event.renderWidth, event.renderHeight);
      }
      renderer.setSize(event.viewWidth, event.viewHeight, false);
    }
  },

});

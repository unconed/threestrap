THREE.Bootstrap.registerPlugin('render', {

  install: function (three, renderer, element) {

    this.handler = function () {
      if (three.scene && three.camera) {
        renderer.render(three.scene, three.camera);
      }
    };

    three.addEventListener('render', this.handler);
  },

  uninstall: function (three, renderer, element) {
    three.removeEventListener('render', this.handler);
  },

});
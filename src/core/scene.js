THREE.Bootstrap.registerPlugin('scene', {

  install: function (three, renderer, element) {

    this.scene = new THREE.Scene();

    three.scene = this.scene;
  },

  uninstall: function (three, renderer, element) {
    delete three.scene;
  }

});
THREE.Bootstrap.registerPlugin('render', {

  listen: ['render'],

  render: function (event, three) {
    if (three.scene && three.camera) {
      three.renderer.render(three.scene, three.camera);
    }
  },

});
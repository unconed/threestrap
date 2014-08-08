THREE.Bootstrap.registerPlugin('warmup', {

  defaults: {
    delay: 2,
  },

  listen: ['ready', 'post'],

  ready: function (event, three) {
    three.renderer.domElement.style.visibility = 'hidden'
    this.frame = 0;
    this.hidden = true;
  },

  post: function (event, three) {
    if (this.hidden && this.frame >= this.options.delay) {
      three.renderer.domElement.style.visibility = 'visible'
      this.hidden = false;
    }
    this.frame++;
  },

});
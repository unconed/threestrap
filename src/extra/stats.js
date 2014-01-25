THREE.Bootstrap.registerPlugin('stats', {

  listen: ['pre', 'post'],

  install: function (three) {

    var stats = this.stats = new THREE.Stats();
    var style = stats.domElement.style;

    style.position = 'absolute';
    style.top = style.left = 0;
    document.body.appendChild(stats.domElement);
  },

  uninstall: function (three) {
    document.body.removeChild(this.stats.domElement);
  },

  pre: function (event, three) {
    this.stats.begin();
  },

  post: function (event, three) {
    this.stats.end();
  },


});
THREE.Bootstrap.registerPlugin('stats', {

  install: function (three, renderer, element) {

    var stats = this.stats = new THREE.Stats();
    var style = stats.domElement.style;

    this.begin = stats.begin.bind(stats);
    this.end = stats.end.bind(stats);

    three.addEventListener('pre', this.begin);
    three.addEventListener('post', this.end);

    style.position = 'absolute';
    style.top = style.left = 0;
    document.body.appendChild(stats.domElement);
  },

  uninstall: function (three, renderer, element) {

    three.removeEventListener('pre', this.begin);
    three.removeEventListener('post', this.end);

    document.body.removeChild(this.stats.domElement);
  },

});
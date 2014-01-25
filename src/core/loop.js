THREE.Bootstrap.registerPlugin('loop', {

  defaults: {
    start: true,
  },

  listen: ['ready'],

  install: function (three) {

    this.three = three;
    this.running = false;

    three.Loop = this.api({
      start: this.start.bind(this),
      stop: this.stop.bind(this),
      running: false,
    });

  },

  uninstall: function (three) {
    this.stop();
  },

  ready: function (event, three) {
    if (this.options.start) this.start();
  },

  start: function () {
    if (this.running) return;

    this.three.Loop.running = this.running = true;

    var loop = function () {
      this.running && requestAnimationFrame(loop);

      ['pre', 'update', 'render', 'post'].map(function (type) {
        this.three.dispatchEvent({ type: type });
      }.bind(this));

    }.bind(this);

    requestAnimationFrame(loop);

    this.three.dispatchEvent({ type: 'start' });
  },

  stop: function () {
    if (!this.running) return;
    this.three.Loop.running = this.running = false;

    this.three.dispatchEvent({ type: 'stop' });
  },

});
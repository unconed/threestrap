THREE.Bootstrap.registerPlugin('loop', {

  defaults: {
    start: true,
  },

  listen: ['ready'],

  install: function (three) {

    this.running = false;

    three.Loop = this.api({
      start: this.start.bind(this),
      stop: this.stop.bind(this),
      running: false,
    }, three);

  },

  uninstall: function (three) {
    this.stop(three);
  },

  ready: function (event, three) {
    if (this.options.start) this.start(three);
  },

  start: function (three) {
    if (this.running) return;

    three.Loop.running = this.running = true;

    var loop = function () {
      this.running && requestAnimationFrame(loop);

      ['pre', 'update', 'render', 'post'].map(function (type) {
        three.trigger({ type: type });
      }.bind(this));

    }.bind(this);

    requestAnimationFrame(loop);

    three.trigger({ type: 'start' });
  },

  stop: function (three) {
    if (!this.running) return;
    three.Loop.running = this.running = false;

    three.trigger({ type: 'stop' });
  },

});
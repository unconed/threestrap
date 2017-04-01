THREE.Bootstrap.registerPlugin('loop', {

  defaults: {
    start: true,
  },

  listen: ['ready'],

  install: function (three) {

    this.running = false;
    this.lastRequestId = null;

    three.Loop = this.api({
      start: this.start.bind(this),
      stop: this.stop.bind(this),
      running: false,
      window: window,
    }, three);

    this.events =
      ['pre', 'update', 'render', 'post'].map(function (type) {
        return { type: type };
      });

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

    var trigger = three.trigger.bind(three);
    var loop = function () {
      if (!this.running) return;
      this.lastRequestId = three.Loop.window.requestAnimationFrame(loop);
      this.events.map(trigger);
    }.bind(this);

    this.lastRequestId = three.Loop.window.requestAnimationFrame(loop);

    three.trigger({ type: 'start' });
  },

  stop: function (three) {
    if (!this.running) return;
    three.Loop.running = this.running = false;

    three.Loop.window.cancelAnimationFrame(this.lastRequestId);
    this.lastRequestId = null;

    three.trigger({ type: 'stop' });
  },

});
THREE.Bootstrap.registerPlugin('loop', {

  defaults: {
    start: true,
    force: true,
    rate:  1,
  },

  listen: ['ready', 'window.resize:reset', 'dirty', 'post'],

  install: function (three) {

    this.running = false;
    this.pending = false;

    three.Loop = this.api({
      start: this.start.bind(this),
      stop: this.stop.bind(this),
      running: false,
    }, three);

    this.frame = 0;
  },

  uninstall: function (three) {
    this.stop(three);
  },

  ready: function (event, three) {
    if (this.options.start) this.start(three);
  },

  dirty: function (event, three)  {
    if (!this.running && this.options.force && !this.pending) {
      this.reset();
      requestAnimationFrame(three.frame);
      this.pending = true;
    }
  },

  post: function (event, three) {
    this.pending = false
  },

  reset: function () {
    this.frame = 0;
  },

  start: function (three) {
    if (this.running) return;

    three.Loop.running = this.running = true;

    var trigger = three.trigger.bind(three);
    var loop = function () {
      this.running && requestAnimationFrame(loop);

      var rate = this.options.rate;
      if (rate <= 1 || (this.frame % rate) == 0) {
        three.frame();
      }

      this.frame++;
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
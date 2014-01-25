THREE.Bootstrap.registerPlugin('loop', {

  defaults: {
    start: true,
  },

  install: function (three, renderer, element) {

    this.three = three;
    this.running = false;

    if (this.options.start) {
      three.onceEventListener('ready', this.start.bind(this));
    }

    three.Loop = this.api({
      start: this.start.bind(this),
      stop: this.stop.bind(this),
      running: false,
    });

  },

  uninstall: function (three, renderer, element) {
    this.stop();
  },

  start: function () {
    if (this.running) return;

    this.three.Loop.running = this.running = true;
    this.three.dispatchEvent({ type: 'start' });

    var loop = function () {
      this.running && requestAnimationFrame(loop);

      ['pre', 'update', 'render', 'post'].map(function (type) {
        this.three.dispatchEvent({ type: type });
      }.bind(this));

    }.bind(this);

    requestAnimationFrame(loop);
  },

  stop: function () {
    if (!this.running) return;
    this.three.Loop.running = this.running = false;

    this.three.dispatchEvent({ type: 'stop' });
  },

});
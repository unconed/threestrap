THREE.Bootstrap.registerPlugin('time', {

  defaults: {
    speed: 1, // Clock speed
  },

  listen: ['pre:tick', 'this.change'],

  install: function (three) {

    three.Time = this.api({
      now: 0,       // Time since 1970 in seconds

      clock: 0,     // Clock that counts up from 0 seconds
      step:  1/60,  // Clock step in seconds

      frames: 0,    // Framenumber
      delta: 1/60,  // Frame step in seconds

      average: 0,   // Average frame time in seconds
      fps: 0,       // Average frames per second
    });

    this.last  = 0;
    this.clock = 0;
  },

  tick: function (event, three) {
    var speed = this.options.speed;

    var api = three.Time;
    var now = api.now = +new Date() / 1000;
    var last = this.last;
    var clock = this.clock;

    if (last) {
      var delta   = api.delta = now - last;
      var average = api.average || delta;

      api.average = average + (delta - average) * .1;
      api.fps = 1 / average;

      var step = delta * speed;
      clock += step;

      api.step  = step;
      api.clock = clock;

      api.frames++;
    }

    this.last   = now;
    this.clock  = clock;
  },

  uninstall: function (three) {
    delete three.Time;
  },

});
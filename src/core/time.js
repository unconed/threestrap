THREE.Bootstrap.registerPlugin('time', {

  defaults: {
    speed: 1, // Clock speed
  },

  listen: ['pre:tick', 'this.change'],

  install: function (three) {

    three.Time = this.api({
      now: 0,       // Time since 1970 in seconds

      clock: 0,     // Clock that counts up from 0 seconds
      delta: 1/60,  // Clock step in seconds

      frames: 0,    // Framenumber
      frame: 1/60,  // Frame step in seconds

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
      var frame   = api.frame = now - last;
      var average = api.average || frame;

      api.average = average + (frame - average) * .1;
      api.fps = 1 / average;

      var delta = frame * speed;
      clock += delta;

      api.delta = delta;
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
THREE.Bootstrap.registerPlugin('time', {

  defaults: {
    speed: 1,  // Clock speed
    warmup: 0, // Wait N frames before starting clock
    timeout: 1 // Timeout in seconds. Pause if no tick happens in this time.
  },

  listen: ['pre:tick', 'this.change'],

  now: function () {
    return +new Date() / 1000
  },

  install: function (three) {

    three.Time = this.api({
      now: this.now(), // Time since 1970 in seconds

      clock: 0,        // Adjustable clock that counts up from 0 seconds
      step:  1/60,     // Clock step in seconds

      frames: 0,       // Framenumber
      time: 0,         // Real time in seconds
      delta: 1/60,     // Frame step in seconds

      average: 0,      // Average frame time in seconds
      fps: 0,          // Average frames per second
    });

    this.last  = 0;
    this.time  = 0;
    this.clock = 0;
    this.wait  = this.options.warmup;

    this.clockStart = 0;
    this.timeStart  = 0;
  },

  tick: function (event, three) {
    var speed = this.options.speed;
    var timeout = this.options.timeout;

    var api = three.Time;
    var now = api.now = this.now();
    var last = this.last;
    var time = this.time;
    var clock = this.clock;

    if (last) {
      var delta   = api.delta = now - last;
      var average = api.average || delta;

      if (delta > timeout) {
        delta = 0;
      }

      var step = delta * speed;

      time  += delta;
      clock += step;

      if (api.frames > 0) {
        api.average = average + (delta - average) * .1;
        api.fps = 1 / average;
      }

      api.step  = step;
      api.clock = clock - this.clockStart;
      api.time  = time  - this.timeStart;

      api.frames++;

      if (this.wait-- > 0) {
        this.clockStart = clock;
        this.timeStart  = time;
        api.clock = 0;
        api.step  = 1e-100;
      }
    }

    this.last   = now;
    this.clock  = clock;
    this.time   = time;
  },

  uninstall: function (three) {
    delete three.Time;
  },

});
THREE.Bootstrap.registerPlugin('time', {

  listen: ['pre:tick'],

  install: function (three) {

    three.Time = this.api({
      now: 0,
      delta: 1/60,
      average: 0,
      fps: 0,
    });

    this.last = 0;
  },

  tick: function (event, three) {
    var api = three.Time;
    var now = api.now = +new Date() / 1000;
    var last = this.last;

    if (last) {
      var delta = api.delta = now - last;
      var average = api.average || delta;

      api.average = average + (delta - average) * .1;
      api.fps = 1 / average;
    }

    this.last = now;
  },

  uninstall: function (three) {
    delete three.Time;
  },

});
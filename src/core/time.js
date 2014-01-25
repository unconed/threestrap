THREE.Bootstrap.registerPlugin('time', {

  install: function (three, renderer, element) {

    var api = three.Time = this.api({
      now: 0,
      delta: 1/60,
      average: 0,
      fps: 0,
    });

    var last = 0;
    this.tick = function () {
      var now = api.now = +new Date() / 1000;

      if (last) {
        var delta = api.delta = now - last;
        var average = api.average || delta;

        api.average = average + (delta - average) * .1;
        api.fps = 1 / average;
      }

      last = now;
    };
    three.addEventListener('pre', this.tick);
  },

  uninstall: function (three, renderer, element) {

    three.removeEventListener('pre', this.tick);

    delete three.Time;
  },

});
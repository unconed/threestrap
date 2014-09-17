THREE.Bootstrap.registerPlugin('fullscreen', {

  defaults: {
    key: 'f',
  },

  listen: ['ready', 'update'],

  install: function (three) {
    three.Fullscreen = this.api({
      active: false,
      toggle: this.toggle.bind(this),
    }, three);
  },

  uninstall: function (three) {
    delete three.Fullscreen
  },

  ready: function (event, three) {

    document.body.addEventListener('keypress', function (event) {
      if (this.options.key &&
          event.charCode == this.options.key.charCodeAt(0)) {
        this.toggle(three);
      }
    }.bind(this));

    var changeHandler = function () {
      var active = !!document.fullscreenElement       ||
                   !!document.mozFullScreenElement    ||
                   !!document.webkitFullscreenElement ||
                   !!document.msFullscreenElement;
      three.Fullscreen.active = this.active = active;
      three.trigger({
        type: 'fullscreen',
        active: active,
      });
    }.bind(this);
    document.addEventListener("fullscreenchange", changeHandler, false);
    document.addEventListener("webkitfullscreenchange", changeHandler, false);
    document.addEventListener("mozfullscreenchange", changeHandler, false);
  },

  toggle: function (three) {
    var canvas  = three.canvas;
    var options = (three.VR && three.VR.active) ? { vrDisplay: three.VR.hmd } : {};

    if (!this.active) {

      if (canvas.requestFullScreen) {
        canvas.requestFullScreen(options);
      }
      else if (canvas.msRequestFullScreen) {
        canvas.msRequestFullscreen(options);
      }
      else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen(options);
      }
      else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen(options); // s vs S
      }

    }
    else {

      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // s vs S
      }

    }
  },

});



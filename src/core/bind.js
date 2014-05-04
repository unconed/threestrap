THREE.Bootstrap.registerPlugin('bind', {

  install: function (three) {
    this.three = three;
    this.ready = false;

    var globals = {
      'three': three,
      'window': window,
    };

    three.bind = THREE.Binder.bind(three, globals);
    three.unbind = THREE.Binder.unbind(three);

    three.bind('install:bind', this);
    three.bind('uninstall:unbind', this);
    three.bind('ready', this);
  },

  uninstall: function (three) {
    three.unbind(this);

    delete three.bind;
    delete three.unbind;
  },

  ready: function (event, three) {
    this.ready = true;
  },

  bind: function (event, three) {
    var plugin = event.plugin;
    var listen = plugin.listen;

    var ready = { type: ready };

    listen && listen.forEach(function (key) {
      var handler = three.bind(key, plugin);

      if (this.ready && key.match(/^ready(:|$)/)) {
        handler(ready, three);
      }
    });

  },

  unbind: function (event, three) {
    three.unbind(event.plugin);
  },

});

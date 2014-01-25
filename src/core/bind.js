THREE.Bootstrap.registerPlugin('bind', {

  install: function (three) {
    this.three = three;

    var globals = {
      'three': three,
      'window': window,
    };

    three.bind = THREE.Binder.bind(three, globals);
    three.unbind = THREE.Binder.unbind(three);

    three.bind('install:bind', this);
    three.bind('uninstall:unbind', this);
  },

  uninstall: function (three) {
    three.unbind(this);
  },

  bind: function (event, three) {
    var plugin = event.plugin;
    var listen = plugin.listen;
    listen && listen.forEach(function (key) {
      three.bind(key, plugin);
    });
  },

  unbind: function (event, three) {
    three.unbind(event.plugin);
  },

});

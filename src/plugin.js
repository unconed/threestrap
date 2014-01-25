THREE.Bootstrap.Plugins = {};
THREE.Bootstrap.Aliases = {};

THREE.Bootstrap.Plugin = function (options) {
  this.options = _.defaults(options || {}, this.defaults);
}

THREE.Bootstrap.Plugin.prototype = {

  defaults: {
  },

  install: function (three, renderer, element) {
  },

  uninstall: function (three, renderer, element) {
  },

  set: function (options) {
    _.extend(this.options, options);
    this.dispatchEvent({ type: 'change', changes: options });
  },

  get: function () {
    return this.options;
  },

  api: function (object) {
    object = object || {};
    object.set = this.set.bind(this);
    object.get = this.get.bind(this);
    return object;
  },
};

THREE.EventDispatcher.prototype.apply(THREE.Bootstrap.Plugin.prototype);

THREE.Bootstrap.registerPlugin = function (name, spec) {
  var ctor = function (options) {
    THREE.Bootstrap.Plugin.call(this, options);
  };
  ctor.prototype = _.extend(new THREE.Bootstrap.Plugin(), spec);

  THREE.Bootstrap.Plugins[name] = ctor;
}

THREE.Bootstrap.unregisterPlugin = function (name) {
  delete THREE.Bootstrap.Plugins[name];
}

THREE.Bootstrap.registerAlias = function (name, plugins) {
  THREE.Bootstrap.Aliases[name] = plugins;
}

THREE.Bootstrap.unregisterAlias = function (name) {
  delete THREE.Bootstrap.Aliases[name];
}

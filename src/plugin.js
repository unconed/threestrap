THREE.Bootstrap.Plugins = {};
THREE.Bootstrap.Aliases = {};

THREE.Bootstrap.Plugin = function (options) {
  this.options = _.defaults(options || {}, this.defaults);

  this.__binds = [];
}

THREE.Bootstrap.Plugin.prototype = {

  listen: [],

  defaults: {},

  install: function (three) {

  },

  uninstall: function (three) {
  },

  ////////

  set: function (options) {
    var o = this.options;

    var changes = _.reduce(options, function (result, value, key) {
      if (o[key] !== value) result[key] = value;
      return result;
    }, {});

    _.extend(o, changes);

    this.dispatchEvent({ type: 'change', changes: changes });
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

  /////

  bind: function (three) {

    this.listen.forEach(function (key) {
      three.bind(key, this);
    }.bind(this));

  },

};

THREE.EventDispatcherBootstrap.prototype.apply(THREE.Bootstrap.Plugin.prototype);

THREE.Bootstrap.registerPlugin = function (name, spec) {
  var ctor = function (options) {
    THREE.Bootstrap.Plugin.call(this, options);
    this.__name = name;
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

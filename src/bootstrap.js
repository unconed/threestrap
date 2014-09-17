THREE.Bootstrap = function (options) {
  if (options) {
    var args = [].slice.apply(arguments);
    options = {};

    // (element, ...)
    if (args[0] instanceof Node) {
      node = args[0];
      args = args.slice(1);

      options.element = node;
    }

    // (..., plugin, plugin, plugin)
    if (_.isString(args[0])) {
      options.plugins = args;
    }

    // (..., [plugin, plugin, plugin])
    if (_.isArray(args[0])) {
      options.plugins = args[0];
    }

    // (..., options)
    if (args[0]) {
      options = _.defaults(options, args[0]);
    }
  }

  // 'new' is optional
  if (!(this instanceof THREE.Bootstrap)) return new THREE.Bootstrap(options);

  // Apply defaults
  var defaults = {
    init: true,
    element: document.body,
    plugins: ['core'],
    aliases: {},
    plugindb: THREE.Bootstrap.Plugins || {},
    aliasdb: THREE.Bootstrap.Aliases || {},
  };
  this.__options = _.defaults(options || {}, defaults);

  // Hidden state
  this.__inited = false;
  this.__destroyed = false;
  this.__installed = [];

  // Query element
  var element = this.__options.element;
  if (element === '' + element) {
    element = document.querySelector(element);
  }

  // Global context
  this.plugins = {};
  this.element = element;

  // Auto-init
  if (this.__options.init) {
    this.init();
  }
};

THREE.Bootstrap.prototype = {

  init: function () {
    if (this.__inited) return;
    this.__inited = true;

    // Install plugins
    this.install(this.__options.plugins);

    return this;
  },

  destroy: function () {
    if (!this.__inited) return;
    if (this.__destroyed) return;
    this.__destroyed = true;

    // Notify of imminent destruction
    this.trigger({ type: 'destroy' });

    // Then uninstall plugins
    this.uninstall();

    return this;
  },

  resolve: function (plugins) {
    plugins = _.isArray(plugins) ? plugins : [plugins];

    // Resolve alias database
    var o = this.__options;
    var aliases = _.extend({}, o.aliasdb, o.aliases);

    // Remove inline alias defs from plugins
    var filter = function (name) {
      var key = name.split(':');
      if (!key[1]) return true;
      aliases[key[0]] = [key[1]];
      return false;
    };
    plugins = _.filter(plugins, filter);

    // Unify arrays
    _.each(aliases, function (alias, key) {
      aliases[key] = _.isArray(alias) ? alias : [alias];
    });

    // Look up aliases recursively
    function recurse(list, out, level) {
      if (level >= 256) throw "Plug-in alias recursion detected.";
      list = _.filter(list, filter);
      _.each(list, function (name) {
        var alias = aliases[name];
        if (!alias) {
          out.push(name);
        }
        else {
          out = out.concat(recurse(alias, [], level + 1));
        }
      });
      return out;
    }

    return recurse(plugins, [], 0);
  },

  install: function (plugins) {
    plugins = _.isArray(plugins) ? plugins : [plugins];

    // Resolve aliases
    plugins = this.resolve(plugins);

    // Install in order
    _.each(plugins, this.__install, this);

    // Fire off ready event
    this.__ready();
  },

  uninstall: function (plugins) {
    if (plugins) {
      plugins = _.isArray(plugins) ? plugins : [plugins];

      // Resolve aliases
      plugins = this.resolve(plugins);
    }

    // Uninstall in reverse order
    _.eachRight(plugins || this.__installed, this.__uninstall, this);
  },

  __install: function (name) {
    // Sanity check
    var ctor = this.__options.plugindb[name];
    if (!ctor) throw "[three.install] Cannot install. '" + name + "' is not registered.";
    if (this.plugins[name]) return console.warn("[three.install] "+ name + " is already installed.");

    // Construct
    var Plugin = ctor;
    var plugin = new Plugin(this.__options[name] || {}, name);
    this.plugins[name] = plugin;

    // Install
    flag = plugin.install(this);
    this.__installed.push(plugin);

    // Then notify
    this.trigger({ type: 'install', plugin: plugin });

    // Allow early abort
    return flag;
  },

  __uninstall: function (name, alias) {
    // Sanity check
    plugin = _.isString(name) ? this.plugins[name] : name;
    if (!plugin) return console.warn("[three.uninstall] " + name + "' is not installed.");
    name = plugin.__name;

    // Uninstall
    plugin.uninstall(this);
    this.__installed = _.without(this.__installed, plugin);
    delete this.plugins[name];

    // Then notify
    this.trigger({ type: 'uninstall', plugin: plugin });
  },

  __ready: function () {
    // Notify and remove event handlers
    this.triggerOnce({ type: 'ready' });
  },

};

THREE.Binder.apply(THREE.Bootstrap.prototype);


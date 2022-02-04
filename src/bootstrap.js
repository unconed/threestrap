import * as THREE from "three";

import "./api";
import "./binder";

function isString(str) {
  return str && typeof str.valueOf() === "string";
}

// eslint-disable-next-line no-import-assign
THREE.Bootstrap = function (options) {
  if (options) {
    let args = [].slice.apply(arguments);
    options = {};

    // (element, ...)
    if (args[0] instanceof Node) {
      const node = args[0];
      args = args.slice(1);
      options.element = node;
    }

    // (..., plugin, plugin, plugin)
    if (isString(args[0])) {
      options.plugins = args;
    } else if (Array.isArray(args[0])) {
      // (..., [plugin, plugin, plugin])
      options.plugins = args[0];
    } else if (args[0]) {
      // (..., options)

      // else, merge any arguments on the right that have NOT been set into the
      // options dict on the left.
      options = Object.assign({}, args[0], options);
    }
  }

  // 'new' is optional
  if (!(this instanceof THREE.Bootstrap)) return new THREE.Bootstrap(options);

  // Apply defaults
  const defaultOpts = {
    init: true,
    element: document.body,
    plugins: ["core"],
    aliases: {},
    plugindb: THREE.Bootstrap.Plugins || {},
    aliasdb: THREE.Bootstrap.Aliases || {},
  };

  this.__options = Object.assign({}, defaultOpts, options || {});

  // Hidden state
  this.__inited = false;
  this.__destroyed = false;
  this.__installed = [];

  // Query element
  var element = this.__options.element;
  if (element === "" + element) {
    element = document.querySelector(element);
  }

  // Global context
  this.plugins = {};
  this.element = element;

  // Update cycle
  this.trigger = this.trigger.bind(this);
  this.frame = this.frame.bind(this);
  this.events = ["pre", "update", "render", "post"].map(function (type) {
    return { type: type };
  });

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
  },

  destroy: function () {
    if (!this.__inited) return;
    if (this.__destroyed) return;
    this.__destroyed = true;

    // Notify of imminent destruction
    this.trigger({ type: "destroy" });

    // Then uninstall plugins
    this.uninstall();
  },

  frame: function () {
    this.events.map(this.trigger);
  },

  resolve: function (plugins) {
    plugins = Array.isArray(plugins) ? plugins : [plugins];

    // Resolve alias database
    var o = this.__options;
    var aliases = Object.assign({}, o.aliasdb, o.aliases);

    // Remove inline alias defs from plugins
    var pred = function (name) {
      var key = name.split(":");
      if (!key[1]) return true;
      aliases[key[0]] = [key[1]];
      return false;
    };
    plugins = plugins.filter(pred);

    // Unify arrays
    Object.entries(aliases).forEach(function ([key, alias]) {
      aliases[key] = Array.isArray(alias) ? alias : [alias];
    });

    // Look up aliases recursively
    function recurse(list, out, level) {
      if (level >= 256) throw "Plug-in alias recursion detected.";
      list = list.filter(pred);
      list.forEach(function (name) {
        var alias = aliases[name];
        if (!alias) {
          out.push(name);
        } else {
          out = out.concat(recurse(alias, [], level + 1));
        }
      });
      return out;
    }

    return recurse(plugins, [], 0);
  },

  install: function (plugins) {
    plugins = Array.isArray(plugins) ? plugins : [plugins];

    // Resolve aliases
    plugins = this.resolve(plugins);

    // Install in order
    plugins.forEach((name) => this.__install(name));

    // Fire off ready event
    this.__ready();
  },

  uninstall: function (plugins) {
    if (plugins) {
      plugins = Array.isArray(plugins) ? plugins : [plugins];

      // Resolve aliases
      plugins = this.resolve(plugins);
    }

    // Uninstall in reverse order
    (plugins || this.__installed)
      .reverse()
      .forEach((p) => this.__uninstall(p.__name));
  },

  __install: function (name) {
    // Sanity check
    var ctor = this.__options.plugindb[name];
    if (!ctor)
      throw "[three.install] Cannot install. '" + name + "' is not registered.";

    if (this.plugins[name])
      return console.warn("[three.install] " + name + " is already installed.");

    // Construct
    var Plugin = ctor;
    var plugin = new Plugin(this.__options[name] || {}, name);
    this.plugins[name] = plugin;

    // Install
    const flag = plugin.install(this);
    this.__installed.push(plugin);

    // Then notify
    this.trigger({ type: "install", plugin: plugin });

    // Allow early abort
    return flag;
  },

  __uninstall: function (name) {
    // Sanity check
    const plugin = isString(name) ? this.plugins[name] : name;
    if (!plugin)
      return console.warn("[three.uninstall] " + name + "' is not installed.");
    name = plugin.__name;

    // Uninstall
    plugin.uninstall(this);
    this.__installed = this.__installed.filter((p) => p !== plugin);
    delete this.plugins[name];

    // Then notify
    this.trigger({ type: "uninstall", plugin: plugin });
  },

  __ready: function () {
    // Notify and remove event handlers
    this.triggerOnce({ type: "ready" });
  },
  addEventListener: THREE.EventDispatcher.prototype.addEventListener,
  hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
  removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
};

THREE.Binder.apply(THREE.Bootstrap.prototype);

// Former contents of plugin.js.

THREE.Bootstrap.Plugins = {};
THREE.Bootstrap.Aliases = {};

THREE.Bootstrap.Plugin = function (options) {
  this.options = Object.assign({}, this.defaults, options || {});
  this.addEventListener = THREE.EventDispatcher.prototype.addEventListener;
  this.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener;
  this.removeEventListener =
    THREE.EventDispatcher.prototype.removeEventListener;
};

THREE.Bootstrap.Plugin.prototype = {
  listen: [],
  defaults: {},
  install: function (_three) {},
  uninstall: function (_three) {},
};

THREE.Binder.apply(THREE.Bootstrap.Plugin.prototype);
THREE.Api.apply(THREE.Bootstrap.Plugin.prototype);

THREE.Bootstrap.registerPlugin = function (name, spec) {
  var ctor = function (options) {
    THREE.Bootstrap.Plugin.call(this, options);
    this.__name = name;
  };
  ctor.prototype = Object.assign(new THREE.Bootstrap.Plugin(), spec);
  console.log(name, ctor.prototype);

  THREE.Bootstrap.Plugins[name] = ctor;
};

THREE.Bootstrap.unregisterPlugin = function (name) {
  delete THREE.Bootstrap.Plugins[name];
};

THREE.Bootstrap.registerAlias = function (name, plugins) {
  THREE.Bootstrap.Aliases[name] = plugins;
};

THREE.Bootstrap.unregisterAlias = function (name) {
  delete THREE.Bootstrap.Aliases[name];
};

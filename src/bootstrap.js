import { Api } from "./api";
import { Binder } from "./binder";

function isString(str) {
  return str && typeof str.valueOf() === "string";
}

/**
 * Like Array.prototype.forEach, but allows the callback to return false to
 * abort the loop
 */
const each = (array, cb) => {
  let i = 0;
  for (const item of array) {
    const success = cb(item, i, array);
    if (success === false) break;
    i++
  }
}

export class Bootstrap {
  static initClass() {
    this.Plugins = {};
    this.Aliases = {};
  }

  static registerPlugin(name, spec) {
    const ctor = function (options) {
      Bootstrap.Plugin.call(this, options);
      this.__name = name;
    };
    ctor.prototype = Object.assign(new Bootstrap.Plugin(), spec);

    this.Plugins[name] = ctor;
  }

  static unregisterPlugin(name) {
    delete this.Plugins[name];
  }

  static registerAlias(name, plugins) {
    this.Aliases[name] = plugins;
  }

  static unregisterAlias(name) {
    delete this.Aliases[name];
  }

  constructor(options) {
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

    // Apply defaults
    const defaultOpts = {
      init: true,
      element: document.body,
      plugins: ["core"],
      aliases: {},
      plugindb: Bootstrap.Plugins || {},
      aliasdb: Bootstrap.Aliases || {},
    };

    this.__options = Object.assign({}, defaultOpts, options || {});

    // Hidden state
    this.__inited = false;
    this.__destroyed = false;
    this.__installed = [];

    // Query element
    let element = this.__options.element;
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
  }

  init() {
    if (this.__inited) return;
    this.__inited = true;

    // Install plugins
    this.install(this.__options.plugins);
  }

  destroy() {
    if (!this.__inited) return;
    if (this.__destroyed) return;
    this.__destroyed = true;

    // Notify of imminent destruction
    this.trigger({ type: "destroy" });

    // Then uninstall plugins
    this.uninstall();
  }

  frame() {
    this.events.map(this.trigger);
  }

  resolve(plugins) {
    plugins = Array.isArray(plugins) ? plugins : [plugins];

    // Resolve alias database
    const o = this.__options;
    const aliases = Object.assign({}, o.aliasdb, o.aliases);

    // Remove inline alias defs from plugins
    const pred = function (name) {
      const key = name.split(":");
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
        const alias = aliases[name];
        if (!alias) {
          out.push(name);
        } else {
          out = out.concat(recurse(alias, [], level + 1));
        }
      });
      return out;
    }

    return recurse(plugins, [], 0);
  }

  install(plugins) {
    plugins = Array.isArray(plugins) ? plugins : [plugins];

    // Resolve aliases
    plugins = this.resolve(plugins);

    // Install in order
    each(plugins, (name) => this.__install(name))

    // Fire off ready event
    this.__ready();
  }

  uninstall(plugins) {
    if (plugins) {
      plugins = Array.isArray(plugins) ? plugins : [plugins];

      // Resolve aliases
      plugins = this.resolve(plugins);
    }

    // Uninstall in reverse order
    (plugins || this.__installed)
      .reverse()
      .forEach((p) => this.__uninstall(p));
  }

  __install(name) {
    // Sanity check
    const ctor = this.__options.plugindb[name];
    if (!ctor)
      throw "[three.install] Cannot install. '" + name + "' is not registered.";

    if (this.plugins[name])
      return console.warn("[three.install] " + name + " is already installed.");

    // Construct
    const Plugin = ctor;
    const plugin = new Plugin(this.__options[name] || {}, name);
    this.plugins[name] = plugin;

    // Install
    const flag = plugin.install(this);
    this.__installed.push(plugin);

    // Then notify
    this.trigger({ type: "install", plugin: plugin });

    // Allow early abort
    return flag;
  }

  __uninstall(name) {
    // Sanity check
    const plugin = isString(name) ? this.plugins[name] : name;
    if (!plugin) {
      console.warn("[three.uninstall] " + name + "' is not installed.");
      return;
    }

    name = plugin.__name;

    // Uninstall
    plugin.uninstall(this);
    this.__installed = this.__installed.filter((p) => p !== plugin);
    delete this.plugins[name];

    // Then notify
    this.trigger({ type: "uninstall", plugin: plugin });
  }

  __ready() {
    // Notify and remove event handlers
    this.triggerOnce({ type: "ready" });
  }
}
Bootstrap.initClass();

// Plugin Creation

Bootstrap.Plugin = function (options) {
  this.options = Object.assign({}, this.defaults, options || {});
};

Bootstrap.Plugin.prototype = {
  listen: [],
  defaults: {},
  install: function (_three) {},
  uninstall: function (_three) {},
};

Binder.apply(Bootstrap.prototype);
Binder.apply(Bootstrap.Plugin.prototype);
Api.apply(Bootstrap.Plugin.prototype);

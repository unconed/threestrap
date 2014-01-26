THREE.Bootstrap = function (options) {
  if (!(this instanceof THREE.Bootstrap)) return new THREE.Bootstrap(options);

  var defaults = {
    init: true,
    element: document.body,
    plugins: ['core'],
    aliases: {},
    plugindb: THREE.Bootstrap.Plugins || {},
    aliasdb: THREE.Bootstrap.Aliases || {},
  };

  this.__options = _.defaults(options || {}, defaults);
  this.__options.parameters = _.defaults(this.__options.parameters, defaults.parameters);

  this.__inited = false;
  this.__destroyed = false;
  this.__installed = [];

  this.plugins = {};
  this.element = options.element;

  if (this.__options.init) {
    this.init();
  }
};

THREE.Bootstrap.prototype = {

  init: function () {
    if (this.__inited) return;
    this.__inited = true;

    var options = this.__options,
        plugindb = options.plugindb,
        aliasdb = options.aliasdb,
        element = options.element,
        plugins, aliases;

    // Resolve plugins
    aliases = _.extend({}, options.aliasdb, options.aliases);
    _.each(aliases, function (alias, key) {
      if (!_.isArray(alias)) aliases[key] = [alias];
    });
    plugins = resolve(options.plugins);

    function resolve(list) {
      var limit = 256, length = 1024, i = 0;
      while (list.length < length && i++ < limit) {
        var replaced = false;
        list = _.reduce(list, function (list, item) {
          var alias;
          if (alias = aliases[item]) {
            list = list.concat(alias);
            replaced = true;
          }
          else {
            list.push(item);
          }
          return list;
        }, []);
        if (!replaced) return list;
      }
      throw 'Plug-in alias recursion detected';
    }

    // Install plugins
    _.each(plugins, function (name) {
      var ctor = plugindb[name];
      if (ctor) {
        if (this.plugins[name]) return;

        var plugin = new ctor(options[name] || {}, name);
        this.plugins[name] = plugin;

        // Install
        plugin.install(this);
        this.__installed.push(plugin);

        // Notify
        this.trigger({ type: 'install', plugin: plugin });
      }
    }.bind(this));

    this.trigger({ type: 'ready' });

    return this;
  },

  destroy: function () {
    if (!this.__inited) return;
    if (this.__destroyed) return;
    this.__destroyed = true;

    var options = this.__options;

    // Notify of imminent destruction
    this.trigger({ type: 'destroy' });

    // Uninstall plugins
    _.eachRight(this.__installed, function (plugin) {
      // Uninstall
      plugin.uninstall(this);

      // Then notify
      this.trigger({ type: 'uninstall', plugin: plugin });

    }.bind(this));

    this.__installed = [];
    this.plugins = {};

    return this;
  },

};

THREE.Binder.apply(THREE.Bootstrap.prototype);


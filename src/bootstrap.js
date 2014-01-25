THREE.Bootstrap = function (options) {
  if (!(this instanceof THREE.Bootstrap)) return new THREE.Bootstrap(options);

  var defaults = {
    init: true,
    element: document.body,
    plugins: ['core'],
    aliases: {},
    klass: THREE.WebGLRenderer,
    parameters: {
      depth: true,
      stencil: true,
      preserveDrawingBuffer: true,
      antialias: true,
    },
    plugindb: THREE.Bootstrap.Plugins || {},
    aliasdb: THREE.Bootstrap.Aliases || {},
  };

  this.__options = _.defaults(options || {}, defaults);
  this.__options.parameters = _.defaults(this.__options.parameters, defaults.parameters);

  this.__inited = false;
  this.__destroyed = false;
  this.__binds = [];
  this.plugins = {};

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
        renderer, plugins, aliases;

    // Resolve plugins
    aliases = _.extend({}, options.aliasdb, options.aliases);
    _.each(aliases, function (alias, key) {
      if (!_.isArray(alias)) aliases[key] = [alias];
    });
    plugins = resolve(options.plugins);

    function resolve(list) {
      var limit = 1024;
      while (limit-- > 0) {
        var replaced = false;
        var out = [];
        _.each(list, function (item) {
          var alias;
          if (alias = aliases[item]) {
            out = out.concat(alias);
            replaced = true;
          }
          else out.push(item);
        });
        if (!replaced) return out;
        list = out;
      }
      throw 'Plug-in alias recursion detected';
    }

    // Instantiate Three renderer
    renderer = this.renderer = new options.klass(options.parameters);
    this.canvas = renderer.domElement;
    this.element = element;

    // Add to DOM
    element.appendChild(renderer.domElement);

    // Install plugins
    _.each(plugins, function (name) {
      var ctor = plugindb[name];
      if (ctor) {
        if (this.plugins[name]) return;

        var plugin = new ctor(options[name] || {}, name);
        this.plugins[name] = plugin;

        // Install
        _.extend(this, plugin.install(this) || {});

        // Bind events
        plugin.bind(this);
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

    // Uninstall plugins
    _.each(this.plugins, function (plugin, i) {
      plugin.uninstall(this);
    }.bind(this));
    this.plugins = {};

    // Unbind events
    this.unbind();

    // Remove from DOM
    this.element.removeChild(this.renderer.domElement);
    this.renderer = null;


    return this;
  },

  bind: function (key, object) {
    // Set base target
    var fallback = this;
    if (_.isArray(key)) {
      fallback = key[0];
      key = key[1];
    }

    // Match key
    var match = /^([^.:]*(?:\.[^.:]+)*)?(?:\:(.*))?$/.exec(key);
    var path = match[1].split(/\./g);

    var name = path.pop();
    var dest = match[2] || name;

    // Whitelisted objects
    var target = {
      '': fallback,
      'this': object,
      'three': this,
      'element': this.element,
      'canvas': this.canvas,
      'window': window,
    }[path.shift()] || fallback;

    // Look up keys
    while (target && (key = path.shift())) { target = target[key] };

    // Attach event handler at last level
    if (target && (target.on || target.addEventListener)) {
      var callback = function (event) {
        object[dest] && object[dest](event, this);
      }.bind(this);

      // Polyfill for both styles of event listener adders
      var added = false;
      [ 'addEventListener', 'on' ].map(function (key) {
        if (!added && target[key]) {
          added = true;
          target[key](name, callback);
        }
      });

      // Store bind for removal later
      var bind = { target: target, name: name, callback: callback };
      this.__binds.push(bind);
    }
    else {
      throw "Cannot bind '" + key + "' in " + this.__name;
    }
  },

  unbind: function () {
    this.__binds.forEach(function (bind) {

      // Polyfill for both styles of event listener removers
      var removed = false;
      [ 'removeEventListener', 'off' ].map(function (key) {
        if (!removed && bind.target[key]) {
          removed = true;
          bind.target[key](bind.name, bind.callback);
        }
      });
    });
    this.__binds = [];
  },
};

THREE.EventDispatcherBootstrap.prototype.apply(THREE.Bootstrap.prototype);


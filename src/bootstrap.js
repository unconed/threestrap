THREE.Bootstrap = function (options) {
  if (!(this instanceof THREE.Bootstrap)) return new THREE.Bootstrap(options);

  var defaults = {
    init: true,
    element: document.body,
    plugins: ['core'],
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
        element = options.element;

    // Resolve plugins
    function resolve(list) {
      var limit = 1024;
      while (limit-- > 0) {
        var replaced = false;
        var out = [];
        _.each(list, function (item) {
          if (aliasdb[item]) {
            out = out.concat(aliasdb[item]);
            replaced = true;
          }
          else out.push(item);
        });
        if (!replaced) return out;
        list = out;
      }
      throw 'Plug-in alias recursion detected';
    }
    var plugins = resolve(options.plugins);

    // Instantiate Three renderer
    var renderer = this.renderer = new options.klass(options.parameters);
    this.canvas = renderer.domElement;
    this.element = element;

    // Add to DOM
    element.appendChild(renderer.domElement);

    // Install plugins
    _.each(plugins, function (name) {
      var ctor = plugindb[name];
      if (ctor) {
        if (this.plugins[name]) throw "Duplicate plugin '" + name + "'";

        var plugin = new ctor(options[name] || {});
        this.plugins[name] = plugin;

        _.extend(this, plugin.install(this, renderer, element) || {});
      }
    }.bind(this));

    this.dispatchEvent({ type: 'ready'});

    return this;
  },

  destroy: function () {
    if (!this.__inited) return;
    if (this.__destroyed) return;
    this.__destroyed = true;

    var options = this.__options,
        renderer = this.renderer,
        element = options.element;

    // Uninstall plugins
    _.each(this.plugins, function (plugin, i) {
      plugin.uninstall(this, renderer, element);
    }.bind(this));

    this.plugins = {};

    // Remove from DOM
    element.removeChild(renderer.domElement);
    this.renderer = null;

    return this;
  },

};

THREE.EventDispatcher.prototype.apply(THREE.Bootstrap.prototype);

THREE.Bootstrap.prototype.onceEventListener = function (method, callback) {
  var once = function (e) {
    this.removeEventListener(method, once);
    callback(e);
  }.bind(this);
  this.addEventListener(method, once);
}

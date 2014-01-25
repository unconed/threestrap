THREE.Binder = {
  bind: function (context, globals) {
    return function (key, object) {

      // Prepare object
      if (!object.__binds) {
        object.__binds = [];
      }

      // Set base target
      var fallback = context;
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
      var selector = path.shift();
      var target = {
        'this': object,
      }[selector] || globals[selector] || context[selector] || fallback;

      // Look up keys
      while (target && (key = path.shift())) { target = target[key] };

      // Attach event handler at last level
      if (target && (target.on || target.addEventListener)) {
        var callback = function (event) {
          object[dest] && object[dest](event, context);
        };

        // Polyfill for both styles of event listener adders
        THREE.Binder._polyfill(target, [ 'addEventListener', 'on' ], function (method) {
          target[method](name, callback);
        });

        // Store bind for removal later
        var bind = { target: target, name: name, callback: callback };
        object.__binds.push(bind);
      }
      else {
        throw "Cannot bind '" + key + "' in " + this.__name;
      }
    };
  },

  unbind: function () {
    return function (object) {
      // Remove all binds belonging to object
      if (object.__binds) {

        object.__binds.forEach(function (bind) {

          // Polyfill for both styles of event listener removers
          THREE.Binder._polyfill(bind.target, [ 'removeEventListener', 'off' ], function (method) {
            bind.target[method](bind.name, bind.callback);
          });
        }.bind(this));

        object.__binds = [];
      }
    }
  },

	apply: function ( object ) {

		THREE.EventDispatcher.prototype.apply(object);

		object.trigger = THREE.Binder._trigger;

		object.on = object.addEventListener;
		object.off = object.removeEventListener;
		object.dispatchEvent = object.trigger;

	},

  ////

  _trigger: function (event) {

		if (this._listeners === undefined) return;

		var listenerArray = this._listeners[event.type];

		if (listenerArray !== undefined) {

      listenerArray = listenerArray.slice()
      var length = listenerArray.length;

			event.target = this;
			for (var i = 0; i < length; i++) {
			  // add original target as parameter for convenience
				listenerArray[i].call(this, event, this);
			}

		}

  },

  _polyfill: function (object, methods, callback) {
    methods.map(function (method) { return object.method });
    if (methods.length) callback(methods[0]);
  },

};

THREE.Api = {
  apply: function (object) {

    object.set = function (options) {
      var o = this.options || {};

      var changes = _.reduce(options, function (result, value, key) {
        if (o[key] !== value) result[key] = value;
        return result;
      }, {});

      this.options = _.extend(o, changes);

      this.trigger({ type: 'change', options: options, changes: changes });
    };

    object.get = function () {
      return this.options;
    };

    object.api = function (object, context) {
      object = object || {};

      context && _.each(object, function (callback, key, object) {
        if (_.isFunction(callback)) {
          object[key] = _.partialRight(callback, context, 'foo', 'bar');
        }
      })

      object.set = this.set.bind(this);
      object.get = this.get.bind(this);
      return object;
    };

  },
};
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


THREE.Bootstrap.Plugins = {};
THREE.Bootstrap.Aliases = {};

THREE.Bootstrap.Plugin = function (options) {
  this.options = _.defaults(options || {}, this.defaults);
}

THREE.Bootstrap.Plugin.prototype = {

  listen: [],

  defaults: {},

  install: function (three) {

  },

  uninstall: function (three) {
  },

  ////////

};

THREE.Binder.apply(THREE.Bootstrap.Plugin.prototype);
THREE.Api   .apply(THREE.Bootstrap.Plugin.prototype);

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

THREE.Bootstrap.registerAlias('empty', ['renderer', 'bind', 'size', 'fill', 'loop', 'time']);
THREE.Bootstrap.registerAlias('core', ['empty', 'scene', 'camera', 'render']);


THREE.Bootstrap.registerPlugin('renderer', {

  defaults: {
    klass: THREE.WebGLRenderer,
    parameters: {
      depth: true,
      stencil: true,
      preserveDrawingBuffer: true,
      antialias: true,
    },
  },

  install: function (three) {
    // Instantiate Three renderer
    var renderer = three.renderer = new this.options.klass(this.options.parameters);
    three.canvas = renderer.domElement;

    // Add to DOM
    three.element.appendChild(renderer.domElement);
  },

  uninstall: function (three) {
    // Remove from DOM
    three.element.removeChild(three.renderer.domElement);

    delete three.renderer;
    delete three.canvas;
  },

});

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

    delete three.bind;
    delete three.unbind;
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

THREE.Bootstrap.registerPlugin('size', {

  defaults: {
    width: null,
    height: null,
    aspect: null,
    scale: 1,
    capWidth: Infinity,
    capHeight: Infinity,
  },

  listen: [
    'window.resize',
    'element.resize',
    'this.change:resize',
    'ready:resize',
  ],

  install: function (three) {

    three.Size = this.api({
      renderWidth: 0,
      renderHeight: 0,
      viewWidth: 0,
      viewHeight: 0,
    });

  },

  uninstall: function (three) {
    delete three.Size;
  },

  resize: function (event, three) {
    var options = this.options;
    var element = three.element;
    var renderer = three.renderer;

    var w, h, ew, eh, rw, rh, aspect, cut, style,
        ml = 0 , mt = 0;

    // Measure element
    w = ew = (options.width === undefined || options.width == null)
      ? element.offsetWidth || element.innerWidth || 0
      : options.width;

    h = eh = (options.height === undefined || options.height == null)
      ? element.offsetHeight || element.innerHeight || 0
      : options.height;

    // Force aspect ratio
    aspect = w / h;
    if (options.aspect) {
      if (options.aspect > aspect) {
        h = Math.round(w / options.aspect);
        mt = Math.floor((eh - h) / 2);
      }
      else {
        w = Math.round(h * options.aspect);
        ml = Math.floor((ew - w) / 2);
      }
      aspect = options.aspect;
    }

    // Apply scale and resolution cap
    rw = Math.min(w * options.scale, options.capWidth);
    rh = Math.min(h * options.scale, options.capHeight);

    // Retain aspect ratio
    raspect = rw / rh;
    if (raspect > aspect) {
      rw = Math.round(rh * aspect);
    }
    else {
      rh = Math.round(rw / aspect);
    }

    // Resize WebGL
    renderer.setSize(rw, rh);

    // Resize Canvas
    style = renderer.domElement.style;
    style.width = w + "px";
    style.height = h + "px";
    style.marginLeft = ml + "px";
    style.marginTop = mt + "px";

    // Notify
    _.extend(three.Size, {
      renderWidth: rw,
      renderHeight: rh,
      viewWidth: w,
      viewHeight: h,
    });

    three.trigger({
      type: 'resize',
      renderWidth: rw,
      renderHeight: rh,
      viewWidth: w,
      viewHeight: h,
    });
  },

});
THREE.Bootstrap.registerPlugin('fill', {

  install: function (three) {

    function is(element) {
      var h = element.style.height;
      return h == 'auto' || h == '';
    }

    function set(element) {
      element.style.height = '100%';
      element.style.margin = 0;
      element.style.padding = 0;
      return element;
    }

    if (three.element == document.body) {
      // Fix body height if we're naked
      this.applied =
        [ three.element, document.documentElement ].filter(is).map(set);
    }

  },

  uninstall: function (three) {
    if (this.applied) {
      function set(element) {
        element.style.height = '';
        element.style.margin = '';
        element.style.padding = '';
        return element;
      }

      this.applied.map(set);
    }
  }

});

THREE.Bootstrap.registerPlugin('loop', {

  defaults: {
    start: true,
  },

  listen: ['ready'],

  install: function (three) {

    this.running = false;

    three.Loop = this.api({
      start: this.start.bind(this),
      stop: this.stop.bind(this),
      running: false,
    }, three);

  },

  uninstall: function (three) {
    this.stop(three);
  },

  ready: function (event, three) {
    if (this.options.start) this.start(three);
  },

  start: function (three) {
    if (this.running) return;

    three.Loop.running = this.running = true;

    var loop = function () {
      this.running && requestAnimationFrame(loop);

      ['pre', 'update', 'render', 'post'].map(function (type) {
        three.trigger({ type: type });
      }.bind(this));

    }.bind(this);

    requestAnimationFrame(loop);

    three.trigger({ type: 'start' });
  },

  stop: function (three) {
    if (!this.running) return;
    three.Loop.running = this.running = false;

    three.trigger({ type: 'stop' });
  },

});
THREE.Bootstrap.registerPlugin('time', {

  listen: ['pre:tick'],

  install: function (three) {

    three.Time = this.api({
      now: 0,
      delta: 1/60,
      average: 0,
      fps: 0,
    });

    this.last = 0;
  },

  tick: function (event, three) {
    var api = three.Time;
    var now = api.now = +new Date() / 1000;
    var last = this.last;

    if (last) {
      var delta = api.delta = now - last;
      var average = api.average || delta;

      api.average = average + (delta - average) * .1;
      api.fps = 1 / average;
    }

    this.last = now;
  },

  uninstall: function (three) {
    delete three.Time;
  },

});
THREE.Bootstrap.registerPlugin('scene', {

  install: function (three) {
    three.scene = new THREE.Scene();
  },

  uninstall: function (three) {
    delete three.scene;
  }

});
THREE.Bootstrap.registerPlugin('camera', {

  defaults: {
    near: .1,
    far: 10000,

    type: 'perspective',
    fov: 60,
    aspect: null,

    // type: 'orthographic',
    left: -1,
    right: 1,
    bottom: -1,
    top: 1,
  },

  listen: ['resize', 'this.change'],

  install: function (three) {

    three.Camera = this.api();
    three.camera = null;

    this.aspect = 1;
    this.change({}, three);
  },

  uninstall: function (three) {
    delete three.Camera;
    delete three.camera;
  },

  change: function (event, three) {
    var o = this.options;

    if (three.camera && !event.changes.type) {
      ['near', 'far', 'left', 'right', 'top', 'bottom', 'fov'].map(function (key) {
        if (o[key] !== undefined) {
          three.camera[key] = o[key];
        }
      }.bind(this));
    }
    else {
      switch (o.type) {
        case 'perspective':
          three.camera = new THREE.PerspectiveCamera(o.fov, this.aspect, o.near, o.far);
          break;

        case 'orthographic':
          three.camera = new THREE.OrthographicCamera(o.left, o.right, o.top, o.bottom, o.near, o.far);
          break;
      }
    }

    three.camera.updateProjectionMatrix();

    three.trigger({
      type: 'camera',
      camera: three.camera,
    });
  },

  resize: function (event, three) {
    this.aspect = this.options.aspect || event.viewWidth / Math.max(1, event.viewHeight) || 1;
    three.camera.aspect = this.aspect;
    three.camera.updateProjectionMatrix();
  },

});
THREE.Bootstrap.registerPlugin('render', {

  listen: ['render'],

  render: function (event, three) {
    if (three.scene && three.camera) {
      three.renderer.render(three.scene, three.camera);
    }
  },

});
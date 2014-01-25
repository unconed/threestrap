THREE.EventDispatcherBootstrap = function () {};

THREE.EventDispatcherBootstrap.prototype = {

  // * Fix for three.js EventDispatcher to allow nested dispatches to work
  // * Pass this as 2nd parameter to event handler
  // * Rename to .on/.off/.trigger

	apply: function ( object ) {

		THREE.EventDispatcher.prototype.apply(object);

		object.dispatchEvent = THREE.EventDispatcherBootstrap.prototype.dispatchEvent;
		object.on = THREE.EventDispatcher.prototype.addEventListener;
		object.off = THREE.EventDispatcher.prototype.removeEventListener;
		object.trigger = object.dispatchEvent;

	},

  dispatchEvent: function (event) {

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

};

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
        renderer, plugins;

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
    plugins = resolve(options.plugins);

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

THREE.Bootstrap.registerAlias('empty', ['size', 'fill', 'loop', 'time']);
THREE.Bootstrap.registerAlias('core', ['empty', 'scene', 'camera', 'render']);


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

    three.dispatchEvent({
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

    this.three = three;
    this.running = false;

    three.Loop = this.api({
      start: this.start.bind(this),
      stop: this.stop.bind(this),
      running: false,
    });

  },

  uninstall: function (three) {
    this.stop();
  },

  ready: function (event, three) {
    if (this.options.start) this.start();
  },

  start: function () {
    if (this.running) return;

    this.three.Loop.running = this.running = true;

    var loop = function () {
      this.running && requestAnimationFrame(loop);

      ['pre', 'update', 'render', 'post'].map(function (type) {
        this.three.dispatchEvent({ type: type });
      }.bind(this));

    }.bind(this);

    requestAnimationFrame(loop);

    this.three.dispatchEvent({ type: 'start' });
  },

  stop: function () {
    if (!this.running) return;
    this.three.Loop.running = this.running = false;

    this.three.dispatchEvent({ type: 'stop' });
  },

});
THREE.Bootstrap.registerPlugin('time', {

  listen: ['pre:tick', 'post:tick'],

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

  uninstall: function (three, renderer, element) {
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
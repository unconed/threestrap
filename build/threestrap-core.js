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

        // Return callback
        return callback;
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

    object.trigger     = THREE.Binder._trigger;
    object.triggerOnce = THREE.Binder._triggerOnce;

    object.on = object.addEventListener;
    object.off = object.removeEventListener;
    object.dispatchEvent = object.trigger;

  },

  ////

  _triggerOnce: function (event) {
    this.trigger(event);
    if (this._listeners) {
      delete this._listeners[event.type]
    }
  },

  _trigger: function (event) {

    if (this._listeners === undefined) return;

    var type = event.type;
    var listeners = this._listeners[type];
    if (listeners !== undefined) {

      listeners = listeners.slice()
      var length = listeners.length;

      event.target = this;
      for (var i = 0; i < length; i++) {
        // add original target as parameter for convenience
        listeners[i].call(this, event, this);
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

      // Diff out changes
      var changes = _.reduce(options, function (result, value, key) {
        if (o[key] !== value) result[key] = value;
        return result;
      }, {});

      this.options = _.extend(o, changes);

      // Notify
      this.trigger({ type: 'change', options: options, changes: changes });
    };

    object.get = function () {
      return this.options;
    };

    object.api = function (object, context) {
      object = object || {};

      // Append context argument to API methods
      context && _.each(object, function (callback, key, object) {
        if (_.isFunction(callback)) {
          object[key] = _.partialRight(callback, context);
        }
      })

      object.set = this.set.bind(this);
      object.get = this.get.bind(this);

      return object;
    };

  },
};
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

THREE.Bootstrap.registerAlias('empty', ['fallback', 'bind', 'renderer', 'size', 'fill', 'loop', 'time']);
THREE.Bootstrap.registerAlias('core', ['empty', 'scene', 'camera', 'render', 'warmup']);
THREE.Bootstrap.registerAlias('VR', ['core', 'cursor', 'fullscreen', 'render:vr']);
THREE.Bootstrap.registerPlugin('fallback', {

  defaults: {
    force:   false,
    fill:    true,
    begin:   '<div class="threestrap-fallback" style="display: table; width: 100%; height: 100%;'+
             'box-sizing: border-box; border: 1px dashed rgba(0, 0, 0, .25);">'+
             '<div style="display: table-cell; padding: 10px; vertical-align: middle; text-align: center;">',
    end:     '</div></div>',
    message: '<big><strong>This example requires WebGL</strong></big><br>'+
             'Visit <a target="_blank" href="http://get.webgl.org/">get.webgl.org</a> for more info</a>',
  },

  install: function (three) {
    var cnv;
    try {
      cnv = document.createElement('canvas');
      gl = cnv.getContext('webgl') || cnv.getContext('experimental-webgl');
      if (!gl || this.options.force) {
        throw "WebGL unavailable.";
      }
      three.fallback = false;
    }
    catch (e) {
      var message = this.options.message;
      var begin   = this.options.begin;
      var end     = this.options.end;
      var fill    = this.options.fill;

      var div = document.createElement('div');
      div.innerHTML = begin + message + end;

      this.children = []

      while (div.childNodes.length > 0) {
        this.children.push(div.firstChild);
        three.element.appendChild(div.firstChild);
      }

      if (fill) {
        three.install('fill');
      }

      this.div = div;
      three.fallback = true;
      return false; // Abort install
    }
  },

  uninstall: function (three) {
    if (this.children) {
      this.children.forEach(function (child) {
        child.parentNode.removeChild(child);
      });
      this.children = null
    }

    delete three.fallback;
  },

});
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

  listen: ['resize'],

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

  resize: function (event, three) {
    var renderer = three.renderer;
    var el = renderer.domElement;

    // Resize renderer to render size if it's a canvas
    if (el && el.tagName == 'CANVAS') {
      renderer.setSize(event.renderWidth, event.renderHeight, false);
    }
    // Or view size if it's just a DOM element or multi-renderer
    else {
      if (renderer.setRenderSize) {
        renderer.setRenderSize(event.renderWidth, event.renderHeight);
      }
      renderer.setSize(event.viewWidth, event.viewHeight, false);
    }
  },

});

THREE.Bootstrap.registerPlugin('bind', {

  install: function (three) {
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
    maxRenderWidth: Infinity,
    maxRenderHeight: Infinity,
    devicePixelRatio: true,
  },

  listen: [
    'window.resize:queue',
    'element.resize:queue',
    'this.change:queue',
    'ready:resize',
    'pre:pre',
  ],

  install: function (three) {

    three.Size = this.api({
      renderWidth: 0,
      renderHeight: 0,
      viewWidth: 0,
      viewHeight: 0,
    });

    this.resized = false;
  },

  uninstall: function (three) {
    delete three.Size;
  },

  queue: function (event, three) {
    this.resized = true;
  },

  pre: function (event, three) {
    if (!this.resized) return;
    this.resized = false;
    this.resize(event, three);
  },

  resize: function (event, three) {
    var options = this.options;
    var element = three.element;
    var renderer = three.renderer;

    var w, h, ew, eh, rw, rh, aspect, cut, style, ratio,
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
      aspect = w / h;
    }

    // Get device pixel ratio
    ratio = 1
    if (options.devicePixelRatio && typeof window != 'undefined') {
      ratio = window.devicePixelRatio || 1
    }

    // Apply scale and resolution max
    rw = Math.min(w * ratio * options.scale, options.maxRenderWidth);
    rh = Math.min(h * ratio * options.scale, options.maxRenderHeight);

    // Retain aspect ratio
    raspect = rw / rh;
    if (raspect > aspect) {
      rw = Math.round(rh * aspect);
    }
    else {
      rh = Math.round(rw / aspect);
    }

    // Measure final pixel ratio
    ratio = rh / h

    // Resize and position renderer element
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
      aspect: aspect,
      pixelRatio: ratio,
    });

    three.trigger({
      type: 'resize',
      renderWidth: rw,
      renderHeight: rh,
      viewWidth: w,
      viewHeight: h,
      aspect: aspect,
      pixelRatio: ratio,
    });
  },

});
THREE.Bootstrap.registerPlugin('fill', {

  defaults: {
    block: true,
    body: true,
    layout: true,
  },

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

    if (this.options.body && three.element == document.body) {
      // Fix body height if we're naked
      this.applied =
        [ three.element, document.documentElement ].filter(is).map(set);
    }

    if (this.options.block && three.canvas) {
      three.canvas.style.display = 'block'
      this.block = true;
    }

    if (this.options.layout && three.element) {
      var style = window.getComputedStyle(three.element);
      if (style.position == 'static') {
        three.element.style.position = 'relative';
        this.layout = true;
      }
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
      delete this.applied;
    }

    if (this.block && three.canvas) {
      three.canvas.style.display = '';
      delete this.block;
    }

    if (this.layout && three.element) {
      three.element.style.position = '';
      delete this.layout;
    }
  },

  change: function (three) {
    this.uninstall(three);
    this.install(three);
  },

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

    this.events =
      ['pre', 'update', 'render', 'post'].map(function (type) {
        return { type: type };
      });

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

    var trigger = three.trigger.bind(three);
    var loop = function () {
      this.running && requestAnimationFrame(loop);
      this.events.map(trigger);
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

  defaults: {
    speed: 1,  // Clock speed
    warmup: 0, // Wait N frames before starting clock
    timeout: 1 // Timeout in seconds. Pause if no tick happens in this time.
  },

  listen: ['pre:tick', 'this.change'],

  now: function () {
    return +new Date() / 1000
  },

  install: function (three) {

    three.Time = this.api({
      now: this.now(), // Time since 1970 in seconds

      clock: 0,        // Adjustable clock that counts up from 0 seconds
      step:  1/60,     // Clock step in seconds

      frames: 0,       // Framenumber
      time: 0,         // Real time in seconds
      delta: 1/60,     // Frame step in seconds

      average: 0,      // Average frame time in seconds
      fps: 0,          // Average frames per second
    });

    this.last  = 0;
    this.time  = 0;
    this.clock = 0;
    this.wait  = this.options.warmup;

    this.clockStart = 0;
    this.timeStart  = 0;
  },

  tick: function (event, three) {
    var speed = this.options.speed;
    var timeout = this.options.timeout;

    var api = three.Time;
    var now = api.now = this.now();
    var last = this.last;
    var time = this.time;
    var clock = this.clock;

    if (last) {
      var delta   = api.delta = now - last;
      var average = api.average || delta;

      if (delta > timeout) {
        delta = 0;
      }

      var step = delta * speed;

      time  += delta;
      clock += step;

      if (api.frames > 0) {
        api.average = average + (delta - average) * .1;
        api.fps = 1 / average;
      }

      api.step  = step;
      api.clock = clock - this.clockStart;
      api.time  = time  - this.timeStart;

      api.frames++;

      if (this.wait-- > 0) {
        this.clockStart = clock;
        this.timeStart  = time;
        api.clock = 0;
        api.step  = 1e-100;
      }
    }

    this.last   = now;
    this.clock  = clock;
    this.time   = time;
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
    near: .01,
    far: 10000,

    type: 'perspective',
    fov: 60,
    aspect: null,

    // type: 'orthographic',
    left: -1,
    right: 1,
    bottom: -1,
    top: 1,

    klass: null,
    parameters: null,
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
    var old = three.camera;

    if (!three.camera || event.changes.type || event.changes.klass) {
      var klass = o.klass ||
      {
        'perspective': THREE.PerspectiveCamera,
        'orthographic': THREE.OrthographicCamera,
      }[o.type] || THREE.Camera;

      three.camera = o.parameters ? new klass(o.parameters) : new klass();
    }

    _.each(o, function (value, key) {
      if (three.camera.hasOwnProperty(key)) three.camera[key] = o[key];
    }.bind(this));

    this.update(three);

    (old === three.camera) || three.trigger({
      type: 'camera',
      camera: three.camera,
    });
  },

  resize: function (event, three) {
    this.aspect = event.viewWidth / Math.max(1, event.viewHeight);

    this.update(three);
  },

  update: function (three) {
    three.camera.aspect = this.options.aspect || this.aspect;
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
THREE.Bootstrap.registerPlugin('warmup', {

  defaults: {
    delay: 2,
  },

  listen: ['ready', 'post'],

  ready: function (event, three) {
    three.renderer.domElement.style.visibility = 'hidden'
    this.frame = 0;
    this.hidden = true;
  },

  post: function (event, three) {
    if (this.hidden && this.frame >= this.options.delay) {
      three.renderer.domElement.style.visibility = 'visible'
      this.hidden = false;
    }
    this.frame++;
  },

});
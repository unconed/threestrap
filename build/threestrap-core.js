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

THREE.Bootstrap.Plugins = {};
THREE.Bootstrap.Aliases = {};

THREE.Bootstrap.Plugin = function (options) {
  this.options = _.defaults(options || {}, this.defaults);
}

THREE.Bootstrap.Plugin.prototype = {

  defaults: {
  },

  install: function (three, renderer, element) {
  },

  uninstall: function (three, renderer, element) {
  },

  set: function (options) {
    _.extend(this.options, options);
    this.dispatchEvent({ type: 'change', changes: options });
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
};

THREE.EventDispatcher.prototype.apply(THREE.Bootstrap.Plugin.prototype);

THREE.Bootstrap.registerPlugin = function (name, spec) {
  var ctor = function (options) {
    THREE.Bootstrap.Plugin.call(this, options);
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

  install: function (three, renderer, element) {

    // On resize handler
    this.handler = function () {
      var options = this.options;

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

    }.bind(this);

    window.addEventListener('resize', this.handler);
    element.addEventListener('resize', this.handler);
    three.addEventListener('ready', this.handler);

    three.Size = this.api({
      renderWidth: 0,
      renderHeight: 0,
      viewWidth: 0,
      viewHeight: 0,
    });

    this.addEventListener('change', this.handler);
  },

  uninstall: function (three, renderer, element) {
    window.removeEventListener('resize', this.handler);
    element.removeEventListener('resize', this.handler);
    three.removeEventListener('ready', this.handler);

    delete three.Size;
  },

});
THREE.Bootstrap.registerPlugin('fill', {

  install: function (three, renderer, element) {

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

    if (element == document.body) {
      // Fix body height if we're naked
      this.applied =
        [ element, document.documentElement ].filter(is).map(set);
    }

  },

  uninstall: function (three, renderer, element) {
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

  install: function (three, renderer, element) {

    this.three = three;
    this.running = false;

    if (this.options.start) {
      three.onceEventListener('ready', this.start.bind(this));
    }

    three.Loop = this.api({
      start: this.start.bind(this),
      stop: this.stop.bind(this),
      running: false,
    });

  },

  uninstall: function (three, renderer, element) {
    this.stop();
  },

  start: function () {
    if (this.running) return;

    this.three.Loop.running = this.running = true;
    this.three.dispatchEvent({ type: 'start' });

    var loop = function () {
      this.running && requestAnimationFrame(loop);

      ['pre', 'update', 'render', 'post'].map(function (type) {
        this.three.dispatchEvent({ type: type });
      }.bind(this));

    }.bind(this);

    requestAnimationFrame(loop);
  },

  stop: function () {
    if (!this.running) return;
    this.running = false;

    this.three.dispatchEvent({ type: 'stop' });
  },

});
THREE.Bootstrap.registerPlugin('time', {

  install: function (three, renderer, element) {

    var api = three.Time = this.api({
      now: 0,
      delta: 1/60,
      average: 0,
      fps: 0,
    });

    var last = 0;
    this.tick = function () {
      var now = api.now = +new Date() / 1000;

      if (last) {
        var delta = api.delta = now - last;
        var average = api.average || delta;

        api.average = average + (delta - average) * .1;
        api.fps = 1 / average;
      }

      last = now;
    };
    three.addEventListener('pre', this.tick);
  },

  uninstall: function (three, renderer, element) {

    three.removeEventListener('pre', this.tick);

    delete three.Time;
  },

});
THREE.Bootstrap.registerPlugin('scene', {

  install: function (three, renderer, element) {

    this.scene = new THREE.Scene();

    three.scene = this.scene;
  },

  uninstall: function (three, renderer, element) {
    delete three.scene;
  }

});
THREE.Bootstrap.registerPlugin('camera', {

  defaults: {
    near: .1,
    far: 10000,

    type: 'perspective',
    fov: 60,
    aspect: 'auto',

    // type: 'orthographic',
    left: -1,
    right: 1,
    bottom: -1,
    top: 1,
  },

  install: function (three, renderer, element) {

    this.three = three;

    this.handler = this.resize.bind(this);
    three.addEventListener('resize', this.handler);

    three.Camera = this.api();
    three.camera = null;

    this.aspect = 1;
    this.change();

    this.addEventListener('change', this.change.bind(this));
  },

  uninstall: function (three, renderer, element) {
    three.removeEventListener('resize', this.handler);

    delete three.Camera;
    delete three.camera;
  },

  change: function () {
    var o = this.options;

    if (this.camera && o.type == this.cameraType) {
      ['near', 'far', 'left', 'right', 'top', 'bottom', 'fov'].map(function (key) {
        if (o[key] !== undefined) {
          this.camera[key] = o[key];
        }
      }.bind(this));
    }
    else {
      switch (o.type) {
        case 'perspective':
          this.camera = new THREE.PerspectiveCamera(o.fov, 1, o.near, o.far);
          break;

        case 'orthographic':
          this.camera = new THREE.OrthographicCamera(o.left, o.right, o.top, o.bottom, o.near, o.far);
          break;
      }
    }

    this.cameraType = o.type;

    this.three.camera = this.camera;

    this.update();
  },

  update: function () {
    var o = this.options;
    if (o.aspect == 'auto') o.aspect = 0;

    this.camera.aspect = o.aspect || this.aspect;
    this.camera.updateProjectionMatrix();

    this.three.dispatchEvent({
      type: 'camera',
      camera: this.camera,
    });
  },

  resize: function (event) {
    this.aspect = event.viewWidth / Math.max(1, event.viewHeight) || 1;
    this.update();
  },

});
THREE.Bootstrap.registerPlugin('render', {

  install: function (three, renderer, element) {

    this.handler = function () {
      if (three.scene && three.camera) {
        renderer.render(three.scene, three.camera);
      }
    };

    three.addEventListener('render', this.handler);
  },

  uninstall: function (three, renderer, element) {
    three.removeEventListener('render', this.handler);
  },

});
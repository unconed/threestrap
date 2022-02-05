/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 466:
/***/ (function(module) {

// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){ true?module.exports=e():0})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: external "THREE"
const external_THREE_namespaceObject = THREE;
;// CONCATENATED MODULE: ./src/api.js


// eslint-disable-next-line no-import-assign
external_THREE_namespaceObject.Api = {
  apply: function (object) {
    object.set = function (options) {
      var o = this.options || {};

      // Diff out changes
      var changes = Object.entries(options).reduce(function (
        result,
        [key, value]
      ) {
        if (o[key] !== value) result[key] = value;
        return result;
      },
      {});

      this.options = Object.assign(o, changes);

      // Notify
      this.trigger({ type: "change", options: options, changes: changes });
    };

    object.get = function () {
      return this.options;
    };

    object.api = function (object, context) {
      object ||= {};

      // Append context argument to API methods
      context &&
        Object.entries(object).forEach(function ([key, callback]) {
          if (typeof callback === "function") {
            object[key] = (...args) => callback(...args, context);
          }
        });

      object.set = this.set.bind(this);
      object.get = this.get.bind(this);

      return object;
    };
  },
};

;// CONCATENATED MODULE: ./src/binder.js


class Binder {
  static bind(context, globals) {
    return function (key, object) {
      // Prepare object
      if (!object.__binds) {
        object.__binds = [];
      }

      // Set base target
      var fallback = context;

      if (Array.isArray(key)) {
        fallback = key[0];
        key = key[1];
      }

      // Match key
      var match = /^([^.:]*(?:\.[^.:]+)*)?(?::(.*))?$/.exec(key);
      var path = match[1].split(/\./g);

      var name = path.pop();
      var dest = match[2] || name;

      // Whitelisted objects
      var selector = path.shift();

      var target =
        {
          this: object,
        }[selector] ||
        globals[selector] ||
        context[selector] ||
        fallback;

      // Look up keys
      while (target && (key = path.shift())) {
        target = target[key];
      }

      // Attach event handler at last level
      if (target && (target.on || target.addEventListener)) {
        var callback = function (event) {
          object[dest] && object[dest](event, context);
        };

        // Polyfill for both styles of event listener adders
        Binder._polyfill(target, ["addEventListener", "on"], function (method) {
          target[method](name, callback);
        });

        // Store bind for removal later
        var bind = { target: target, name: name, callback: callback };
        object.__binds.push(bind);

        // Return callback
        return callback;
      } else {
        throw "Cannot bind '" + key + "' in " + this.__name;
      }
    };
  }

  static unbind() {
    return function (object) {
      // Remove all binds belonging to object
      if (object.__binds) {
        object.__binds.forEach(
          function (bind) {
            // Polyfill for both styles of event listener removers
            Binder._polyfill(
              bind.target,
              ["removeEventListener", "off"],
              function (method) {
                bind.target[method](bind.name, bind.callback);
              }
            );
          }.bind(this)
        );

        object.__binds = [];
      }
    };
  }

  static apply(object) {
    object.trigger = Binder._trigger;
    object.triggerOnce = Binder._triggerOnce;

    object.hasEventListener = external_THREE_namespaceObject.EventDispatcher.prototype.hasEventListener;
    object.addEventListener = external_THREE_namespaceObject.EventDispatcher.prototype.addEventListener;
    object.removeEventListener =
      external_THREE_namespaceObject.EventDispatcher.prototype.removeEventListener;

    object.on = object.addEventListener;
    object.off = object.removeEventListener;
    object.dispatchEvent = object.trigger;
  }

  static _triggerOnce(event) {
    this.trigger(event);
    if (this._listeners) {
      delete this._listeners[event.type];
    }
  }

  static _trigger(event) {
    if (this._listeners === undefined) return;

    var type = event.type;
    var listeners = this._listeners[type];
    if (listeners !== undefined) {
      listeners = listeners.slice();
      var length = listeners.length;

      event.target = this;
      for (var i = 0; i < length; i++) {
        // add original target as parameter for convenience
        listeners[i].call(this, event, this);
      }
    }
  }

  static _polyfill(object, methods, callback) {
    methods.map(function (_method) {
      return object.method;
    });
    if (methods.length) callback(methods[0]);
  }
}

;// CONCATENATED MODULE: ./src/bootstrap.js





function isString(str) {
  return str && typeof str.valueOf() === "string";
}

// eslint-disable-next-line no-import-assign
external_THREE_namespaceObject.Bootstrap = function (options) {
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
  if (!(this instanceof external_THREE_namespaceObject.Bootstrap)) return new external_THREE_namespaceObject.Bootstrap(options);

  // Apply defaults
  const defaultOpts = {
    init: true,
    element: document.body,
    plugins: ["core"],
    aliases: {},
    plugindb: external_THREE_namespaceObject.Bootstrap.Plugins || {},
    aliasdb: external_THREE_namespaceObject.Bootstrap.Aliases || {},
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

external_THREE_namespaceObject.Bootstrap.prototype = {
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
};

Binder.apply(external_THREE_namespaceObject.Bootstrap.prototype);

// Former contents of plugin.js.

external_THREE_namespaceObject.Bootstrap.Plugins = {};
external_THREE_namespaceObject.Bootstrap.Aliases = {};

external_THREE_namespaceObject.Bootstrap.Plugin = function (options) {
  this.options = Object.assign({}, this.defaults, options || {});
};

external_THREE_namespaceObject.Bootstrap.Plugin.prototype = {
  listen: [],
  defaults: {},
  install: function (_three) {},
  uninstall: function (_three) {},
};

Binder.apply(external_THREE_namespaceObject.Bootstrap.Plugin.prototype);
external_THREE_namespaceObject.Api.apply(external_THREE_namespaceObject.Bootstrap.Plugin.prototype);

external_THREE_namespaceObject.Bootstrap.registerPlugin = function (name, spec) {
  var ctor = function (options) {
    external_THREE_namespaceObject.Bootstrap.Plugin.call(this, options);
    this.__name = name;
  };
  ctor.prototype = Object.assign(new external_THREE_namespaceObject.Bootstrap.Plugin(), spec);

  external_THREE_namespaceObject.Bootstrap.Plugins[name] = ctor;
};

external_THREE_namespaceObject.Bootstrap.unregisterPlugin = function (name) {
  delete external_THREE_namespaceObject.Bootstrap.Plugins[name];
};

external_THREE_namespaceObject.Bootstrap.registerAlias = function (name, plugins) {
  external_THREE_namespaceObject.Bootstrap.Aliases[name] = plugins;
};

external_THREE_namespaceObject.Bootstrap.unregisterAlias = function (name) {
  delete external_THREE_namespaceObject.Bootstrap.Aliases[name];
};

;// CONCATENATED MODULE: ./src/aliases.js



external_THREE_namespaceObject.Bootstrap.registerAlias("empty", [
  "fallback",
  "bind",
  "renderer",
  "size",
  "fill",
  "loop",
  "time",
]);
external_THREE_namespaceObject.Bootstrap.registerAlias("core", [
  "empty",
  "scene",
  "camera",
  "render",
  "warmup",
]);
external_THREE_namespaceObject.Bootstrap.registerAlias("VR", [
  "core",
  "cursor",
  "fullscreen",
  "render:vr",
]);

;// CONCATENATED MODULE: ./src/core/bind.js




external_THREE_namespaceObject.Bootstrap.registerPlugin("bind", {
  install: function (three) {
    var globals = {
      three: three,
      window: window,
    };

    three.bind = Binder.bind(three, globals);
    three.unbind = Binder.unbind(three);

    three.bind("install:bind", this);
    three.bind("uninstall:unbind", this);
  },

  uninstall: function (three) {
    three.unbind(this);

    delete three.bind;
    delete three.unbind;
  },

  bind: function (event, three) {
    var plugin = event.plugin;
    var listen = plugin.listen;

    listen &&
      listen.forEach(function (key) {
        three.bind(key, plugin);
      });
  },

  unbind: function (event, three) {
    three.unbind(event.plugin);
  },
});

;// CONCATENATED MODULE: ./src/core/camera.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("camera", {
  defaults: {
    near: 0.01,
    far: 10000,

    type: "perspective",
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

  listen: ["resize", "this.change"],

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
      var klass =
        o.klass ||
        {
          perspective: external_THREE_namespaceObject.PerspectiveCamera,
          orthographic: external_THREE_namespaceObject.OrthographicCamera,
        }[o.type] ||
        external_THREE_namespaceObject.Camera;

      three.camera = o.parameters ? new klass(o.parameters) : new klass();
    }

    Object.entries(o).forEach(
      function ([key]) {
        if (Object.prototype.hasOwnProperty.call(three.camera, key))
          three.camera[key] = o[key];
      }.bind(this)
    );

    this.update(three);

    old === three.camera ||
      three.trigger({
        type: "camera",
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

;// CONCATENATED MODULE: ./src/core/fallback.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("fallback", {
  defaults: {
    force: false,
    fill: true,
    begin:
      '<div class="threestrap-fallback" style="display: table; width: 100%; height: 100%;' +
      'box-sizing: border-box; border: 1px dashed rgba(0, 0, 0, .25);">' +
      '<div style="display: table-cell; padding: 10px; vertical-align: middle; text-align: center;">',
    end: "</div></div>",
    message:
      "<big><strong>This example requires WebGL</strong></big><br>" +
      'Visit <a target="_blank" href="http://get.webgl.org/">get.webgl.org</a> for more info</a>',
  },

  install: function (three) {
    var cnv, gl;
    try {
      cnv = document.createElement("canvas");
      gl = cnv.getContext("webgl") || cnv.getContext("experimental-webgl");
      if (!gl || this.options.force) {
        throw "WebGL unavailable.";
      }
      three.fallback = false;
    } catch (e) {
      var message = this.options.message;
      var begin = this.options.begin;
      var end = this.options.end;
      var fill = this.options.fill;

      var div = document.createElement("div");
      div.innerHTML = begin + message + end;

      this.children = [];

      while (div.childNodes.length > 0) {
        this.children.push(div.firstChild);
        three.element.appendChild(div.firstChild);
      }

      if (fill) {
        three.install("fill");
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
      this.children = null;
    }

    delete three.fallback;
  },
});

;// CONCATENATED MODULE: ./src/core/fill.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("fill", {
  defaults: {
    block: true,
    body: true,
    layout: true,
  },

  install: function (three) {
    function is(element) {
      var h = element.style.height;
      return h == "auto" || h == "";
    }

    function set(element) {
      element.style.height = "100%";
      element.style.margin = 0;
      element.style.padding = 0;
      return element;
    }

    if (this.options.body && three.element == document.body) {
      // Fix body height if we're naked
      this.applied = [three.element, document.documentElement]
        .filter(is)
        .map(set);
    }

    if (this.options.block && three.canvas) {
      three.canvas.style.display = "block";
      this.block = true;
    }

    if (this.options.layout && three.element) {
      var style = window.getComputedStyle(three.element);
      if (style.position == "static") {
        three.element.style.position = "relative";
        this.layout = true;
      }
    }
  },

  uninstall: function (three) {
    if (this.applied) {
      const set = function (element) {
        element.style.height = "";
        element.style.margin = "";
        element.style.padding = "";
        return element;
      };

      this.applied.map(set);
      delete this.applied;
    }

    if (this.block && three.canvas) {
      three.canvas.style.display = "";
      delete this.block;
    }

    if (this.layout && three.element) {
      three.element.style.position = "";
      delete this.layout;
    }
  },

  change: function (three) {
    this.uninstall(three);
    this.install(three);
  },
});

;// CONCATENATED MODULE: ./src/core/loop.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("loop", {
  defaults: {
    start: true,
    each: 1,
  },

  listen: ["ready"],

  install: function (three) {
    this.running = false;
    this.lastRequestId = null;

    three.Loop = this.api(
      {
        start: this.start.bind(this),
        stop: this.stop.bind(this),
        running: false,
        window: window,
      },
      three
    );

    this.events = ["pre", "update", "render", "post"].map(function (type) {
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
      if (!this.running) return;
      this.lastRequestId = three.Loop.window.requestAnimationFrame(loop);
      this.events.map(trigger);
    }.bind(this);

    this.lastRequestId = three.Loop.window.requestAnimationFrame(loop);

    three.trigger({ type: "start" });
  },

  stop: function (three) {
    if (!this.running) return;
    three.Loop.running = this.running = false;

    three.Loop.window.cancelAnimationFrame(this.lastRequestId);
    this.lastRequestId = null;

    three.trigger({ type: "stop" });
  },
});

;// CONCATENATED MODULE: ./src/core/render.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("render", {
  listen: ["render"],

  render: function (event, three) {
    if (three.scene && three.camera) {
      three.renderer.render(three.scene, three.camera);
    }
  },
});

;// CONCATENATED MODULE: ./src/core/renderer.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("renderer", {
  defaults: {
    klass: external_THREE_namespaceObject.WebGL1Renderer,
    parameters: {
      depth: true,
      stencil: true,
      preserveDrawingBuffer: true,
      antialias: true,
    },
  },

  listen: ["resize"],

  install: function (three) {
    // Instantiate Three renderer
    var renderer = (three.renderer = new this.options.klass(
      this.options.parameters
    ));
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
    if (el && el.tagName == "CANVAS") {
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

;// CONCATENATED MODULE: ./src/core/scene.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("scene", {
  install: function (three) {
    three.scene = new external_THREE_namespaceObject.Scene();
  },

  uninstall: function (three) {
    delete three.scene;
  },
});

;// CONCATENATED MODULE: ./src/core/size.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("size", {
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
    "window.resize:queue",
    "element.resize:queue",
    "this.change:queue",
    "ready:resize",
    "pre:pre",
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

  queue: function (_event, _three) {
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

    var w,
      h,
      ew,
      eh,
      rw,
      rh,
      aspect,
      style,
      ratio,
      ml = 0,
      mt = 0;

    // Measure element
    w = ew =
      options.width === undefined || options.width == null
        ? element.offsetWidth || element.innerWidth || 0
        : options.width;

    h = eh =
      options.height === undefined || options.height == null
        ? element.offsetHeight || element.innerHeight || 0
        : options.height;

    // Force aspect ratio
    aspect = w / h;
    if (options.aspect) {
      if (options.aspect > aspect) {
        h = Math.round(w / options.aspect);
        mt = Math.floor((eh - h) / 2);
      } else {
        w = Math.round(h * options.aspect);
        ml = Math.floor((ew - w) / 2);
      }
      aspect = w / h;
    }

    // Get device pixel ratio
    ratio = 1;
    if (options.devicePixelRatio && typeof window != "undefined") {
      ratio = window.devicePixelRatio || 1;
    }

    // Apply scale and resolution max
    rw = Math.round(Math.min(w * ratio * options.scale, options.maxRenderWidth));
    rh = Math.round(Math.min(h * ratio * options.scale, options.maxRenderHeight));

    // Retain aspect ratio
    const raspect = rw / rh;
    if (raspect > aspect) {
      rw = Math.round(rh * aspect);
    } else {
      rh = Math.round(rw / aspect);
    }

    // Measure final pixel ratio
    ratio = rh / h;

    // Resize and position renderer element
    style = renderer.domElement.style;
    style.width = w + "px";
    style.height = h + "px";
    style.marginLeft = ml + "px";
    style.marginTop = mt + "px";

    // Notify
    Object.assign(three.Size, {
      renderWidth: rw,
      renderHeight: rh,
      viewWidth: w,
      viewHeight: h,
      aspect: aspect,
      pixelRatio: ratio,
    });

    three.trigger({
      type: "resize",
      renderWidth: rw,
      renderHeight: rh,
      viewWidth: w,
      viewHeight: h,
      aspect: aspect,
      pixelRatio: ratio,
    });
  },
});

;// CONCATENATED MODULE: ./src/core/time.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("time", {
  defaults: {
    speed: 1, // Clock speed
    warmup: 0, // Wait N frames before starting clock
    timeout: 1, // Timeout in seconds. Pause if no tick happens in this time.
  },

  listen: ["pre:tick", "this.change"],

  now: function () {
    return +new Date() / 1000;
  },

  install: function (three) {
    three.Time = this.api({
      now: this.now(), // Time since 1970 in seconds

      clock: 0, // Adjustable clock that counts up from 0 seconds
      step: 1 / 60, // Clock step in seconds

      frames: 0, // Framenumber
      time: 0, // Real time in seconds
      delta: 1 / 60, // Frame step in seconds

      average: 0, // Average frame time in seconds
      fps: 0, // Average frames per second
    });

    this.last = 0;
    this.time = 0;
    this.clock = 0;
    this.wait = this.options.warmup;

    this.clockStart = 0;
    this.timeStart = 0;
  },

  tick: function (event, three) {
    var speed = this.options.speed;
    var timeout = this.options.timeout;

    var api = three.Time;
    var now = (api.now = this.now());
    var last = this.last;
    var time = this.time;
    var clock = this.clock;

    if (last) {
      var delta = (api.delta = now - last);
      var average = api.average || delta;

      if (delta > timeout) {
        delta = 0;
      }

      var step = delta * speed;

      time += delta;
      clock += step;

      if (api.frames > 0) {
        api.average = average + (delta - average) * 0.1;
        api.fps = 1 / average;
      }

      api.step = step;
      api.clock = clock - this.clockStart;
      api.time = time - this.timeStart;

      api.frames++;

      if (this.wait-- > 0) {
        this.clockStart = clock;
        this.timeStart = time;
        api.clock = 0;
        api.step = 1e-100;
      }
    }

    this.last = now;
    this.clock = clock;
    this.time = time;
  },

  uninstall: function (three) {
    delete three.Time;
  },
});

;// CONCATENATED MODULE: ./src/core/warmup.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("warmup", {
  defaults: {
    delay: 2,
  },

  listen: ["ready", "post"],

  ready: function (event, three) {
    three.renderer.domElement.style.visibility = "hidden";
    this.frame = 0;
    this.hidden = true;
  },

  post: function (event, three) {
    if (this.hidden && this.frame >= this.options.delay) {
      three.renderer.domElement.style.visibility = "visible";
      this.hidden = false;
    }
    this.frame++;
  },
});

;// CONCATENATED MODULE: ./src/core/index.js












;// CONCATENATED MODULE: ./src/extra/controls.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("controls", {
  listen: ["update", "resize", "camera", "this.change"],

  defaults: {
    klass: null,
    parameters: {},
  },

  install: function (three) {
    if (!this.options.klass) throw "Must provide class for `controls.klass`";

    three.controls = null;

    this._camera = three.camera || new external_THREE_namespaceObject.PerspectiveCamera();
    this.change(null, three);
  },

  uninstall: function (three) {
    delete three.controls;
  },

  change: function (event, three) {
    if (this.options.klass) {
      if (!event || event.changes.klass) {
        three.controls = new this.options.klass(
          this._camera,
          three.renderer.domElement
        );
      }

      Object.assign(three.controls, this.options.parameters);
    } else {
      three.controls = null;
    }
  },

  update: function (event, three) {
    var delta = (three.Time && three.Time.delta) || 1 / 60;
    var vr = three.VR && three.VR.state;

    if (three.controls.vr) three.controls.vr(vr);
    three.controls.update(delta);
  },

  camera: function (event, three) {
    three.controls.object = this._camera = event.camera;
  },

  resize: function (event, three) {
    three.controls.handleResize && three.controls.handleResize();
  },
});

;// CONCATENATED MODULE: ./src/extra/cursor.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("cursor", {
  listen: [
    "update",
    "this.change",
    "install:change",
    "uninstall:change",
    "element.mousemove",
    "vr",
  ],

  defaults: {
    cursor: null,
    hide: false,
    timeout: 3,
  },

  install: function (three) {
    this.timeout = this.options.timeout;
    this.element = three.element;
    this.change(null, three);
  },

  uninstall: function (three) {
    delete three.controls;
  },

  change: function (event, three) {
    this.applyCursor(three);
  },

  mousemove: function (event, three) {
    if (this.options.hide) {
      this.applyCursor(three);
      this.timeout = +this.options.timeout || 0;
    }
  },

  update: function (event, three) {
    var delta = (three.Time && three.Time.delta) || 1 / 60;

    if (this.options.hide) {
      this.timeout -= delta;
      if (this.timeout < 0) {
        this.applyCursor(three, "none");
      }
    }
  },

  vr: function (event, three) {
    this.hide = event.active && !event.hmd.fake;
    this.applyCursor(three);
  },

  applyCursor: function (three, cursor) {
    var auto = three.controls ? "move" : "";
    cursor = cursor || this.options.cursor || auto;
    if (this.hide) cursor = "none";
    if (this.cursor != cursor) {
      this.element.style.cursor = cursor;
    }
  },
});

;// CONCATENATED MODULE: ./src/extra/fullscreen.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("fullscreen", {
  defaults: {
    key: "f",
  },

  listen: ["ready", "update"],

  install: function (three) {
    three.Fullscreen = this.api(
      {
        active: false,
        toggle: this.toggle.bind(this),
      },
      three
    );
  },

  uninstall: function (three) {
    delete three.Fullscreen;
  },

  ready: function (event, three) {
    document.body.addEventListener(
      "keypress",
      function (event) {
        if (
          this.options.key &&
          event.charCode == this.options.key.charCodeAt(0)
        ) {
          this.toggle(three);
        }
      }.bind(this)
    );

    var changeHandler = function () {
      var active =
        !!document.fullscreenElement ||
        !!document.mozFullScreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.msFullscreenElement;
      three.Fullscreen.active = this.active = active;
      three.trigger({
        type: "fullscreen",
        active: active,
      });
    }.bind(this);
    document.addEventListener("fullscreenchange", changeHandler, false);
    document.addEventListener("webkitfullscreenchange", changeHandler, false);
    document.addEventListener("mozfullscreenchange", changeHandler, false);
  },

  toggle: function (three) {
    var canvas = three.canvas;
    var options =
      three.VR && three.VR.active ? { vrDisplay: three.VR.hmd } : {};

    if (!this.active) {
      if (canvas.requestFullScreen) {
        canvas.requestFullScreen(options);
      } else if (canvas.msRequestFullScreen) {
        canvas.msRequestFullscreen(options);
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen(options);
      } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen(options); // s vs S
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // s vs S
      }
    }
  },
});

// EXTERNAL MODULE: ./node_modules/stats.js/build/stats.min.js
var stats_min = __webpack_require__(466);
var stats_min_default = /*#__PURE__*/__webpack_require__.n(stats_min);
;// CONCATENATED MODULE: ./src/extra/stats.js




external_THREE_namespaceObject.Bootstrap.registerPlugin("stats", {
  listen: ["pre", "post"],

  install: function (three) {
    var stats = (this.stats = new (stats_min_default())());
    var style = stats.domElement.style;

    style.position = "absolute";
    style.top = style.left = 0;
    three.element.appendChild(stats.domElement);

    three.stats = stats;
  },

  uninstall: function (three) {
    document.body.removeChild(this.stats.domElement);

    delete three.stats;
  },

  pre: function (_event, _three) {
    this.stats.begin();
  },

  post: function (_event, _three) {
    this.stats.end();
  },
});

;// CONCATENATED MODULE: ./src/extra/ui.js



external_THREE_namespaceObject.Bootstrap.registerPlugin("ui", {
  defaults: {
    theme: "white",
    style:
      ".threestrap-ui { position: absolute; bottom: 5px; right: 5px; float: left; }" +
      ".threestrap-ui button { border: 0; background: none;" +
      "  vertical-align: middle; font-weight: bold; } " +
      ".threestrap-ui .glyphicon { top: 2px; font-weight: bold; } " +
      "@media (max-width: 640px) { .threestrap-ui button { font-size: 120% } }" +
      ".threestrap-white button { color: #fff; text-shadow: 0 1px 1px rgba(0, 0, 0, 1), " +
      "0 1px 3px rgba(0, 0, 0, 1); }" +
      ".threestrap-black button { color: #000; text-shadow: 0 0px 1px rgba(255, 255, 255, 1), " +
      "0 0px 2px rgba(255, 255, 255, 1), " +
      "0 0px 2px rgba(255, 255, 255, 1) }",
  },

  listen: ["fullscreen"],

  markup: function (three, theme, style) {
    var url =
      "//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css";
    if (location.href.match(/^file:\/\//)) url = "http://" + url;

    var buttons = [];

    if (three.Fullscreen) {
      buttons.push(
        '<button class="fullscreen" title="Full Screen">' +
          '<span class="glyphicon glyphicon-fullscreen"></span>' +
          "</button>"
      );
    }
    if (three.VR) {
      buttons.push('<button class="vr" title="VR Headset">VR</button>');
    }

    return (
      '<style type="text/css">@import url("' +
      url +
      '"); ' +
      style +
      "</style>" +
      '<div class="threestrap-ui threestrap-' +
      theme +
      '">' +
      buttons.join("\n") +
      "</div>"
    );
  },

  install: function (three) {
    var ui = (this.ui = document.createElement("div"));
    ui.innerHTML = this.markup(three, this.options.theme, this.options.style);
    document.body.appendChild(ui);

    var fullscreen = (this.ui.fullscreen =
      ui.querySelector("button.fullscreen"));
    if (fullscreen) {
      three.bind([fullscreen, "click:goFullscreen"], this);
    }

    var vr = (this.ui.vr = ui.querySelector("button.vr"));
    if (vr && three.VR) {
      three.VR.set({ mode: "2d" });
      three.bind([vr, "click:goVR"], this);
    }
  },

  fullscreen: function (event, three) {
    this.ui.style.display = event.active ? "none" : "block";
    if (!event.active) three.VR && three.VR.set({ mode: "2d" });
  },

  goFullscreen: function (event, three) {
    if (three.Fullscreen) {
      three.Fullscreen.toggle();
    }
  },

  goVR: function (event, three) {
    if (three.VR) {
      three.VR.set({ mode: "auto" });
      three.Fullscreen.toggle();
    }
  },

  uninstall: function (_three) {
    document.body.removeChild(this.ui);
  },
});

;// CONCATENATED MODULE: ./src/extra/vr.js



/*
VR sensor / HMD hookup.
*/
external_THREE_namespaceObject.Bootstrap.registerPlugin("vr", {
  defaults: {
    mode: "auto", // 'auto', '2d'
    device: null,
    fov: 80, // emulated FOV for fallback
  },

  listen: ["window.load", "pre", "render", "resize", "this.change"],

  install: function (three) {
    three.VR = this.api(
      {
        active: false,
        devices: [],
        hmd: null,
        sensor: null,
        renderer: null,
        state: null,
      },
      three
    );
  },

  uninstall: function (three) {
    delete three.VR;
  },

  mocks: function (three, fov, def) {
    // Fake VR device for cardboard / desktop

    // Interpuppilary distance
    var ipd = 0.03;

    // Symmetric eye FOVs (Cardboard style)
    var getEyeTranslation = function (key) {
      return { left: { x: -ipd, y: 0, z: 0 }, right: { x: ipd, y: 0, z: 0 } }[
        key
      ];
    };
    var getRecommendedEyeFieldOfView = function (key) {
      var camera = three.camera;
      var aspect = (camera && camera.aspect) || 16 / 9;
      var fov2 = (fov || (camera && camera.fov) || def) / 2;
      var fovX =
        (Math.atan((Math.tan((fov2 * Math.PI) / 180) * aspect) / 2) * 180) /
        Math.PI;
      var fovY = fov2;

      return {
        left: {
          rightDegrees: fovX,
          leftDegrees: fovX,
          downDegrees: fovY,
          upDegrees: fovY,
        },
        right: {
          rightDegrees: fovX,
          leftDegrees: fovX,
          downDegrees: fovY,
          upDegrees: fovY,
        },
      }[key];
    };
    // Will be replaced with orbit controls or device orientation controls by THREE.VRControls
    var getState = function () {
      return {};
    };

    return [
      {
        fake: true,
        force: 1,
        deviceId: "emu",
        deviceName: "Emulated",
        getEyeTranslation: getEyeTranslation,
        getRecommendedEyeFieldOfView: getRecommendedEyeFieldOfView,
      },
      {
        force: 2,
        getState: getState,
      },
    ];
  },

  load: function (event, three) {
    var callback = function (devs) {
      this.callback(devs, three);
    }.bind(this);

    if (navigator.getVRDevices) {
      navigator.getVRDevices().then(callback);
    } else if (navigator.mozGetVRDevices) {
      navigator.mozGetVRDevices(callback);
    } else {
      console.warn("No native VR support detected.");
      callback(this.mocks(three, this.options.fov, this.defaults.fov), three);
    }
  },

  callback: function (vrdevs, three) {
    var hmd, sensor;

    var HMD = window.HMDVRDevice || function () {};
    var SENSOR = window.PositionSensorVRDevice || function () {};

    // Export list of devices
    vrdevs = three.VR.devices = vrdevs || three.VR.devices;

    // Get HMD device
    var deviceId = this.options.device;
    let dev;

    for (let i = 0; i < vrdevs.length; ++i) {
      dev = vrdevs[i];
      if (dev.force == 1 || dev instanceof HMD) {
        if (deviceId && deviceId != dev.deviceId) continue;
        hmd = dev;
        break;
      }
    }

    if (hmd) {
      // Get sensor device
      let dev;
      for (let i = 0; i < vrdevs.length; ++i) {
        dev = vrdevs[i];
        if (
          dev.force == 2 ||
          (dev instanceof SENSOR && dev.hardwareUnitId == hmd.hardwareUnitId)
        ) {
          sensor = dev;
          break;
        }
      }

      this.hookup(hmd, sensor, three);
    }
  },

  hookup: function (hmd, sensor, three) {
    if (!external_THREE_namespaceObject.VRRenderer) console.log("THREE.VRRenderer not found");
    var klass = external_THREE_namespaceObject.VRRenderer || function () {};

    this.renderer = new klass(three.renderer, hmd);
    this.hmd = hmd;
    this.sensor = sensor;

    three.VR.renderer = this.renderer;
    three.VR.hmd = hmd;
    three.VR.sensor = sensor;

    console.log("THREE.VRRenderer", hmd.deviceName);
  },

  change: function (event, three) {
    if (event.changes.device) {
      this.callback(null, three);
    }
    this.pre(event, three);
  },

  pre: function (event, three) {
    var last = this.active;

    // Global active flag
    var active = (this.active = this.renderer && this.options.mode != "2d");
    three.VR.active = active;

    // Load sensor state
    if (active && this.sensor) {
      var state = this.sensor.getState();
      three.VR.state = state;
    } else {
      three.VR.state = null;
    }

    // Notify if VR state changed
    if (last != this.active) {
      three.trigger({
        type: "vr",
        active: active,
        hmd: this.hmd,
        sensor: this.sensor,
      });
    }
  },

  resize: function (_event, _three) {
    if (this.active) {
      // Reinit HMD projection
      this.renderer.initialize();
    }
  },

  render: function (event, three) {
    if (three.scene && three.camera) {
      var renderer = this.active ? this.renderer : three.renderer;

      if (this.last != renderer) {
        if (renderer == three.renderer) {
          // Cleanup leftover renderer state when swapping back to normal
          var dpr = renderer.getPixelRatio();
          var width = renderer.domElement.width / dpr;
          var height = renderer.domElement.height / dpr;
          renderer.setScissorTest(false);
          renderer.setViewport(0, 0, width, height);
        }
      }

      this.last = renderer;

      renderer.render(three.scene, three.camera);
    }
  },
});

;// CONCATENATED MODULE: ./src/extra/index.js







;// CONCATENATED MODULE: ./src/controls/VRControls.js
/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 *
 * VRControls from
 * https://cdn.jsdelivr.net/npm/three@0.93.0/examples/js/controls/VRControls.js.
 * Added here so that the existing VR examples still work... this will stay
 * until we get everything upgraded to the modern three.js approach to VR. See
 * https://threejs.org/docs/index.html#manual/en/introduction/How-to-create-VR-content
 * for more info.
 */



external_THREE_namespaceObject.VRControls = function (object, onError) {
  var scope = this;

  var vrDisplay, vrDisplays;

  var standingMatrix = new external_THREE_namespaceObject.Matrix4();

  var frameData = null;

  if ("VRFrameData" in window) {
    frameData = new VRFrameData();
  }

  function gotVRDisplays(displays) {
    vrDisplays = displays;

    if (displays.length > 0) {
      vrDisplay = displays[0];
    } else {
      if (onError) onError("VR input not available.");
    }
  }

  if (navigator.getVRDisplays) {
    navigator
      .getVRDisplays()
      .then(gotVRDisplays)
      .catch(function () {
        console.warn("THREE.VRControls: Unable to get VR Displays");
      });
  }

  // the Rift SDK returns the position in meters
  // this scale factor allows the user to define how meters
  // are converted to scene units.

  this.scale = 1;

  // If true will use "standing space" coordinate system where y=0 is the
  // floor and x=0, z=0 is the center of the room.
  this.standing = false;

  // Distance from the users eyes to the floor in meters. Used when
  // standing=true but the VRDisplay doesn't provide stageParameters.
  this.userHeight = 1.6;

  this.getVRDisplay = function () {
    return vrDisplay;
  };

  this.setVRDisplay = function (value) {
    vrDisplay = value;
  };

  this.getVRDisplays = function () {
    console.warn("THREE.VRControls: getVRDisplays() is being deprecated.");
    return vrDisplays;
  };

  this.getStandingMatrix = function () {
    return standingMatrix;
  };

  this.update = function () {
    if (vrDisplay) {
      var pose;

      if (vrDisplay.getFrameData) {
        vrDisplay.getFrameData(frameData);
        pose = frameData.pose;
      } else if (vrDisplay.getPose) {
        pose = vrDisplay.getPose();
      }

      if (pose.orientation !== null) {
        object.quaternion.fromArray(pose.orientation);
      }

      if (pose.position !== null) {
        object.position.fromArray(pose.position);
      } else {
        object.position.set(0, 0, 0);
      }

      if (this.standing) {
        if (vrDisplay.stageParameters) {
          object.updateMatrix();

          standingMatrix.fromArray(
            vrDisplay.stageParameters.sittingToStandingTransform
          );
          object.applyMatrix(standingMatrix);
        } else {
          object.position.setY(object.position.y + this.userHeight);
        }
      }

      object.position.multiplyScalar(scope.scale);
    }
  };

  this.dispose = function () {
    vrDisplay = null;
  };
};

;// CONCATENATED MODULE: ./src/controls/index.js


;// CONCATENATED MODULE: ./src/renderers/MultiRenderer.js
/**
 * Allows a stack of renderers to be treated as a single renderer.
 * @author Gheric Speiginer
 */



// eslint-disable-next-line no-import-assign
external_THREE_namespaceObject.MultiRenderer = function (parameters) {
  console.log("THREE.MultiRenderer", external_THREE_namespaceObject.REVISION);

  this.domElement = document.createElement("div");
  this.domElement.style.position = "relative";

  this.renderers = [];
  this._renderSizeSet = false;

  var rendererClasses = parameters.renderers || [];
  var rendererParameters = parameters.parameters || [];

  // elements are stacked back-to-front
  for (var i = 0; i < rendererClasses.length; i++) {
    var renderer = new rendererClasses[i](rendererParameters[i]);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0px";
    renderer.domElement.style.left = "0px";
    this.domElement.appendChild(renderer.domElement);
    this.renderers.push(renderer);
  }
};

external_THREE_namespaceObject.MultiRenderer.prototype.setSize = function (w, h) {
  this.domElement.style.width = w + "px";
  this.domElement.style.height = h + "px";

  for (var i = 0; i < this.renderers.length; i++) {
    var renderer = this.renderers[i];
    var el = renderer.domElement;

    if (!this._renderSizeSet || (el && el.tagName !== "CANVAS")) {
      renderer.setSize(w, h);
    }

    el.style.width = w + "px";
    el.style.height = h + "px";
  }
};

external_THREE_namespaceObject.MultiRenderer.prototype.setRenderSize = function (rw, rh) {
  this._renderSizeSet = true;

  for (var i = 0; i < this.renderers.length; i++) {
    var renderer = this.renderers[i];
    var el = renderer.domElement;

    if (el && el.tagName === "CANVAS") {
      renderer.setSize(rw, rh, false);
    }
  }
};

external_THREE_namespaceObject.MultiRenderer.prototype.render = function (scene, camera) {
  for (var i = 0; i < this.renderers.length; i++) {
    this.renderers[i].render(scene, camera);
  }
};

;// CONCATENATED MODULE: ./src/renderers/VRRenderer.js
/**
 * VRRenderer
 *
 * @author wwwtyro https://github.com/wwwtyro
 * @author unconed https://github.com/unconed
 */


// eslint-disable-next-line no-import-assign
external_THREE_namespaceObject.VRRenderer = function (renderer, hmd) {
  var self = this;

  self.initialize = function () {
    var et = hmd.getEyeTranslation("left");
    self.halfIPD = new external_THREE_namespaceObject.Vector3(et.x, et.y, et.z).length();
    self.fovLeft = hmd.getRecommendedEyeFieldOfView("left");
    self.fovRight = hmd.getRecommendedEyeFieldOfView("right");
  };

  self.FovToNDCScaleOffset = function (fov) {
    var pxscale = 2.0 / (fov.leftTan + fov.rightTan);
    var pxoffset = (fov.leftTan - fov.rightTan) * pxscale * 0.5;
    var pyscale = 2.0 / (fov.upTan + fov.downTan);
    var pyoffset = (fov.upTan - fov.downTan) * pyscale * 0.5;
    return {
      scale: [pxscale, pyscale],
      offset: [pxoffset, pyoffset],
    };
  };

  self.FovPortToProjection = function (
    matrix,
    fov,
    rightHanded /* = true */,
    zNear /* = 0.01 */,
    zFar /* = 10000.0 */
  ) {
    rightHanded = rightHanded === undefined ? true : rightHanded;
    zNear = zNear === undefined ? 0.01 : zNear;
    zFar = zFar === undefined ? 10000.0 : zFar;
    var handednessScale = rightHanded ? -1.0 : 1.0;
    var m = matrix.elements;
    var scaleAndOffset = self.FovToNDCScaleOffset(fov);
    m[0 * 4 + 0] = scaleAndOffset.scale[0];
    m[0 * 4 + 1] = 0.0;
    m[0 * 4 + 2] = scaleAndOffset.offset[0] * handednessScale;
    m[0 * 4 + 3] = 0.0;
    m[1 * 4 + 0] = 0.0;
    m[1 * 4 + 1] = scaleAndOffset.scale[1];
    m[1 * 4 + 2] = -scaleAndOffset.offset[1] * handednessScale;
    m[1 * 4 + 3] = 0.0;
    m[2 * 4 + 0] = 0.0;
    m[2 * 4 + 1] = 0.0;
    m[2 * 4 + 2] = (zFar / (zNear - zFar)) * -handednessScale;
    m[2 * 4 + 3] = (zFar * zNear) / (zNear - zFar);
    m[3 * 4 + 0] = 0.0;
    m[3 * 4 + 1] = 0.0;
    m[3 * 4 + 2] = handednessScale;
    m[3 * 4 + 3] = 0.0;
    matrix.transpose();
  };

  self.FovToProjection = function (
    matrix,
    fov,
    rightHanded /* = true */,
    zNear /* = 0.01 */,
    zFar /* = 10000.0 */
  ) {
    var fovPort = {
      upTan: Math.tan((fov.upDegrees * Math.PI) / 180.0),
      downTan: Math.tan((fov.downDegrees * Math.PI) / 180.0),
      leftTan: Math.tan((fov.leftDegrees * Math.PI) / 180.0),
      rightTan: Math.tan((fov.rightDegrees * Math.PI) / 180.0),
    };
    return self.FovPortToProjection(matrix, fovPort, rightHanded, zNear, zFar);
  };

  var right = new external_THREE_namespaceObject.Vector3();

  var cameraLeft = new external_THREE_namespaceObject.PerspectiveCamera();
  var cameraRight = new external_THREE_namespaceObject.PerspectiveCamera();

  self.render = function (scene, camera) {
    self.FovToProjection(
      cameraLeft.projectionMatrix,
      self.fovLeft,
      true,
      camera.near,
      camera.far
    );
    self.FovToProjection(
      cameraRight.projectionMatrix,
      self.fovRight,
      true,
      camera.near,
      camera.far
    );

    right.set(self.halfIPD, 0, 0);
    right.applyQuaternion(camera.quaternion);

    cameraLeft.position.copy(camera.position).sub(right);
    cameraRight.position.copy(camera.position).add(right);

    cameraLeft.quaternion.copy(camera.quaternion);
    cameraRight.quaternion.copy(camera.quaternion);

    var dpr = renderer.devicePixelRatio || 1;
    var width = renderer.domElement.width / 2 / dpr;
    var height = renderer.domElement.height / dpr;

    renderer.enableScissorTest(true);

    renderer.setViewport(0, 0, width, height);
    renderer.setScissor(0, 0, width, height);
    renderer.render(scene, cameraLeft);

    renderer.setViewport(width, 0, width, height);
    renderer.setScissor(width, 0, width, height);
    renderer.render(scene, cameraRight);
  };

  self.initialize();
};

;// CONCATENATED MODULE: ./src/renderers/index.js



;// CONCATENATED MODULE: ./src/index.js






// These should probably be in their own build!



})();

/******/ })()
;
//# sourceMappingURL=threestrap.js.map
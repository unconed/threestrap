(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("THREE"));
	else if(typeof define === 'function' && define.amd)
		define("Threestrap", ["THREE"], factory);
	else if(typeof exports === 'object')
		exports["Threestrap"] = factory(require("THREE"));
	else
		root["Threestrap"] = factory(root["THREE"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__824__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 466:
/***/ (function(module) {

// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){ true?module.exports=e():0})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});


/***/ }),

/***/ 824:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__824__;

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Api": () => (/* reexport */ Api),
  "Binder": () => (/* reexport */ Binder),
  "Bootstrap": () => (/* reexport */ Bootstrap),
  "MultiRenderer": () => (/* reexport */ MultiRenderer),
  "VRControls": () => (/* reexport */ VRControls),
  "VRRenderer": () => (/* reexport */ VRRenderer)
});

;// CONCATENATED MODULE: ./src/api.js
class Api {
  static apply(object) {
    object.set = function (options) {
      const o = this.options || {};

      // Diff out changes
      const changes = Object.entries(options).reduce(function (
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
      if (!object) {
        object = {};
      }

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
  }
}

// EXTERNAL MODULE: external "THREE"
var external_THREE_ = __webpack_require__(824);
;// CONCATENATED MODULE: ./src/binder.js


class Binder {
  static bind(context, globals) {
    return function (key, object) {
      // Prepare object
      if (!object.__binds) {
        object.__binds = [];
      }

      // Set base target
      let fallback = context;

      if (Array.isArray(key)) {
        fallback = key[0];
        key = key[1];
      }

      // Match key
      const match = /^([^.:]*(?:\.[^.:]+)*)?(?::(.*))?$/.exec(key);
      const path = match[1].split(/\./g);

      const name = path.pop();
      const dest = match[2] || name;

      // Whitelisted objects
      const selector = path.shift();

      let target =
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
        const callback = function (event) {
          object[dest] && object[dest](event, context);
        };

        // Polyfill for both styles of event listener adders
        Binder._polyfill(target, ["addEventListener", "on"], function (method) {
          target[method](name, callback);
        });

        // Store bind for removal later
        const bind = { target: target, name: name, callback: callback };
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

    object.hasEventListener = external_THREE_.EventDispatcher.prototype.hasEventListener;
    object.addEventListener = external_THREE_.EventDispatcher.prototype.addEventListener;
    object.removeEventListener = external_THREE_.EventDispatcher.prototype.removeEventListener;

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

    const type = event.type;
    let listeners = this._listeners[type];
    if (listeners !== undefined) {
      listeners = listeners.slice();
      const length = listeners.length;

      event.target = this;
      for (let i = 0; i < length; i++) {
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

class Bootstrap {
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
    plugins.forEach((name) => this.__install(name));

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
      .forEach((p) => this.__uninstall(p.__name));
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

;// CONCATENATED MODULE: ./src/aliases.js


Bootstrap.registerAlias("empty", [
  "fallback",
  "bind",
  "renderer",
  "size",
  "fill",
  "loop",
  "time",
]);

Bootstrap.registerAlias("core", [
  "empty",
  "scene",
  "camera",
  "render",
  "warmup",
]);

Bootstrap.registerAlias("VR", ["core", "cursor", "fullscreen", "render:vr"]);

;// CONCATENATED MODULE: ./src/core/bind.js



Bootstrap.registerPlugin("bind", {
  install: function (three) {
    const globals = {
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
    const plugin = event.plugin;
    const listen = plugin.listen;

    listen &&
      listen.forEach(function (key) {
        three.bind(key, plugin);
      });
  },

  unbind: function (event, three) {
    three.unbind(event.plugin);
  },
});

;// CONCATENATED MODULE: ./node_modules/three/src/math/MathUtils.js
const _lut = [];

for ( let i = 0; i < 256; i ++ ) {

	_lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );

}

let _seed = 1234567;


const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
function generateUUID() {

	const d0 = Math.random() * 0xffffffff | 0;
	const d1 = Math.random() * 0xffffffff | 0;
	const d2 = Math.random() * 0xffffffff | 0;
	const d3 = Math.random() * 0xffffffff | 0;
	const uuid = _lut[ d0 & 0xff ] + _lut[ d0 >> 8 & 0xff ] + _lut[ d0 >> 16 & 0xff ] + _lut[ d0 >> 24 & 0xff ] + '-' +
			_lut[ d1 & 0xff ] + _lut[ d1 >> 8 & 0xff ] + '-' + _lut[ d1 >> 16 & 0x0f | 0x40 ] + _lut[ d1 >> 24 & 0xff ] + '-' +
			_lut[ d2 & 0x3f | 0x80 ] + _lut[ d2 >> 8 & 0xff ] + '-' + _lut[ d2 >> 16 & 0xff ] + _lut[ d2 >> 24 & 0xff ] +
			_lut[ d3 & 0xff ] + _lut[ d3 >> 8 & 0xff ] + _lut[ d3 >> 16 & 0xff ] + _lut[ d3 >> 24 & 0xff ];

	// .toUpperCase() here flattens concatenated strings to save heap memory space.
	return uuid.toUpperCase();

}

function clamp( value, min, max ) {

	return Math.max( min, Math.min( max, value ) );

}

// compute euclidian modulo of m % n
// https://en.wikipedia.org/wiki/Modulo_operation
function euclideanModulo( n, m ) {

	return ( ( n % m ) + m ) % m;

}

// Linear mapping from range <a1, a2> to range <b1, b2>
function mapLinear( x, a1, a2, b1, b2 ) {

	return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

}

// https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/
function inverseLerp( x, y, value ) {

	if ( x !== y ) {

		return ( value - x ) / ( y - x );

	} else {

		return 0;

	}

}

// https://en.wikipedia.org/wiki/Linear_interpolation
function lerp( x, y, t ) {

	return ( 1 - t ) * x + t * y;

}

// http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
function damp( x, y, lambda, dt ) {

	return lerp( x, y, 1 - Math.exp( - lambda * dt ) );

}

// https://www.desmos.com/calculator/vcsjnyz7x4
function pingpong( x, length = 1 ) {

	return length - Math.abs( euclideanModulo( x, length * 2 ) - length );

}

// http://en.wikipedia.org/wiki/Smoothstep
function smoothstep( x, min, max ) {

	if ( x <= min ) return 0;
	if ( x >= max ) return 1;

	x = ( x - min ) / ( max - min );

	return x * x * ( 3 - 2 * x );

}

function smootherstep( x, min, max ) {

	if ( x <= min ) return 0;
	if ( x >= max ) return 1;

	x = ( x - min ) / ( max - min );

	return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

}

// Random integer from <low, high> interval
function randInt( low, high ) {

	return low + Math.floor( Math.random() * ( high - low + 1 ) );

}

// Random float from <low, high> interval
function randFloat( low, high ) {

	return low + Math.random() * ( high - low );

}

// Random float from <-range/2, range/2> interval
function randFloatSpread( range ) {

	return range * ( 0.5 - Math.random() );

}

// Deterministic pseudo-random float in the interval [ 0, 1 ]
function seededRandom( s ) {

	if ( s !== undefined ) _seed = s % 2147483647;

	// Park-Miller algorithm

	_seed = _seed * 16807 % 2147483647;

	return ( _seed - 1 ) / 2147483646;

}

function degToRad( degrees ) {

	return degrees * DEG2RAD;

}

function radToDeg( radians ) {

	return radians * RAD2DEG;

}

function isPowerOfTwo( value ) {

	return ( value & ( value - 1 ) ) === 0 && value !== 0;

}

function ceilPowerOfTwo( value ) {

	return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

}

function floorPowerOfTwo( value ) {

	return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

}

function setQuaternionFromProperEuler( q, a, b, c, order ) {

	// Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles

	// rotations are applied to the axes in the order specified by 'order'
	// rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
	// angles are in radians

	const cos = Math.cos;
	const sin = Math.sin;

	const c2 = cos( b / 2 );
	const s2 = sin( b / 2 );

	const c13 = cos( ( a + c ) / 2 );
	const s13 = sin( ( a + c ) / 2 );

	const c1_3 = cos( ( a - c ) / 2 );
	const s1_3 = sin( ( a - c ) / 2 );

	const c3_1 = cos( ( c - a ) / 2 );
	const s3_1 = sin( ( c - a ) / 2 );

	switch ( order ) {

		case 'XYX':
			q.set( c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13 );
			break;

		case 'YZY':
			q.set( s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13 );
			break;

		case 'ZXZ':
			q.set( s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13 );
			break;

		case 'XZX':
			q.set( c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13 );
			break;

		case 'YXY':
			q.set( s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13 );
			break;

		case 'ZYZ':
			q.set( s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13 );
			break;

		default:
			console.warn( 'THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + order );

	}

}






;// CONCATENATED MODULE: ./node_modules/three/src/math/Quaternion.js


class Quaternion {

	constructor( x = 0, y = 0, z = 0, w = 1 ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

	}

	static slerp( qa, qb, qm, t ) {

		console.warn( 'THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead.' );
		return qm.slerpQuaternions( qa, qb, t );

	}

	static slerpFlat( dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t ) {

		// fuzz-free, array-based Quaternion SLERP operation

		let x0 = src0[ srcOffset0 + 0 ],
			y0 = src0[ srcOffset0 + 1 ],
			z0 = src0[ srcOffset0 + 2 ],
			w0 = src0[ srcOffset0 + 3 ];

		const x1 = src1[ srcOffset1 + 0 ],
			y1 = src1[ srcOffset1 + 1 ],
			z1 = src1[ srcOffset1 + 2 ],
			w1 = src1[ srcOffset1 + 3 ];

		if ( t === 0 ) {

			dst[ dstOffset + 0 ] = x0;
			dst[ dstOffset + 1 ] = y0;
			dst[ dstOffset + 2 ] = z0;
			dst[ dstOffset + 3 ] = w0;
			return;

		}

		if ( t === 1 ) {

			dst[ dstOffset + 0 ] = x1;
			dst[ dstOffset + 1 ] = y1;
			dst[ dstOffset + 2 ] = z1;
			dst[ dstOffset + 3 ] = w1;
			return;

		}

		if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

			let s = 1 - t;
			const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
				dir = ( cos >= 0 ? 1 : - 1 ),
				sqrSin = 1 - cos * cos;

			// Skip the Slerp for tiny steps to avoid numeric problems:
			if ( sqrSin > Number.EPSILON ) {

				const sin = Math.sqrt( sqrSin ),
					len = Math.atan2( sin, cos * dir );

				s = Math.sin( s * len ) / sin;
				t = Math.sin( t * len ) / sin;

			}

			const tDir = t * dir;

			x0 = x0 * s + x1 * tDir;
			y0 = y0 * s + y1 * tDir;
			z0 = z0 * s + z1 * tDir;
			w0 = w0 * s + w1 * tDir;

			// Normalize in case we just did a lerp:
			if ( s === 1 - t ) {

				const f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

				x0 *= f;
				y0 *= f;
				z0 *= f;
				w0 *= f;

			}

		}

		dst[ dstOffset ] = x0;
		dst[ dstOffset + 1 ] = y0;
		dst[ dstOffset + 2 ] = z0;
		dst[ dstOffset + 3 ] = w0;

	}

	static multiplyQuaternionsFlat( dst, dstOffset, src0, srcOffset0, src1, srcOffset1 ) {

		const x0 = src0[ srcOffset0 ];
		const y0 = src0[ srcOffset0 + 1 ];
		const z0 = src0[ srcOffset0 + 2 ];
		const w0 = src0[ srcOffset0 + 3 ];

		const x1 = src1[ srcOffset1 ];
		const y1 = src1[ srcOffset1 + 1 ];
		const z1 = src1[ srcOffset1 + 2 ];
		const w1 = src1[ srcOffset1 + 3 ];

		dst[ dstOffset ] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
		dst[ dstOffset + 1 ] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
		dst[ dstOffset + 2 ] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
		dst[ dstOffset + 3 ] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;

		return dst;

	}

	get x() {

		return this._x;

	}

	set x( value ) {

		this._x = value;
		this._onChangeCallback();

	}

	get y() {

		return this._y;

	}

	set y( value ) {

		this._y = value;
		this._onChangeCallback();

	}

	get z() {

		return this._z;

	}

	set z( value ) {

		this._z = value;
		this._onChangeCallback();

	}

	get w() {

		return this._w;

	}

	set w( value ) {

		this._w = value;
		this._onChangeCallback();

	}

	set( x, y, z, w ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this._onChangeCallback();

		return this;

	}

	clone() {

		return new this.constructor( this._x, this._y, this._z, this._w );

	}

	copy( quaternion ) {

		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;

		this._onChangeCallback();

		return this;

	}

	setFromEuler( euler, update ) {

		if ( ! ( euler && euler.isEuler ) ) {

			throw new Error( 'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		const x = euler._x, y = euler._y, z = euler._z, order = euler._order;

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		const cos = Math.cos;
		const sin = Math.sin;

		const c1 = cos( x / 2 );
		const c2 = cos( y / 2 );
		const c3 = cos( z / 2 );

		const s1 = sin( x / 2 );
		const s2 = sin( y / 2 );
		const s3 = sin( z / 2 );

		switch ( order ) {

			case 'XYZ':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'YXZ':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case 'ZXY':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'ZYX':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case 'YZX':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'XZY':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			default:
				console.warn( 'THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order );

		}

		if ( update !== false ) this._onChangeCallback();

		return this;

	}

	setFromAxisAngle( axis, angle ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		const halfAngle = angle / 2, s = Math.sin( halfAngle );

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );

		this._onChangeCallback();

		return this;

	}

	setFromRotationMatrix( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		const te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33;

		if ( trace > 0 ) {

			const s = 0.5 / Math.sqrt( trace + 1.0 );

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			const s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this._w = ( m32 - m23 ) / s;
			this._x = 0.25 * s;
			this._y = ( m12 + m21 ) / s;
			this._z = ( m13 + m31 ) / s;

		} else if ( m22 > m33 ) {

			const s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this._w = ( m13 - m31 ) / s;
			this._x = ( m12 + m21 ) / s;
			this._y = 0.25 * s;
			this._z = ( m23 + m32 ) / s;

		} else {

			const s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this._w = ( m21 - m12 ) / s;
			this._x = ( m13 + m31 ) / s;
			this._y = ( m23 + m32 ) / s;
			this._z = 0.25 * s;

		}

		this._onChangeCallback();

		return this;

	}

	setFromUnitVectors( vFrom, vTo ) {

		// assumes direction vectors vFrom and vTo are normalized

		let r = vFrom.dot( vTo ) + 1;

		if ( r < Number.EPSILON ) {

			// vFrom and vTo point in opposite directions

			r = 0;

			if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

				this._x = - vFrom.y;
				this._y = vFrom.x;
				this._z = 0;
				this._w = r;

			} else {

				this._x = 0;
				this._y = - vFrom.z;
				this._z = vFrom.y;
				this._w = r;

			}

		} else {

			// crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

			this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
			this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
			this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
			this._w = r;

		}

		return this.normalize();

	}

	angleTo( q ) {

		return 2 * Math.acos( Math.abs( clamp( this.dot( q ), - 1, 1 ) ) );

	}

	rotateTowards( q, step ) {

		const angle = this.angleTo( q );

		if ( angle === 0 ) return this;

		const t = Math.min( 1, step / angle );

		this.slerp( q, t );

		return this;

	}

	identity() {

		return this.set( 0, 0, 0, 1 );

	}

	invert() {

		// quaternion is assumed to have unit length

		return this.conjugate();

	}

	conjugate() {

		this._x *= - 1;
		this._y *= - 1;
		this._z *= - 1;

		this._onChangeCallback();

		return this;

	}

	dot( v ) {

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	}

	lengthSq() {

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	}

	length() {

		return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

	}

	normalize() {

		let l = this.length();

		if ( l === 0 ) {

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		} else {

			l = 1 / l;

			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;

		}

		this._onChangeCallback();

		return this;

	}

	multiply( q, p ) {

		if ( p !== undefined ) {

			console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
			return this.multiplyQuaternions( q, p );

		}

		return this.multiplyQuaternions( this, q );

	}

	premultiply( q ) {

		return this.multiplyQuaternions( q, this );

	}

	multiplyQuaternions( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this._onChangeCallback();

		return this;

	}

	slerp( qb, t ) {

		if ( t === 0 ) return this;
		if ( t === 1 ) return this.copy( qb );

		const x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if ( cosHalfTheta < 0 ) {

			this._w = - qb._w;
			this._x = - qb._x;
			this._y = - qb._y;
			this._z = - qb._z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

		if ( sqrSinHalfTheta <= Number.EPSILON ) {

			const s = 1 - t;
			this._w = s * w + t * this._w;
			this._x = s * x + t * this._x;
			this._y = s * y + t * this._y;
			this._z = s * z + t * this._z;

			this.normalize();
			this._onChangeCallback();

			return this;

		}

		const sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
		const halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
		const ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
			ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this._w = ( w * ratioA + this._w * ratioB );
		this._x = ( x * ratioA + this._x * ratioB );
		this._y = ( y * ratioA + this._y * ratioB );
		this._z = ( z * ratioA + this._z * ratioB );

		this._onChangeCallback();

		return this;

	}

	slerpQuaternions( qa, qb, t ) {

		return this.copy( qa ).slerp( qb, t );

	}

	random() {

		// Derived from http://planning.cs.uiuc.edu/node198.html
		// Note, this source uses w, x, y, z ordering,
		// so we swap the order below.

		const u1 = Math.random();
		const sqrt1u1 = Math.sqrt( 1 - u1 );
		const sqrtu1 = Math.sqrt( u1 );

		const u2 = 2 * Math.PI * Math.random();

		const u3 = 2 * Math.PI * Math.random();

		return this.set(
			sqrt1u1 * Math.cos( u2 ),
			sqrtu1 * Math.sin( u3 ),
			sqrtu1 * Math.cos( u3 ),
			sqrt1u1 * Math.sin( u2 ),
		);

	}

	equals( quaternion ) {

		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

	}

	fromArray( array, offset = 0 ) {

		this._x = array[ offset ];
		this._y = array[ offset + 1 ];
		this._z = array[ offset + 2 ];
		this._w = array[ offset + 3 ];

		this._onChangeCallback();

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._w;

		return array;

	}

	fromBufferAttribute( attribute, index ) {

		this._x = attribute.getX( index );
		this._y = attribute.getY( index );
		this._z = attribute.getZ( index );
		this._w = attribute.getW( index );

		return this;

	}

	_onChange( callback ) {

		this._onChangeCallback = callback;

		return this;

	}

	_onChangeCallback() {}

}

Quaternion.prototype.isQuaternion = true;



;// CONCATENATED MODULE: ./node_modules/three/src/math/Vector3.js



class Vector3 {

	constructor( x = 0, y = 0, z = 0 ) {

		this.x = x;
		this.y = y;
		this.z = z;

	}

	set( x, y, z ) {

		if ( z === undefined ) z = this.z; // sprite.scale.set(x,y)

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	}

	setScalar( scalar ) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;

		return this;

	}

	setX( x ) {

		this.x = x;

		return this;

	}

	setY( y ) {

		this.y = y;

		return this;

	}

	setZ( z ) {

		this.z = z;

		return this;

	}

	setComponent( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	}

	getComponent( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	}

	clone() {

		return new this.constructor( this.x, this.y, this.z );

	}

	copy( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	}

	add( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	}

	addScalar( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	}

	addVectors( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	}

	addScaledVector( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;

		return this;

	}

	sub( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	}

	subScalar( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;

	}

	subVectors( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	}

	multiply( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	}

	multiplyScalar( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	}

	multiplyVectors( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	}

	applyEuler( euler ) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		return this.applyQuaternion( _quaternion.setFromEuler( euler ) );

	}

	applyAxisAngle( axis, angle ) {

		return this.applyQuaternion( _quaternion.setFromAxisAngle( axis, angle ) );

	}

	applyMatrix3( m ) {

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	}

	applyNormalMatrix( m ) {

		return this.applyMatrix3( m ).normalize();

	}

	applyMatrix4( m ) {

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		const w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

		return this;

	}

	applyQuaternion( q ) {

		const x = this.x, y = this.y, z = this.z;
		const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

		// calculate quat * vector

		const ix = qw * x + qy * z - qz * y;
		const iy = qw * y + qz * x - qx * z;
		const iz = qw * z + qx * y - qy * x;
		const iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;

	}

	project( camera ) {

		return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );

	}

	unproject( camera ) {

		return this.applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld );

	}

	transformDirection( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		return this.normalize();

	}

	divide( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	}

	divideScalar( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	}

	min( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );
		this.z = Math.min( this.z, v.z );

		return this;

	}

	max( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );
		this.z = Math.max( this.z, v.z );

		return this;

	}

	clamp( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );
		this.z = Math.max( min.z, Math.min( max.z, this.z ) );

		return this;

	}

	clampScalar( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
		this.z = Math.max( minVal, Math.min( maxVal, this.z ) );

		return this;

	}

	clampLength( min, max ) {

		const length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	}

	floor() {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;

	}

	ceil() {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;

	}

	round() {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;

	}

	roundToZero() {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;

	}

	negate() {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	}

	dot( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	}

	// TODO lengthSquared?

	lengthSq() {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	}

	length() {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	}

	manhattanLength() {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	}

	normalize() {

		return this.divideScalar( this.length() || 1 );

	}

	setLength( length ) {

		return this.normalize().multiplyScalar( length );

	}

	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	}

	lerpVectors( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;
		this.z = v1.z + ( v2.z - v1.z ) * alpha;

		return this;

	}

	cross( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		return this.crossVectors( this, v );

	}

	crossVectors( a, b ) {

		const ax = a.x, ay = a.y, az = a.z;
		const bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	}

	projectOnVector( v ) {

		const denominator = v.lengthSq();

		if ( denominator === 0 ) return this.set( 0, 0, 0 );

		const scalar = v.dot( this ) / denominator;

		return this.copy( v ).multiplyScalar( scalar );

	}

	projectOnPlane( planeNormal ) {

		_vector.copy( this ).projectOnVector( planeNormal );

		return this.sub( _vector );

	}

	reflect( normal ) {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		return this.sub( _vector.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

	}

	angleTo( v ) {

		const denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

		if ( denominator === 0 ) return Math.PI / 2;

		const theta = this.dot( v ) / denominator;

		// clamp, to handle numerical problems

		return Math.acos( clamp( theta, - 1, 1 ) );

	}

	distanceTo( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	}

	distanceToSquared( v ) {

		const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	}

	manhattanDistanceTo( v ) {

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );

	}

	setFromSpherical( s ) {

		return this.setFromSphericalCoords( s.radius, s.phi, s.theta );

	}

	setFromSphericalCoords( radius, phi, theta ) {

		const sinPhiRadius = Math.sin( phi ) * radius;

		this.x = sinPhiRadius * Math.sin( theta );
		this.y = Math.cos( phi ) * radius;
		this.z = sinPhiRadius * Math.cos( theta );

		return this;

	}

	setFromCylindrical( c ) {

		return this.setFromCylindricalCoords( c.radius, c.theta, c.y );

	}

	setFromCylindricalCoords( radius, theta, y ) {

		this.x = radius * Math.sin( theta );
		this.y = y;
		this.z = radius * Math.cos( theta );

		return this;

	}

	setFromMatrixPosition( m ) {

		const e = m.elements;

		this.x = e[ 12 ];
		this.y = e[ 13 ];
		this.z = e[ 14 ];

		return this;

	}

	setFromMatrixScale( m ) {

		const sx = this.setFromMatrixColumn( m, 0 ).length();
		const sy = this.setFromMatrixColumn( m, 1 ).length();
		const sz = this.setFromMatrixColumn( m, 2 ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;

	}

	setFromMatrixColumn( m, index ) {

		return this.fromArray( m.elements, index * 4 );

	}

	setFromMatrix3Column( m, index ) {

		return this.fromArray( m.elements, index * 3 );

	}

	equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	}

	fromArray( array, offset = 0 ) {

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	}

	fromBufferAttribute( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector3: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );
		this.z = attribute.getZ( index );

		return this;

	}

	random() {

		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();

		return this;

	}

	randomDirection() {

		// Derived from https://mathworld.wolfram.com/SpherePointPicking.html

		const u = ( Math.random() - 0.5 ) * 2;
		const t = Math.random() * Math.PI * 2;
		const f = Math.sqrt( 1 - u ** 2 );

		this.x = f * Math.cos( t );
		this.y = f * Math.sin( t );
		this.z = u;

		return this;

	}

	*[ Symbol.iterator ]() {

		yield this.x;
		yield this.y;
		yield this.z;

	}

}

Vector3.prototype.isVector3 = true;

const _vector = /*@__PURE__*/ new Vector3();
const _quaternion = /*@__PURE__*/ new Quaternion();



;// CONCATENATED MODULE: ./node_modules/three/src/math/Matrix4.js


class Matrix4 {

	constructor() {

		this.elements = [

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	set( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		const te = this.elements;

		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

		return this;

	}

	identity() {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	}

	clone() {

		return new Matrix4().fromArray( this.elements );

	}

	copy( m ) {

		const te = this.elements;
		const me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
		te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
		te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
		te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];

		return this;

	}

	copyPosition( m ) {

		const te = this.elements, me = m.elements;

		te[ 12 ] = me[ 12 ];
		te[ 13 ] = me[ 13 ];
		te[ 14 ] = me[ 14 ];

		return this;

	}

	setFromMatrix3( m ) {

		const me = m.elements;

		this.set(

			me[ 0 ], me[ 3 ], me[ 6 ], 0,
			me[ 1 ], me[ 4 ], me[ 7 ], 0,
			me[ 2 ], me[ 5 ], me[ 8 ], 0,
			0, 0, 0, 1

		);

		return this;

	}

	extractBasis( xAxis, yAxis, zAxis ) {

		xAxis.setFromMatrixColumn( this, 0 );
		yAxis.setFromMatrixColumn( this, 1 );
		zAxis.setFromMatrixColumn( this, 2 );

		return this;

	}

	makeBasis( xAxis, yAxis, zAxis ) {

		this.set(
			xAxis.x, yAxis.x, zAxis.x, 0,
			xAxis.y, yAxis.y, zAxis.y, 0,
			xAxis.z, yAxis.z, zAxis.z, 0,
			0, 0, 0, 1
		);

		return this;

	}

	extractRotation( m ) {

		// this method does not support reflection matrices

		const te = this.elements;
		const me = m.elements;

		const scaleX = 1 / _v1.setFromMatrixColumn( m, 0 ).length();
		const scaleY = 1 / _v1.setFromMatrixColumn( m, 1 ).length();
		const scaleZ = 1 / _v1.setFromMatrixColumn( m, 2 ).length();

		te[ 0 ] = me[ 0 ] * scaleX;
		te[ 1 ] = me[ 1 ] * scaleX;
		te[ 2 ] = me[ 2 ] * scaleX;
		te[ 3 ] = 0;

		te[ 4 ] = me[ 4 ] * scaleY;
		te[ 5 ] = me[ 5 ] * scaleY;
		te[ 6 ] = me[ 6 ] * scaleY;
		te[ 7 ] = 0;

		te[ 8 ] = me[ 8 ] * scaleZ;
		te[ 9 ] = me[ 9 ] * scaleZ;
		te[ 10 ] = me[ 10 ] * scaleZ;
		te[ 11 ] = 0;

		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	}

	makeRotationFromEuler( euler ) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

		}

		const te = this.elements;

		const x = euler.x, y = euler.y, z = euler.z;
		const a = Math.cos( x ), b = Math.sin( x );
		const c = Math.cos( y ), d = Math.sin( y );
		const e = Math.cos( z ), f = Math.sin( z );

		if ( euler.order === 'XYZ' ) {

			const ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = - c * f;
			te[ 8 ] = d;

			te[ 1 ] = af + be * d;
			te[ 5 ] = ae - bf * d;
			te[ 9 ] = - b * c;

			te[ 2 ] = bf - ae * d;
			te[ 6 ] = be + af * d;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YXZ' ) {

			const ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce + df * b;
			te[ 4 ] = de * b - cf;
			te[ 8 ] = a * d;

			te[ 1 ] = a * f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b;

			te[ 2 ] = cf * b - de;
			te[ 6 ] = df + ce * b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZXY' ) {

			const ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce - df * b;
			te[ 4 ] = - a * f;
			te[ 8 ] = de + cf * b;

			te[ 1 ] = cf + de * b;
			te[ 5 ] = a * e;
			te[ 9 ] = df - ce * b;

			te[ 2 ] = - a * d;
			te[ 6 ] = b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZYX' ) {

			const ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = be * d - af;
			te[ 8 ] = ae * d + bf;

			te[ 1 ] = c * f;
			te[ 5 ] = bf * d + ae;
			te[ 9 ] = af * d - be;

			te[ 2 ] = - d;
			te[ 6 ] = b * c;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YZX' ) {

			const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = bd - ac * f;
			te[ 8 ] = bc * f + ad;

			te[ 1 ] = f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b * e;

			te[ 2 ] = - d * e;
			te[ 6 ] = ad * f + bc;
			te[ 10 ] = ac - bd * f;

		} else if ( euler.order === 'XZY' ) {

			const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = - f;
			te[ 8 ] = d * e;

			te[ 1 ] = ac * f + bd;
			te[ 5 ] = a * e;
			te[ 9 ] = ad * f - bc;

			te[ 2 ] = bc * f - ad;
			te[ 6 ] = b * e;
			te[ 10 ] = bd * f + ac;

		}

		// bottom row
		te[ 3 ] = 0;
		te[ 7 ] = 0;
		te[ 11 ] = 0;

		// last column
		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	}

	makeRotationFromQuaternion( q ) {

		return this.compose( _zero, q, _one );

	}

	lookAt( eye, target, up ) {

		const te = this.elements;

		_z.subVectors( eye, target );

		if ( _z.lengthSq() === 0 ) {

			// eye and target are in the same position

			_z.z = 1;

		}

		_z.normalize();
		_x.crossVectors( up, _z );

		if ( _x.lengthSq() === 0 ) {

			// up and z are parallel

			if ( Math.abs( up.z ) === 1 ) {

				_z.x += 0.0001;

			} else {

				_z.z += 0.0001;

			}

			_z.normalize();
			_x.crossVectors( up, _z );

		}

		_x.normalize();
		_y.crossVectors( _z, _x );

		te[ 0 ] = _x.x; te[ 4 ] = _y.x; te[ 8 ] = _z.x;
		te[ 1 ] = _x.y; te[ 5 ] = _y.y; te[ 9 ] = _z.y;
		te[ 2 ] = _x.z; te[ 6 ] = _y.z; te[ 10 ] = _z.z;

		return this;

	}

	multiply( m, n ) {

		if ( n !== undefined ) {

			console.warn( 'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
			return this.multiplyMatrices( m, n );

		}

		return this.multiplyMatrices( this, m );

	}

	premultiply( m ) {

		return this.multiplyMatrices( m, this );

	}

	multiplyMatrices( a, b ) {

		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;

		const a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
		const a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
		const a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
		const a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

		const b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
		const b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
		const b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
		const b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	}

	multiplyScalar( s ) {

		const te = this.elements;

		te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
		te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
		te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
		te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

		return this;

	}

	determinant() {

		const te = this.elements;

		const n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
		const n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
		const n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
		const n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

		return (
			n41 * (
				+ n14 * n23 * n32
				 - n13 * n24 * n32
				 - n14 * n22 * n33
				 + n12 * n24 * n33
				 + n13 * n22 * n34
				 - n12 * n23 * n34
			) +
			n42 * (
				+ n11 * n23 * n34
				 - n11 * n24 * n33
				 + n14 * n21 * n33
				 - n13 * n21 * n34
				 + n13 * n24 * n31
				 - n14 * n23 * n31
			) +
			n43 * (
				+ n11 * n24 * n32
				 - n11 * n22 * n34
				 - n14 * n21 * n32
				 + n12 * n21 * n34
				 + n14 * n22 * n31
				 - n12 * n24 * n31
			) +
			n44 * (
				- n13 * n22 * n31
				 - n11 * n23 * n32
				 + n11 * n22 * n33
				 + n13 * n21 * n32
				 - n12 * n21 * n33
				 + n12 * n23 * n31
			)

		);

	}

	transpose() {

		const te = this.elements;
		let tmp;

		tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
		tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
		tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

		tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
		tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
		tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

		return this;

	}

	setPosition( x, y, z ) {

		const te = this.elements;

		if ( x.isVector3 ) {

			te[ 12 ] = x.x;
			te[ 13 ] = x.y;
			te[ 14 ] = x.z;

		} else {

			te[ 12 ] = x;
			te[ 13 ] = y;
			te[ 14 ] = z;

		}

		return this;

	}

	invert() {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		const te = this.elements,

			n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ], n41 = te[ 3 ],
			n12 = te[ 4 ], n22 = te[ 5 ], n32 = te[ 6 ], n42 = te[ 7 ],
			n13 = te[ 8 ], n23 = te[ 9 ], n33 = te[ 10 ], n43 = te[ 11 ],
			n14 = te[ 12 ], n24 = te[ 13 ], n34 = te[ 14 ], n44 = te[ 15 ],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if ( det === 0 ) return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );

		const detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
		te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
		te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

		te[ 4 ] = t12 * detInv;
		te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
		te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
		te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

		te[ 8 ] = t13 * detInv;
		te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
		te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
		te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

		te[ 12 ] = t14 * detInv;
		te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
		te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
		te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

		return this;

	}

	scale( v ) {

		const te = this.elements;
		const x = v.x, y = v.y, z = v.z;

		te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
		te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
		te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
		te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

		return this;

	}

	getMaxScaleOnAxis() {

		const te = this.elements;

		const scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
		const scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
		const scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

		return Math.sqrt( Math.max( scaleXSq, scaleYSq, scaleZSq ) );

	}

	makeTranslation( x, y, z ) {

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		return this;

	}

	makeRotationX( theta ) {

		const c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0, 0, 0,
			0, c, - s, 0,
			0, s, c, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeRotationY( theta ) {

		const c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			 c, 0, s, 0,
			 0, 1, 0, 0,
			- s, 0, c, 0,
			 0, 0, 0, 1

		);

		return this;

	}

	makeRotationZ( theta ) {

		const c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, - s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeRotationAxis( axis, angle ) {

		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		const c = Math.cos( angle );
		const s = Math.sin( angle );
		const t = 1 - c;
		const x = axis.x, y = axis.y, z = axis.z;
		const tx = t * x, ty = t * y;

		this.set(

			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeScale( x, y, z ) {

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeShear( xy, xz, yx, yz, zx, zy ) {

		this.set(

			1, yx, zx, 0,
			xy, 1, zy, 0,
			xz, yz, 1, 0,
			0, 0, 0, 1

		);

		return this;

	}

	compose( position, quaternion, scale ) {

		const te = this.elements;

		const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
		const x2 = x + x,	y2 = y + y, z2 = z + z;
		const xx = x * x2, xy = x * y2, xz = x * z2;
		const yy = y * y2, yz = y * z2, zz = z * z2;
		const wx = w * x2, wy = w * y2, wz = w * z2;

		const sx = scale.x, sy = scale.y, sz = scale.z;

		te[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
		te[ 1 ] = ( xy + wz ) * sx;
		te[ 2 ] = ( xz - wy ) * sx;
		te[ 3 ] = 0;

		te[ 4 ] = ( xy - wz ) * sy;
		te[ 5 ] = ( 1 - ( xx + zz ) ) * sy;
		te[ 6 ] = ( yz + wx ) * sy;
		te[ 7 ] = 0;

		te[ 8 ] = ( xz + wy ) * sz;
		te[ 9 ] = ( yz - wx ) * sz;
		te[ 10 ] = ( 1 - ( xx + yy ) ) * sz;
		te[ 11 ] = 0;

		te[ 12 ] = position.x;
		te[ 13 ] = position.y;
		te[ 14 ] = position.z;
		te[ 15 ] = 1;

		return this;

	}

	decompose( position, quaternion, scale ) {

		const te = this.elements;

		let sx = _v1.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
		const sy = _v1.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
		const sz = _v1.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

		// if determine is negative, we need to invert one scale
		const det = this.determinant();
		if ( det < 0 ) sx = - sx;

		position.x = te[ 12 ];
		position.y = te[ 13 ];
		position.z = te[ 14 ];

		// scale the rotation part
		_m1.copy( this );

		const invSX = 1 / sx;
		const invSY = 1 / sy;
		const invSZ = 1 / sz;

		_m1.elements[ 0 ] *= invSX;
		_m1.elements[ 1 ] *= invSX;
		_m1.elements[ 2 ] *= invSX;

		_m1.elements[ 4 ] *= invSY;
		_m1.elements[ 5 ] *= invSY;
		_m1.elements[ 6 ] *= invSY;

		_m1.elements[ 8 ] *= invSZ;
		_m1.elements[ 9 ] *= invSZ;
		_m1.elements[ 10 ] *= invSZ;

		quaternion.setFromRotationMatrix( _m1 );

		scale.x = sx;
		scale.y = sy;
		scale.z = sz;

		return this;

	}

	makePerspective( left, right, top, bottom, near, far ) {

		if ( far === undefined ) {

			console.warn( 'THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.' );

		}

		const te = this.elements;
		const x = 2 * near / ( right - left );
		const y = 2 * near / ( top - bottom );

		const a = ( right + left ) / ( right - left );
		const b = ( top + bottom ) / ( top - bottom );
		const c = - ( far + near ) / ( far - near );
		const d = - 2 * far * near / ( far - near );

		te[ 0 ] = x;	te[ 4 ] = 0;	te[ 8 ] = a;	te[ 12 ] = 0;
		te[ 1 ] = 0;	te[ 5 ] = y;	te[ 9 ] = b;	te[ 13 ] = 0;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = c;	te[ 14 ] = d;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = - 1;	te[ 15 ] = 0;

		return this;

	}

	makeOrthographic( left, right, top, bottom, near, far ) {

		const te = this.elements;
		const w = 1.0 / ( right - left );
		const h = 1.0 / ( top - bottom );
		const p = 1.0 / ( far - near );

		const x = ( right + left ) * w;
		const y = ( top + bottom ) * h;
		const z = ( far + near ) * p;

		te[ 0 ] = 2 * w;	te[ 4 ] = 0;	te[ 8 ] = 0;	te[ 12 ] = - x;
		te[ 1 ] = 0;	te[ 5 ] = 2 * h;	te[ 9 ] = 0;	te[ 13 ] = - y;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = - 2 * p;	te[ 14 ] = - z;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = 0;	te[ 15 ] = 1;

		return this;

	}

	equals( matrix ) {

		const te = this.elements;
		const me = matrix.elements;

		for ( let i = 0; i < 16; i ++ ) {

			if ( te[ i ] !== me[ i ] ) return false;

		}

		return true;

	}

	fromArray( array, offset = 0 ) {

		for ( let i = 0; i < 16; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	}

	toArray( array = [], offset = 0 ) {

		const te = this.elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];
		array[ offset + 3 ] = te[ 3 ];

		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];
		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];

		array[ offset + 8 ] = te[ 8 ];
		array[ offset + 9 ] = te[ 9 ];
		array[ offset + 10 ] = te[ 10 ];
		array[ offset + 11 ] = te[ 11 ];

		array[ offset + 12 ] = te[ 12 ];
		array[ offset + 13 ] = te[ 13 ];
		array[ offset + 14 ] = te[ 14 ];
		array[ offset + 15 ] = te[ 15 ];

		return array;

	}

}

Matrix4.prototype.isMatrix4 = true;

const _v1 = /*@__PURE__*/ new Vector3();
const _m1 = /*@__PURE__*/ new Matrix4();
const _zero = /*@__PURE__*/ new Vector3( 0, 0, 0 );
const _one = /*@__PURE__*/ new Vector3( 1, 1, 1 );
const _x = /*@__PURE__*/ new Vector3();
const _y = /*@__PURE__*/ new Vector3();
const _z = /*@__PURE__*/ new Vector3();



;// CONCATENATED MODULE: ./node_modules/three/src/core/EventDispatcher.js
/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */

class EventDispatcher {

	addEventListener( type, listener ) {

		if ( this._listeners === undefined ) this._listeners = {};

		const listeners = this._listeners;

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	}

	hasEventListener( type, listener ) {

		if ( this._listeners === undefined ) return false;

		const listeners = this._listeners;

		return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

	}

	removeEventListener( type, listener ) {

		if ( this._listeners === undefined ) return;

		const listeners = this._listeners;
		const listenerArray = listeners[ type ];

		if ( listenerArray !== undefined ) {

			const index = listenerArray.indexOf( listener );

			if ( index !== - 1 ) {

				listenerArray.splice( index, 1 );

			}

		}

	}

	dispatchEvent( event ) {

		if ( this._listeners === undefined ) return;

		const listeners = this._listeners;
		const listenerArray = listeners[ event.type ];

		if ( listenerArray !== undefined ) {

			event.target = this;

			// Make a copy, in case listeners are removed while iterating.
			const array = listenerArray.slice( 0 );

			for ( let i = 0, l = array.length; i < l; i ++ ) {

				array[ i ].call( this, event );

			}

			event.target = null;

		}

	}

}




;// CONCATENATED MODULE: ./node_modules/three/src/math/Euler.js





const _matrix = /*@__PURE__*/ new Matrix4();
const Euler_quaternion = /*@__PURE__*/ new Quaternion();

class Euler {

	constructor( x = 0, y = 0, z = 0, order = Euler.DefaultOrder ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order;

	}

	get x() {

		return this._x;

	}

	set x( value ) {

		this._x = value;
		this._onChangeCallback();

	}

	get y() {

		return this._y;

	}

	set y( value ) {

		this._y = value;
		this._onChangeCallback();

	}

	get z() {

		return this._z;

	}

	set z( value ) {

		this._z = value;
		this._onChangeCallback();

	}

	get order() {

		return this._order;

	}

	set order( value ) {

		this._order = value;
		this._onChangeCallback();

	}

	set( x, y, z, order = this._order ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order;

		this._onChangeCallback();

		return this;

	}

	clone() {

		return new this.constructor( this._x, this._y, this._z, this._order );

	}

	copy( euler ) {

		this._x = euler._x;
		this._y = euler._y;
		this._z = euler._z;
		this._order = euler._order;

		this._onChangeCallback();

		return this;

	}

	setFromRotationMatrix( m, order = this._order, update = true ) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		const te = m.elements;
		const m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		const m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		const m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		switch ( order ) {

			case 'XYZ':

				this._y = Math.asin( clamp( m13, - 1, 1 ) );

				if ( Math.abs( m13 ) < 0.9999999 ) {

					this._x = Math.atan2( - m23, m33 );
					this._z = Math.atan2( - m12, m11 );

				} else {

					this._x = Math.atan2( m32, m22 );
					this._z = 0;

				}

				break;

			case 'YXZ':

				this._x = Math.asin( - clamp( m23, - 1, 1 ) );

				if ( Math.abs( m23 ) < 0.9999999 ) {

					this._y = Math.atan2( m13, m33 );
					this._z = Math.atan2( m21, m22 );

				} else {

					this._y = Math.atan2( - m31, m11 );
					this._z = 0;

				}

				break;

			case 'ZXY':

				this._x = Math.asin( clamp( m32, - 1, 1 ) );

				if ( Math.abs( m32 ) < 0.9999999 ) {

					this._y = Math.atan2( - m31, m33 );
					this._z = Math.atan2( - m12, m22 );

				} else {

					this._y = 0;
					this._z = Math.atan2( m21, m11 );

				}

				break;

			case 'ZYX':

				this._y = Math.asin( - clamp( m31, - 1, 1 ) );

				if ( Math.abs( m31 ) < 0.9999999 ) {

					this._x = Math.atan2( m32, m33 );
					this._z = Math.atan2( m21, m11 );

				} else {

					this._x = 0;
					this._z = Math.atan2( - m12, m22 );

				}

				break;

			case 'YZX':

				this._z = Math.asin( clamp( m21, - 1, 1 ) );

				if ( Math.abs( m21 ) < 0.9999999 ) {

					this._x = Math.atan2( - m23, m22 );
					this._y = Math.atan2( - m31, m11 );

				} else {

					this._x = 0;
					this._y = Math.atan2( m13, m33 );

				}

				break;

			case 'XZY':

				this._z = Math.asin( - clamp( m12, - 1, 1 ) );

				if ( Math.abs( m12 ) < 0.9999999 ) {

					this._x = Math.atan2( m32, m22 );
					this._y = Math.atan2( m13, m11 );

				} else {

					this._x = Math.atan2( - m23, m33 );
					this._y = 0;

				}

				break;

			default:

				console.warn( 'THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + order );

		}

		this._order = order;

		if ( update === true ) this._onChangeCallback();

		return this;

	}

	setFromQuaternion( q, order, update ) {

		_matrix.makeRotationFromQuaternion( q );

		return this.setFromRotationMatrix( _matrix, order, update );

	}

	setFromVector3( v, order = this._order ) {

		return this.set( v.x, v.y, v.z, order );

	}

	reorder( newOrder ) {

		// WARNING: this discards revolution information -bhouston

		Euler_quaternion.setFromEuler( this );

		return this.setFromQuaternion( Euler_quaternion, newOrder );

	}

	equals( euler ) {

		return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

	}

	fromArray( array ) {

		this._x = array[ 0 ];
		this._y = array[ 1 ];
		this._z = array[ 2 ];
		if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

		this._onChangeCallback();

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._order;

		return array;

	}

	toVector3( optionalResult ) {

		if ( optionalResult ) {

			return optionalResult.set( this._x, this._y, this._z );

		} else {

			return new Vector3( this._x, this._y, this._z );

		}

	}

	_onChange( callback ) {

		this._onChangeCallback = callback;

		return this;

	}

	_onChangeCallback() {}

}

Euler.prototype.isEuler = true;

Euler.DefaultOrder = 'XYZ';
Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];



;// CONCATENATED MODULE: ./node_modules/three/src/core/Layers.js
class Layers {

	constructor() {

		this.mask = 1 | 0;

	}

	set( channel ) {

		this.mask = ( 1 << channel | 0 ) >>> 0;

	}

	enable( channel ) {

		this.mask |= 1 << channel | 0;

	}

	enableAll() {

		this.mask = 0xffffffff | 0;

	}

	toggle( channel ) {

		this.mask ^= 1 << channel | 0;

	}

	disable( channel ) {

		this.mask &= ~ ( 1 << channel | 0 );

	}

	disableAll() {

		this.mask = 0;

	}

	test( layers ) {

		return ( this.mask & layers.mask ) !== 0;

	}

	isEnabled( channel ) {

		return ( this.mask & ( 1 << channel | 0 ) ) !== 0;

	}

}




;// CONCATENATED MODULE: ./node_modules/three/src/math/Matrix3.js
class Matrix3 {

	constructor() {

		this.elements = [

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	set( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

		const te = this.elements;

		te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
		te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
		te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;

		return this;

	}

	identity() {

		this.set(

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		);

		return this;

	}

	copy( m ) {

		const te = this.elements;
		const me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
		te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
		te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

		return this;

	}

	extractBasis( xAxis, yAxis, zAxis ) {

		xAxis.setFromMatrix3Column( this, 0 );
		yAxis.setFromMatrix3Column( this, 1 );
		zAxis.setFromMatrix3Column( this, 2 );

		return this;

	}

	setFromMatrix4( m ) {

		const me = m.elements;

		this.set(

			me[ 0 ], me[ 4 ], me[ 8 ],
			me[ 1 ], me[ 5 ], me[ 9 ],
			me[ 2 ], me[ 6 ], me[ 10 ]

		);

		return this;

	}

	multiply( m ) {

		return this.multiplyMatrices( this, m );

	}

	premultiply( m ) {

		return this.multiplyMatrices( m, this );

	}

	multiplyMatrices( a, b ) {

		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;

		const a11 = ae[ 0 ], a12 = ae[ 3 ], a13 = ae[ 6 ];
		const a21 = ae[ 1 ], a22 = ae[ 4 ], a23 = ae[ 7 ];
		const a31 = ae[ 2 ], a32 = ae[ 5 ], a33 = ae[ 8 ];

		const b11 = be[ 0 ], b12 = be[ 3 ], b13 = be[ 6 ];
		const b21 = be[ 1 ], b22 = be[ 4 ], b23 = be[ 7 ];
		const b31 = be[ 2 ], b32 = be[ 5 ], b33 = be[ 8 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
		te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
		te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
		te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
		te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
		te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
		te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

		return this;

	}

	multiplyScalar( s ) {

		const te = this.elements;

		te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
		te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
		te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

		return this;

	}

	determinant() {

		const te = this.elements;

		const a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
			d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
			g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

	}

	invert() {

		const te = this.elements,

			n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ],
			n12 = te[ 3 ], n22 = te[ 4 ], n32 = te[ 5 ],
			n13 = te[ 6 ], n23 = te[ 7 ], n33 = te[ 8 ],

			t11 = n33 * n22 - n32 * n23,
			t12 = n32 * n13 - n33 * n12,
			t13 = n23 * n12 - n22 * n13,

			det = n11 * t11 + n21 * t12 + n31 * t13;

		if ( det === 0 ) return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0 );

		const detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
		te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;

		te[ 3 ] = t12 * detInv;
		te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
		te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;

		te[ 6 ] = t13 * detInv;
		te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
		te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;

		return this;

	}

	transpose() {

		let tmp;
		const m = this.elements;

		tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
		tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

		return this;

	}

	getNormalMatrix( matrix4 ) {

		return this.setFromMatrix4( matrix4 ).invert().transpose();

	}

	transposeIntoArray( r ) {

		const m = this.elements;

		r[ 0 ] = m[ 0 ];
		r[ 1 ] = m[ 3 ];
		r[ 2 ] = m[ 6 ];
		r[ 3 ] = m[ 1 ];
		r[ 4 ] = m[ 4 ];
		r[ 5 ] = m[ 7 ];
		r[ 6 ] = m[ 2 ];
		r[ 7 ] = m[ 5 ];
		r[ 8 ] = m[ 8 ];

		return this;

	}

	setUvTransform( tx, ty, sx, sy, rotation, cx, cy ) {

		const c = Math.cos( rotation );
		const s = Math.sin( rotation );

		this.set(
			sx * c, sx * s, - sx * ( c * cx + s * cy ) + cx + tx,
			- sy * s, sy * c, - sy * ( - s * cx + c * cy ) + cy + ty,
			0, 0, 1
		);

		return this;

	}

	scale( sx, sy ) {

		const te = this.elements;

		te[ 0 ] *= sx; te[ 3 ] *= sx; te[ 6 ] *= sx;
		te[ 1 ] *= sy; te[ 4 ] *= sy; te[ 7 ] *= sy;

		return this;

	}

	rotate( theta ) {

		const c = Math.cos( theta );
		const s = Math.sin( theta );

		const te = this.elements;

		const a11 = te[ 0 ], a12 = te[ 3 ], a13 = te[ 6 ];
		const a21 = te[ 1 ], a22 = te[ 4 ], a23 = te[ 7 ];

		te[ 0 ] = c * a11 + s * a21;
		te[ 3 ] = c * a12 + s * a22;
		te[ 6 ] = c * a13 + s * a23;

		te[ 1 ] = - s * a11 + c * a21;
		te[ 4 ] = - s * a12 + c * a22;
		te[ 7 ] = - s * a13 + c * a23;

		return this;

	}

	translate( tx, ty ) {

		const te = this.elements;

		te[ 0 ] += tx * te[ 2 ]; te[ 3 ] += tx * te[ 5 ]; te[ 6 ] += tx * te[ 8 ];
		te[ 1 ] += ty * te[ 2 ]; te[ 4 ] += ty * te[ 5 ]; te[ 7 ] += ty * te[ 8 ];

		return this;

	}

	equals( matrix ) {

		const te = this.elements;
		const me = matrix.elements;

		for ( let i = 0; i < 9; i ++ ) {

			if ( te[ i ] !== me[ i ] ) return false;

		}

		return true;

	}

	fromArray( array, offset = 0 ) {

		for ( let i = 0; i < 9; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	}

	toArray( array = [], offset = 0 ) {

		const te = this.elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];

		array[ offset + 3 ] = te[ 3 ];
		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];

		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];
		array[ offset + 8 ] = te[ 8 ];

		return array;

	}

	clone() {

		return new this.constructor().fromArray( this.elements );

	}

}

Matrix3.prototype.isMatrix3 = true;



;// CONCATENATED MODULE: ./node_modules/three/src/core/Object3D.js









let _object3DId = 0;

const Object3D_v1 = /*@__PURE__*/ new Vector3();
const _q1 = /*@__PURE__*/ new Quaternion();
const Object3D_m1 = /*@__PURE__*/ new Matrix4();
const _target = /*@__PURE__*/ new Vector3();

const _position = /*@__PURE__*/ new Vector3();
const _scale = /*@__PURE__*/ new Vector3();
const Object3D_quaternion = /*@__PURE__*/ new Quaternion();

const _xAxis = /*@__PURE__*/ new Vector3( 1, 0, 0 );
const _yAxis = /*@__PURE__*/ new Vector3( 0, 1, 0 );
const _zAxis = /*@__PURE__*/ new Vector3( 0, 0, 1 );

const _addedEvent = { type: 'added' };
const _removedEvent = { type: 'removed' };

class Object3D extends EventDispatcher {

	constructor() {

		super();

		Object.defineProperty( this, 'id', { value: _object3DId ++ } );

		this.uuid = generateUUID();

		this.name = '';
		this.type = 'Object3D';

		this.parent = null;
		this.children = [];

		this.up = Object3D.DefaultUp.clone();

		const position = new Vector3();
		const rotation = new Euler();
		const quaternion = new Quaternion();
		const scale = new Vector3( 1, 1, 1 );

		function onRotationChange() {

			quaternion.setFromEuler( rotation, false );

		}

		function onQuaternionChange() {

			rotation.setFromQuaternion( quaternion, undefined, false );

		}

		rotation._onChange( onRotationChange );
		quaternion._onChange( onQuaternionChange );

		Object.defineProperties( this, {
			position: {
				configurable: true,
				enumerable: true,
				value: position
			},
			rotation: {
				configurable: true,
				enumerable: true,
				value: rotation
			},
			quaternion: {
				configurable: true,
				enumerable: true,
				value: quaternion
			},
			scale: {
				configurable: true,
				enumerable: true,
				value: scale
			},
			modelViewMatrix: {
				value: new Matrix4()
			},
			normalMatrix: {
				value: new Matrix3()
			}
		} );

		this.matrix = new Matrix4();
		this.matrixWorld = new Matrix4();

		this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
		this.matrixWorldNeedsUpdate = false;

		this.layers = new Layers();
		this.visible = true;

		this.castShadow = false;
		this.receiveShadow = false;

		this.frustumCulled = true;
		this.renderOrder = 0;

		this.animations = [];

		this.userData = {};

	}

	onBeforeRender( /* renderer, scene, camera, geometry, material, group */ ) {}

	onAfterRender( /* renderer, scene, camera, geometry, material, group */ ) {}

	applyMatrix4( matrix ) {

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		this.matrix.premultiply( matrix );

		this.matrix.decompose( this.position, this.quaternion, this.scale );

	}

	applyQuaternion( q ) {

		this.quaternion.premultiply( q );

		return this;

	}

	setRotationFromAxisAngle( axis, angle ) {

		// assumes axis is normalized

		this.quaternion.setFromAxisAngle( axis, angle );

	}

	setRotationFromEuler( euler ) {

		this.quaternion.setFromEuler( euler, true );

	}

	setRotationFromMatrix( m ) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		this.quaternion.setFromRotationMatrix( m );

	}

	setRotationFromQuaternion( q ) {

		// assumes q is normalized

		this.quaternion.copy( q );

	}

	rotateOnAxis( axis, angle ) {

		// rotate object on axis in object space
		// axis is assumed to be normalized

		_q1.setFromAxisAngle( axis, angle );

		this.quaternion.multiply( _q1 );

		return this;

	}

	rotateOnWorldAxis( axis, angle ) {

		// rotate object on axis in world space
		// axis is assumed to be normalized
		// method assumes no rotated parent

		_q1.setFromAxisAngle( axis, angle );

		this.quaternion.premultiply( _q1 );

		return this;

	}

	rotateX( angle ) {

		return this.rotateOnAxis( _xAxis, angle );

	}

	rotateY( angle ) {

		return this.rotateOnAxis( _yAxis, angle );

	}

	rotateZ( angle ) {

		return this.rotateOnAxis( _zAxis, angle );

	}

	translateOnAxis( axis, distance ) {

		// translate object by distance along axis in object space
		// axis is assumed to be normalized

		Object3D_v1.copy( axis ).applyQuaternion( this.quaternion );

		this.position.add( Object3D_v1.multiplyScalar( distance ) );

		return this;

	}

	translateX( distance ) {

		return this.translateOnAxis( _xAxis, distance );

	}

	translateY( distance ) {

		return this.translateOnAxis( _yAxis, distance );

	}

	translateZ( distance ) {

		return this.translateOnAxis( _zAxis, distance );

	}

	localToWorld( vector ) {

		return vector.applyMatrix4( this.matrixWorld );

	}

	worldToLocal( vector ) {

		return vector.applyMatrix4( Object3D_m1.copy( this.matrixWorld ).invert() );

	}

	lookAt( x, y, z ) {

		// This method does not support objects having non-uniformly-scaled parent(s)

		if ( x.isVector3 ) {

			_target.copy( x );

		} else {

			_target.set( x, y, z );

		}

		const parent = this.parent;

		this.updateWorldMatrix( true, false );

		_position.setFromMatrixPosition( this.matrixWorld );

		if ( this.isCamera || this.isLight ) {

			Object3D_m1.lookAt( _position, _target, this.up );

		} else {

			Object3D_m1.lookAt( _target, _position, this.up );

		}

		this.quaternion.setFromRotationMatrix( Object3D_m1 );

		if ( parent ) {

			Object3D_m1.extractRotation( parent.matrixWorld );
			_q1.setFromRotationMatrix( Object3D_m1 );
			this.quaternion.premultiply( _q1.invert() );

		}

	}

	add( object ) {

		if ( arguments.length > 1 ) {

			for ( let i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		if ( object === this ) {

			console.error( 'THREE.Object3D.add: object can\'t be added as a child of itself.', object );
			return this;

		}

		if ( object && object.isObject3D ) {

			if ( object.parent !== null ) {

				object.parent.remove( object );

			}

			object.parent = this;
			this.children.push( object );

			object.dispatchEvent( _addedEvent );

		} else {

			console.error( 'THREE.Object3D.add: object not an instance of THREE.Object3D.', object );

		}

		return this;

	}

	remove( object ) {

		if ( arguments.length > 1 ) {

			for ( let i = 0; i < arguments.length; i ++ ) {

				this.remove( arguments[ i ] );

			}

			return this;

		}

		const index = this.children.indexOf( object );

		if ( index !== - 1 ) {

			object.parent = null;
			this.children.splice( index, 1 );

			object.dispatchEvent( _removedEvent );

		}

		return this;

	}

	removeFromParent() {

		const parent = this.parent;

		if ( parent !== null ) {

			parent.remove( this );

		}

		return this;

	}

	clear() {

		for ( let i = 0; i < this.children.length; i ++ ) {

			const object = this.children[ i ];

			object.parent = null;

			object.dispatchEvent( _removedEvent );

		}

		this.children.length = 0;

		return this;


	}

	attach( object ) {

		// adds object as a child of this, while maintaining the object's world transform

		// Note: This method does not support scene graphs having non-uniformly-scaled nodes(s)

		this.updateWorldMatrix( true, false );

		Object3D_m1.copy( this.matrixWorld ).invert();

		if ( object.parent !== null ) {

			object.parent.updateWorldMatrix( true, false );

			Object3D_m1.multiply( object.parent.matrixWorld );

		}

		object.applyMatrix4( Object3D_m1 );

		this.add( object );

		object.updateWorldMatrix( false, true );

		return this;

	}

	getObjectById( id ) {

		return this.getObjectByProperty( 'id', id );

	}

	getObjectByName( name ) {

		return this.getObjectByProperty( 'name', name );

	}

	getObjectByProperty( name, value ) {

		if ( this[ name ] === value ) return this;

		for ( let i = 0, l = this.children.length; i < l; i ++ ) {

			const child = this.children[ i ];
			const object = child.getObjectByProperty( name, value );

			if ( object !== undefined ) {

				return object;

			}

		}

		return undefined;

	}

	getWorldPosition( target ) {

		this.updateWorldMatrix( true, false );

		return target.setFromMatrixPosition( this.matrixWorld );

	}

	getWorldQuaternion( target ) {

		this.updateWorldMatrix( true, false );

		this.matrixWorld.decompose( _position, target, _scale );

		return target;

	}

	getWorldScale( target ) {

		this.updateWorldMatrix( true, false );

		this.matrixWorld.decompose( _position, Object3D_quaternion, target );

		return target;

	}

	getWorldDirection( target ) {

		this.updateWorldMatrix( true, false );

		const e = this.matrixWorld.elements;

		return target.set( e[ 8 ], e[ 9 ], e[ 10 ] ).normalize();

	}

	raycast( /* raycaster, intersects */ ) {}

	traverse( callback ) {

		callback( this );

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].traverse( callback );

		}

	}

	traverseVisible( callback ) {

		if ( this.visible === false ) return;

		callback( this );

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].traverseVisible( callback );

		}

	}

	traverseAncestors( callback ) {

		const parent = this.parent;

		if ( parent !== null ) {

			callback( parent );

			parent.traverseAncestors( callback );

		}

	}

	updateMatrix() {

		this.matrix.compose( this.position, this.quaternion, this.scale );

		this.matrixWorldNeedsUpdate = true;

	}

	updateMatrixWorld( force ) {

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		if ( this.matrixWorldNeedsUpdate || force ) {

			if ( this.parent === null ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].updateMatrixWorld( force );

		}

	}

	updateWorldMatrix( updateParents, updateChildren ) {

		const parent = this.parent;

		if ( updateParents === true && parent !== null ) {

			parent.updateWorldMatrix( true, false );

		}

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		if ( this.parent === null ) {

			this.matrixWorld.copy( this.matrix );

		} else {

			this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

		}

		// update children

		if ( updateChildren === true ) {

			const children = this.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].updateWorldMatrix( false, true );

			}

		}

	}

	toJSON( meta ) {

		// meta is a string when called from JSON.stringify
		const isRootObject = ( meta === undefined || typeof meta === 'string' );

		const output = {};

		// meta is a hash used to collect geometries, materials.
		// not providing it implies that this is the root object
		// being serialized.
		if ( isRootObject ) {

			// initialize meta obj
			meta = {
				geometries: {},
				materials: {},
				textures: {},
				images: {},
				shapes: {},
				skeletons: {},
				animations: {}
			};

			output.metadata = {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			};

		}

		// standard Object3D serialization

		const object = {};

		object.uuid = this.uuid;
		object.type = this.type;

		if ( this.name !== '' ) object.name = this.name;
		if ( this.castShadow === true ) object.castShadow = true;
		if ( this.receiveShadow === true ) object.receiveShadow = true;
		if ( this.visible === false ) object.visible = false;
		if ( this.frustumCulled === false ) object.frustumCulled = false;
		if ( this.renderOrder !== 0 ) object.renderOrder = this.renderOrder;
		if ( JSON.stringify( this.userData ) !== '{}' ) object.userData = this.userData;

		object.layers = this.layers.mask;
		object.matrix = this.matrix.toArray();

		if ( this.matrixAutoUpdate === false ) object.matrixAutoUpdate = false;

		// object specific properties

		if ( this.isInstancedMesh ) {

			object.type = 'InstancedMesh';
			object.count = this.count;
			object.instanceMatrix = this.instanceMatrix.toJSON();
			if ( this.instanceColor !== null ) object.instanceColor = this.instanceColor.toJSON();

		}

		//

		function serialize( library, element ) {

			if ( library[ element.uuid ] === undefined ) {

				library[ element.uuid ] = element.toJSON( meta );

			}

			return element.uuid;

		}

		if ( this.isScene ) {

			if ( this.background ) {

				if ( this.background.isColor ) {

					object.background = this.background.toJSON();

				} else if ( this.background.isTexture ) {

					object.background = this.background.toJSON( meta ).uuid;

				}

			}

			if ( this.environment && this.environment.isTexture ) {

				object.environment = this.environment.toJSON( meta ).uuid;

			}

		} else if ( this.isMesh || this.isLine || this.isPoints ) {

			object.geometry = serialize( meta.geometries, this.geometry );

			const parameters = this.geometry.parameters;

			if ( parameters !== undefined && parameters.shapes !== undefined ) {

				const shapes = parameters.shapes;

				if ( Array.isArray( shapes ) ) {

					for ( let i = 0, l = shapes.length; i < l; i ++ ) {

						const shape = shapes[ i ];

						serialize( meta.shapes, shape );

					}

				} else {

					serialize( meta.shapes, shapes );

				}

			}

		}

		if ( this.isSkinnedMesh ) {

			object.bindMode = this.bindMode;
			object.bindMatrix = this.bindMatrix.toArray();

			if ( this.skeleton !== undefined ) {

				serialize( meta.skeletons, this.skeleton );

				object.skeleton = this.skeleton.uuid;

			}

		}

		if ( this.material !== undefined ) {

			if ( Array.isArray( this.material ) ) {

				const uuids = [];

				for ( let i = 0, l = this.material.length; i < l; i ++ ) {

					uuids.push( serialize( meta.materials, this.material[ i ] ) );

				}

				object.material = uuids;

			} else {

				object.material = serialize( meta.materials, this.material );

			}

		}

		//

		if ( this.children.length > 0 ) {

			object.children = [];

			for ( let i = 0; i < this.children.length; i ++ ) {

				object.children.push( this.children[ i ].toJSON( meta ).object );

			}

		}

		//

		if ( this.animations.length > 0 ) {

			object.animations = [];

			for ( let i = 0; i < this.animations.length; i ++ ) {

				const animation = this.animations[ i ];

				object.animations.push( serialize( meta.animations, animation ) );

			}

		}

		if ( isRootObject ) {

			const geometries = extractFromCache( meta.geometries );
			const materials = extractFromCache( meta.materials );
			const textures = extractFromCache( meta.textures );
			const images = extractFromCache( meta.images );
			const shapes = extractFromCache( meta.shapes );
			const skeletons = extractFromCache( meta.skeletons );
			const animations = extractFromCache( meta.animations );

			if ( geometries.length > 0 ) output.geometries = geometries;
			if ( materials.length > 0 ) output.materials = materials;
			if ( textures.length > 0 ) output.textures = textures;
			if ( images.length > 0 ) output.images = images;
			if ( shapes.length > 0 ) output.shapes = shapes;
			if ( skeletons.length > 0 ) output.skeletons = skeletons;
			if ( animations.length > 0 ) output.animations = animations;

		}

		output.object = object;

		return output;

		// extract data from the cache hash
		// remove metadata on each item
		// and return as array
		function extractFromCache( cache ) {

			const values = [];
			for ( const key in cache ) {

				const data = cache[ key ];
				delete data.metadata;
				values.push( data );

			}

			return values;

		}

	}

	clone( recursive ) {

		return new this.constructor().copy( this, recursive );

	}

	copy( source, recursive = true ) {

		this.name = source.name;

		this.up.copy( source.up );

		this.position.copy( source.position );
		this.rotation.order = source.rotation.order;
		this.quaternion.copy( source.quaternion );
		this.scale.copy( source.scale );

		this.matrix.copy( source.matrix );
		this.matrixWorld.copy( source.matrixWorld );

		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

		this.layers.mask = source.layers.mask;
		this.visible = source.visible;

		this.castShadow = source.castShadow;
		this.receiveShadow = source.receiveShadow;

		this.frustumCulled = source.frustumCulled;
		this.renderOrder = source.renderOrder;

		this.userData = JSON.parse( JSON.stringify( source.userData ) );

		if ( recursive === true ) {

			for ( let i = 0; i < source.children.length; i ++ ) {

				const child = source.children[ i ];
				this.add( child.clone() );

			}

		}

		return this;

	}

}

Object3D.DefaultUp = new Vector3( 0, 1, 0 );
Object3D.DefaultMatrixAutoUpdate = true;

Object3D.prototype.isObject3D = true;



;// CONCATENATED MODULE: ./node_modules/three/src/cameras/Camera.js



class Camera extends Object3D {

	constructor() {

		super();

		this.type = 'Camera';

		this.matrixWorldInverse = new Matrix4();

		this.projectionMatrix = new Matrix4();
		this.projectionMatrixInverse = new Matrix4();

	}

	copy( source, recursive ) {

		super.copy( source, recursive );

		this.matrixWorldInverse.copy( source.matrixWorldInverse );

		this.projectionMatrix.copy( source.projectionMatrix );
		this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

		return this;

	}

	getWorldDirection( target ) {

		this.updateWorldMatrix( true, false );

		const e = this.matrixWorld.elements;

		return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

	}

	updateMatrixWorld( force ) {

		super.updateMatrixWorld( force );

		this.matrixWorldInverse.copy( this.matrixWorld ).invert();

	}

	updateWorldMatrix( updateParents, updateChildren ) {

		super.updateWorldMatrix( updateParents, updateChildren );

		this.matrixWorldInverse.copy( this.matrixWorld ).invert();

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

Camera.prototype.isCamera = true;



;// CONCATENATED MODULE: ./node_modules/three/src/cameras/OrthographicCamera.js


class OrthographicCamera extends Camera {

	constructor( left = - 1, right = 1, top = 1, bottom = - 1, near = 0.1, far = 2000 ) {

		super();

		this.type = 'OrthographicCamera';

		this.zoom = 1;
		this.view = null;

		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;

		this.near = near;
		this.far = far;

		this.updateProjectionMatrix();

	}

	copy( source, recursive ) {

		super.copy( source, recursive );

		this.left = source.left;
		this.right = source.right;
		this.top = source.top;
		this.bottom = source.bottom;
		this.near = source.near;
		this.far = source.far;

		this.zoom = source.zoom;
		this.view = source.view === null ? null : Object.assign( {}, source.view );

		return this;

	}

	setViewOffset( fullWidth, fullHeight, x, y, width, height ) {

		if ( this.view === null ) {

			this.view = {
				enabled: true,
				fullWidth: 1,
				fullHeight: 1,
				offsetX: 0,
				offsetY: 0,
				width: 1,
				height: 1
			};

		}

		this.view.enabled = true;
		this.view.fullWidth = fullWidth;
		this.view.fullHeight = fullHeight;
		this.view.offsetX = x;
		this.view.offsetY = y;
		this.view.width = width;
		this.view.height = height;

		this.updateProjectionMatrix();

	}

	clearViewOffset() {

		if ( this.view !== null ) {

			this.view.enabled = false;

		}

		this.updateProjectionMatrix();

	}

	updateProjectionMatrix() {

		const dx = ( this.right - this.left ) / ( 2 * this.zoom );
		const dy = ( this.top - this.bottom ) / ( 2 * this.zoom );
		const cx = ( this.right + this.left ) / 2;
		const cy = ( this.top + this.bottom ) / 2;

		let left = cx - dx;
		let right = cx + dx;
		let top = cy + dy;
		let bottom = cy - dy;

		if ( this.view !== null && this.view.enabled ) {

			const scaleW = ( this.right - this.left ) / this.view.fullWidth / this.zoom;
			const scaleH = ( this.top - this.bottom ) / this.view.fullHeight / this.zoom;

			left += scaleW * this.view.offsetX;
			right = left + scaleW * this.view.width;
			top -= scaleH * this.view.offsetY;
			bottom = top - scaleH * this.view.height;

		}

		this.projectionMatrix.makeOrthographic( left, right, top, bottom, this.near, this.far );

		this.projectionMatrixInverse.copy( this.projectionMatrix ).invert();

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		data.object.zoom = this.zoom;
		data.object.left = this.left;
		data.object.right = this.right;
		data.object.top = this.top;
		data.object.bottom = this.bottom;
		data.object.near = this.near;
		data.object.far = this.far;

		if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

		return data;

	}

}

OrthographicCamera.prototype.isOrthographicCamera = true;



;// CONCATENATED MODULE: ./src/core/camera.js





Bootstrap.registerPlugin("camera", {
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
    const o = this.options;
    const old = three.camera;

    if (!three.camera || event.changes.type || event.changes.klass) {
      const klass =
        o.klass ||
        {
          perspective: external_THREE_.PerspectiveCamera,
          orthographic: OrthographicCamera,
        }[o.type] ||
        Camera;

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


Bootstrap.registerPlugin("fallback", {
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
    let cnv, gl;
    try {
      cnv = document.createElement("canvas");
      gl = cnv.getContext("webgl") || cnv.getContext("experimental-webgl");
      if (!gl || this.options.force) {
        throw "WebGL unavailable.";
      }
      three.fallback = false;
    } catch (e) {
      const message = this.options.message;
      const begin = this.options.begin;
      const end = this.options.end;
      const fill = this.options.fill;

      const div = document.createElement("div");
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


Bootstrap.registerPlugin("fill", {
  defaults: {
    block: true,
    body: true,
    layout: true,
  },

  install: function (three) {
    function is(element) {
      const h = element.style.height;
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
      const style = window.getComputedStyle(three.element);
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


Bootstrap.registerPlugin("loop", {
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

    const trigger = three.trigger.bind(three);
    const loop = function () {
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


Bootstrap.registerPlugin("render", {
  listen: ["render"],

  render: function (event, three) {
    if (three.scene && three.camera) {
      three.renderer.render(three.scene, three.camera);
    }
  },
});

;// CONCATENATED MODULE: ./src/core/renderer.js



Bootstrap.registerPlugin("renderer", {
  defaults: {
    klass: external_THREE_.WebGL1Renderer,
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
    const renderer = (three.renderer = new this.options.klass(
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
    const renderer = three.renderer;
    const el = renderer.domElement;

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



Bootstrap.registerPlugin("scene", {
  install: function (three) {
    three.scene = new external_THREE_.Scene();
  },

  uninstall: function (three) {
    delete three.scene;
  },
});

;// CONCATENATED MODULE: ./src/core/size.js


Bootstrap.registerPlugin("size", {
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
    const options = this.options;
    const element = three.element;
    const renderer = three.renderer;

    let w,
      h,
      ew,
      eh,
      rw,
      rh,
      aspect,
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
    rw = Math.round(
      Math.min(w * ratio * options.scale, options.maxRenderWidth)
    );
    rh = Math.round(
      Math.min(h * ratio * options.scale, options.maxRenderHeight)
    );

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
    const style = renderer.domElement.style;
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


Bootstrap.registerPlugin("time", {
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
    const speed = this.options.speed;
    const timeout = this.options.timeout;

    const api = three.Time;
    const now = (api.now = this.now());
    const last = this.last;
    let time = this.time;
    let clock = this.clock;

    if (last) {
      let delta = (api.delta = now - last);
      const average = api.average || delta;

      if (delta > timeout) {
        delta = 0;
      }

      const step = delta * speed;

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


Bootstrap.registerPlugin("warmup", {
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



Bootstrap.registerPlugin("controls", {
  listen: ["update", "resize", "camera", "this.change"],

  defaults: {
    klass: null,
    parameters: {},
  },

  install: function (three) {
    if (!this.options.klass) throw "Must provide class for `controls.klass`";

    three.controls = null;

    this._camera = three.camera || new external_THREE_.PerspectiveCamera();
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
    const delta = (three.Time && three.Time.delta) || 1 / 60;
    const vr = three.VR && three.VR.state;

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


Bootstrap.registerPlugin("cursor", {
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
    const delta = (three.Time && three.Time.delta) || 1 / 60;

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
    const auto = three.controls ? "move" : "";
    cursor = cursor || this.options.cursor || auto;
    if (this.hide) cursor = "none";
    if (this.cursor != cursor) {
      this.element.style.cursor = cursor;
    }
  },
});

;// CONCATENATED MODULE: ./src/extra/fullscreen.js


Bootstrap.registerPlugin("fullscreen", {
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

    const changeHandler = function () {
      const active =
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
    const canvas = three.canvas;
    const options =
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



Bootstrap.registerPlugin("stats", {
  listen: ["pre", "post"],

  install: function (three) {
    const stats = (this.stats = new (stats_min_default())());
    const style = stats.domElement.style;

    style.position = "absolute";
    style.top = style.left = 0;
    three.element.appendChild(stats.domElement);

    three.stats = stats;
  },

  uninstall: function (three) {
    this.stats.domElement.remove()
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


Bootstrap.registerPlugin("ui", {
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
    let url =
      "//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css";
    if (location.href.match(/^file:\/\//)) url = "http://" + url;

    const buttons = [];

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
    const ui = (this.ui = document.createElement("div"));
    ui.innerHTML = this.markup(three, this.options.theme, this.options.style);
    document.body.appendChild(ui);

    const fullscreen = (this.ui.fullscreen =
      ui.querySelector("button.fullscreen"));
    if (fullscreen) {
      three.bind([fullscreen, "click:goFullscreen"], this);
    }

    const vr = (this.ui.vr = ui.querySelector("button.vr"));
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

;// CONCATENATED MODULE: ./src/renderers/VRRenderer.js
/**
 * VRRenderer
 *
 * @author wwwtyro https://github.com/wwwtyro
 * @author unconed https://github.com/unconed
 */



class VRRenderer {
  constructor(renderer, hmd) {
    this.renderer = renderer;

    this.right = new Vector3();
    this.cameraLeft = new external_THREE_.PerspectiveCamera();
    this.cameraRight = new external_THREE_.PerspectiveCamera();

    const et = hmd.getEyeTranslation("left");
    this.halfIPD = new Vector3(et.x, et.y, et.z).length();
    this.fovLeft = hmd.getRecommendedEyeFieldOfView("left");
    this.fovRight = hmd.getRecommendedEyeFieldOfView("right");
  }

  FovToNDCScaleOffset(fov) {
    const pxscale = 2.0 / (fov.leftTan + fov.rightTan);
    const pxoffset = (fov.leftTan - fov.rightTan) * pxscale * 0.5;
    const pyscale = 2.0 / (fov.upTan + fov.downTan);
    const pyoffset = (fov.upTan - fov.downTan) * pyscale * 0.5;
    return {
      scale: [pxscale, pyscale],
      offset: [pxoffset, pyoffset],
    };
  }

  FovPortToProjection(
    matrix,
    fov,
    rightHanded /* = true */,
    zNear /* = 0.01 */,
    zFar /* = 10000.0 */
  ) {
    rightHanded = rightHanded === undefined ? true : rightHanded;
    zNear = zNear === undefined ? 0.01 : zNear;
    zFar = zFar === undefined ? 10000.0 : zFar;
    const handednessScale = rightHanded ? -1.0 : 1.0;
    const m = matrix.elements;
    const scaleAndOffset = this.FovToNDCScaleOffset(fov);
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
  }

  FovToProjection(
    matrix,
    fov,
    rightHanded /* = true */,
    zNear /* = 0.01 */,
    zFar /* = 10000.0 */
  ) {
    const fovPort = {
      upTan: Math.tan((fov.upDegrees * Math.PI) / 180.0),
      downTan: Math.tan((fov.downDegrees * Math.PI) / 180.0),
      leftTan: Math.tan((fov.leftDegrees * Math.PI) / 180.0),
      rightTan: Math.tan((fov.rightDegrees * Math.PI) / 180.0),
    };
    return this.FovPortToProjection(matrix, fovPort, rightHanded, zNear, zFar);
  }

  render(scene, camera) {
    this.FovToProjection(
      this.cameraLeft.projectionMatrix,
      this.fovLeft,
      true,
      camera.near,
      camera.far
    );
    this.FovToProjection(
      this.cameraRight.projectionMatrix,
      this.fovRight,
      true,
      camera.near,
      camera.far
    );

    this.right.set(this.halfIPD, 0, 0);
    this.right.applyQuaternion(camera.quaternion);

    this.cameraLeft.position.copy(camera.position).sub(this.right);
    this.cameraRight.position.copy(camera.position).add(this.right);

    this.cameraLeft.quaternion.copy(camera.quaternion);
    this.cameraRight.quaternion.copy(camera.quaternion);

    const dpr = this.renderer.devicePixelRatio || 1;
    const width = this.renderer.domElement.width / 2 / dpr;
    const height = this.renderer.domElement.height / dpr;

    this.renderer.enableScissorTest(true);

    this.renderer.setViewport(0, 0, width, height);
    this.renderer.setScissor(0, 0, width, height);
    this.renderer.render(scene, this.cameraLeft);

    this.renderer.setViewport(width, 0, width, height);
    this.renderer.setScissor(width, 0, width, height);
    this.renderer.render(scene, this.cameraRight);
  }
}

;// CONCATENATED MODULE: ./src/extra/vr.js



/*
VR sensor / HMD hookup.
*/
Bootstrap.registerPlugin("vr", {
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
    const ipd = 0.03;

    // Symmetric eye FOVs (Cardboard style)
    const getEyeTranslation = function (key) {
      return { left: { x: -ipd, y: 0, z: 0 }, right: { x: ipd, y: 0, z: 0 } }[
        key
      ];
    };
    const getRecommendedEyeFieldOfView = function (key) {
      const camera = three.camera;
      const aspect = (camera && camera.aspect) || 16 / 9;
      const fov2 = (fov || (camera && camera.fov) || def) / 2;
      const fovX =
        (Math.atan((Math.tan((fov2 * Math.PI) / 180) * aspect) / 2) * 180) /
        Math.PI;
      const fovY = fov2;

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
    // Will be replaced with orbit controls or device orientation controls by VRControls
    const getState = function () {
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
    const callback = function (devs) {
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
    let hmd, sensor;

    const HMD = window.HMDVRDevice || function () {};
    const SENSOR = window.PositionSensorVRDevice || function () {};

    // Export list of devices
    vrdevs = three.VR.devices = vrdevs || three.VR.devices;

    // Get HMD device
    const deviceId = this.options.device;
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
    if (!VRRenderer) console.log("VRRenderer not found");
    const klass = VRRenderer || function () {};

    this.renderer = new klass(three.renderer, hmd);
    this.hmd = hmd;
    this.sensor = sensor;

    three.VR.renderer = this.renderer;
    three.VR.hmd = hmd;
    three.VR.sensor = sensor;

    console.log("VRRenderer", hmd.deviceName);
  },

  change: function (event, three) {
    if (event.changes.device) {
      this.callback(null, three);
    }
    this.pre(event, three);
  },

  pre: function (event, three) {
    const last = this.active;

    // Global active flag
    const active = (this.active = this.renderer && this.options.mode != "2d");
    three.VR.active = active;

    // Load sensor state
    if (active && this.sensor) {
      const state = this.sensor.getState();
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
      const renderer = this.active ? this.renderer : three.renderer;

      if (this.last != renderer) {
        if (renderer == three.renderer) {
          // Cleanup leftover renderer state when swapping back to normal
          const dpr = renderer.getPixelRatio();
          const width = renderer.domElement.width / dpr;
          const height = renderer.domElement.height / dpr;
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







;// CONCATENATED MODULE: ./src/renderers/MultiRenderer.js
/**
 * Allows a stack of renderers to be treated as a single renderer.
 * @author Gheric Speiginer
 */


class MultiRenderer {
  constructor(parameters) {
    console.log("MultiRenderer", external_THREE_.REVISION);

    this.domElement = document.createElement("div");
    this.domElement.style.position = "relative";

    this.renderers = [];
    this._renderSizeSet = false;

    const rendererClasses = parameters.renderers || [];
    const rendererParameters = parameters.parameters || [];

    // elements are stacked back-to-front
    for (let i = 0; i < rendererClasses.length; i++) {
      const renderer = new rendererClasses[i](rendererParameters[i]);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0px";
      renderer.domElement.style.left = "0px";
      this.domElement.appendChild(renderer.domElement);
      this.renderers.push(renderer);
    }
  }

  setSize(w, h) {
    this.domElement.style.width = w + "px";
    this.domElement.style.height = h + "px";

    for (let i = 0; i < this.renderers.length; i++) {
      const renderer = this.renderers[i];
      const el = renderer.domElement;

      if (!this._renderSizeSet || (el && el.tagName !== "CANVAS")) {
        renderer.setSize(w, h);
      }

      el.style.width = w + "px";
      el.style.height = h + "px";
    }
  }

  setRenderSize(rw, rh) {
    this._renderSizeSet = true;

    for (let i = 0; i < this.renderers.length; i++) {
      const renderer = this.renderers[i];
      const el = renderer.domElement;

      if (el && el.tagName === "CANVAS") {
        renderer.setSize(rw, rh, false);
      }
    }
  }

  render(scene, camera) {
    for (let i = 0; i < this.renderers.length; i++) {
      this.renderers[i].render(scene, camera);
    }
  }
}

;// CONCATENATED MODULE: ./src/renderers/index.js



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



class VRControls {
  constructor(object, onError) {
    this.object = object;
    this.standingMatrix = new Matrix4();
    this.frameData = null;

    if ("VRFrameData" in window) {
      // eslint-disable-next-line no-undef
      this.frameData = new VRFrameData();
    }

    function gotVRDisplays(displays) {
      this.vrDisplays = displays;

      if (displays.length > 0) {
        this.vrDisplay = displays[0];
      } else {
        if (onError) onError("VR input not available.");
      }
    }

    if (navigator.getVRDisplays) {
      navigator
        .getVRDisplays()
        .then(gotVRDisplays)
        .catch(function () {
          console.warn("VRControls: Unable to get VR Displays");
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
  }

  getVRDisplay() {
    return this.vrDisplay;
  }

  setVRDisplay(value) {
    this.vrDisplay = value;
  }

  getVRDisplays() {
    console.warn("VRControls: getVRDisplays() is being deprecated.");
    return this.vrDisplays;
  }

  getStandingMatrix() {
    return this.standingMatrix;
  }

  update() {
    if (this.vrDisplay) {
      let pose;

      if (this.vrDisplay.getFrameData) {
        this.vrDisplay.getFrameData(this.frameData);
        pose = this.frameData.pose;
      } else if (this.vrDisplay.getPose) {
        pose = this.vrDisplay.getPose();
      }

      if (pose.orientation !== null) {
        this.object.quaternion.fromArray(pose.orientation);
      }

      if (pose.position !== null) {
        this.object.position.fromArray(pose.position);
      } else {
        this.object.position.set(0, 0, 0);
      }

      if (this.standing) {
        if (this.vrDisplay.stageParameters) {
          this.object.updateMatrix();

          this.standingMatrix.fromArray(
            this.vrDisplay.stageParameters.sittingToStandingTransform
          );
          this.object.applyMatrix(this.standingMatrix);
        } else {
          this.object.position.setY(this.object.position.y + this.userHeight);
        }
      }

      this.object.position.multiplyScalar(this.scale);
    }
  }

  dispose() {
    this.vrDisplay = null;
  }
}

;// CONCATENATED MODULE: ./src/index.js






// These should probably be in their own build!











})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=threestrap.js.map
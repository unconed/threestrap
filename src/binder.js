import { EventDispatcher } from "three/src/core/EventDispatcher.js";

export class Binder {
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

    object.hasEventListener = EventDispatcher.prototype.hasEventListener;
    object.addEventListener = EventDispatcher.prototype.addEventListener;
    object.removeEventListener = EventDispatcher.prototype.removeEventListener;

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

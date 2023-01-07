import { EventDispatcher } from "three";

export class Binder {
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

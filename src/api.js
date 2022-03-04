export class Api {
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

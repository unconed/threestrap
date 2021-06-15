import * as THREE from "three";

// eslint-disable-next-line no-import-assign
THREE.Api = {
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

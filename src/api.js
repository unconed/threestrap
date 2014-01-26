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
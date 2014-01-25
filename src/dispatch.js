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

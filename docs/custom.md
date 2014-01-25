Threestrap - Custom Plugins
---

Use `registerPlugin` to make a new plug-in available, passing in a prototype for the class.

* `install:` and `uninstall:` are for initialization and cleanup respectively
* plugins should install themselves into `three`, preferably in a namespaced object
* `this.options` contains the plugin's options, defaults are set in `.defaults()`
* use `this.api()` to create set/get helpers for changing options

```javascript
THREE.Bootstrap.registerPlugin('magic', {

  // Configuration defaults
  defaults: {
    foo: bar,
  },

  // Initialize resources, bind events
  install: function (three, renderer, element) {

    // Listen for outside events
    // three.addEventListener(...);

    // Make a public API (includes .set() / .get())
    three.Magic = this.api({

      // three.Magic.ping()
      ping: function () {
        // Dispatch own events
        three.dispatchEvent({ type: 'magic', ping: true });
      }.bind(this),

    });

    // Listen for changes from three.Magic.set({...})
    this.addEventListener('change', function () {
      // this.options reflects the new state, i.e.:
      // this.options.foo == 'bar'
    }.bind(this));

    // Expose values globally (discouraged)
    three.magic = 1;
    three.pingMagic = three.Magic.ping.bind(this);
  },

  // Destroy resources, unbind events
  uninstall: function (three, renderer, element) {

    // Remove event listeners
    // three.removeEventListener(...);
    
    // Remove from context
    delete three.Magic;
    delete three.magic;
    delete three.pingMagic;
  },

});
```

Call `THREE.Bootstrap.unregisterPlugin('plugin')` to remove.


Aliases
---

Make an alias for a set of plugins, like so:

```
THREE.Bootstrap.registerAlias('empty', ['size', 'fill', 'loop', 'time']);
```

Call `THREE.Bootstrap.unregisterAlias('alias')` to remove.

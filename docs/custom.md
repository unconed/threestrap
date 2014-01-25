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

  // Declare event listeners for plugin methods
  //
  // format: "object.event:method"
  // allowed objects: this, three, element, canvas, window
  // default: "three.event:event"
  //
  // alt format: [object, "event:method"]
  listen: ['this.change', 'ready:yup', [ document.body, 'click' ]],

  // Initialize resources, bind events
  install: function (three) {

    // Listen manually for outside events
    // three.on(...);

    // Make a public API (includes .set() / .get())
    three.Magic = this.api({

      // three.Magic.ping()
      ping: function () {
        // Dispatch own events
        three.dispatchEvent({ type: 'magic', ping: true });
      }.bind(this),

    });

    // Expose values globally (discouraged)
    three.magic = 1;
    three.pingMagic = three.Magic.ping.bind(this);
  },

  // Destroy resources, unbind events
  uninstall: function (three) {

    // Remove manual event listeners
    // three.off(...);
    
    // Remove from context
    delete three.Magic;
    delete three.magic;
    delete three.pingMagic;
  },
  
  // body.click event handler
  click: function (event, three) {
  },
  
  // this.change event handler
  change: function (event, three) {
    // event.type == 'change'
    // event.changes == {...}
    // this.options reflects the new state, i.e.:
    // this.options.foo == 'bar'
  }

  // three.ready event handler
  yup: function (event, three) {
    // event.type == 'ready'
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

Threestrap - Custom Plugins
===

See below for scaffold. Use `THREE.Bootstrap.registerPlugin` to make a new plug-in available, passing in a prototype for the class.

Init
---

* `.install(three)` and `.uninstall(three)` are for initialization and cleanup respectively
* plugins should install themselves into `three`, preferably in a namespaced object

Recommended format is `three.FooBar.…` for a *Foo Bar* plugin's namespace. Creating a `three.fooBar` global is allowed for singletons or other well known objects. Other named globals are discouraged, try to keep the `three` namespace clean.

Config
---

* `this.options` contains the plugin's options, defaults are set in `.defaults`
* use `this.api()` to create set/get helpers for changing options
* when `api.set({...})` is called, the `change` event fires on `this`. `event.changes` lists the values that actually changed
* additional API methods can be added, which receive `three` as their final argument

Events
---

* `.listen` declares a list of event/method bindings as an array
* use `three.on()/.off()/.bind()` for manual binding
* method bindings are automatically unbound when the plugin is uninstalled

Examples
---

See `src/extra/` for example plug-ins.

Scaffold
---

```javascript
THREE.Bootstrap.registerPlugin('magic', {

  // Configuration defaults
  defaults: {
    foo: 'bar',
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
    // Calling `….api({...}, three)` will pass `three` as the final argument to all API methods.
    three.Magic = this.api({

        // three.Magic.ping()
        ping: function (three) {
          // Trigger own events
          three.trigger({ type: 'magic', ping: true });
        }.bind(this),

      },
      three);

    // Expose values globally (discouraged)
    three.magic = 1;
    three.doMagic = three.Magic.ping.bind(this);
  },

  // Destroy resources, unbind events
  uninstall: function (three) {

    // Remove manual event listeners
    // three.off(...);

    // Remove from context
    delete three.Magic;
    delete three.magic;
    delete three.doMagic;
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
  },

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

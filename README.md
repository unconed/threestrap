threestrap
==========

*Use Three.js with zero hassle.*

<a href="http://acko.net/files/threestrap/basic_cube.html"><img src="https://raw.github.com/unconed/threestrap/master/examples/basic_cube.png" alt="Example"></a>


* * *

Threestrap is a minimal, pluggable bootstrapper for Three.js that gets out of your way.

While this is definitely a miniature framework, it's not really meant to wrap *your* code, but rather the code you don't care about.

Examples:
* [Basic Cubes](http://acko.net/files/threestrap/basic_cube.html)
* [Drag/Zoom Controls](http://acko.net/files/threestrap/controls_orbit_cube.html)
* [WebGL + CSS 3D](http://acko.net/files/threestrap/multiple_renderers.html)
* [VR + Controls](http://acko.net/files/threestrap/vr2.html)

Usage
===

Install via bower:
```
bower install threestrap
```

Add `build/threestrap.js` to your Three.js:

```html
<script src="three.js"></script>
<script src="threestrap.js"></script>
```

Get a threestrap context:

```javascript
var three = THREE.Bootstrap();
```

This will create a full-page Three.js WebGL canvas, initialize the scene and camera, and set up a rendering loop.

You can access the globals `three.scene` and `three.camera`, and bind events on the `three` context:

```javascript
// Insert a cube
var mesh = new THREE.Mesh(new THREE.CubeGeometry(.5, .5, .5), new THREE.MeshNormalMaterial());
three.scene.add(mesh);

// Orbit the camera
three.on('update', function () {
  var t = three.Time.now;
  three.camera.position.set(Math.cos(t), .5, Math.sin(t));
  three.camera.lookAt(new THREE.Vector3());
});
```

Configuration
---

Threestrap is made out of plugins that each do one thing. The basic set up of `empty` or `core` gets you a fully-functional canvas in the body or a specific DOM element.

Empty:

 * `fallback` - Displays a standard message with a link if WebGL is unavailable.
 * `bind`     - Enables event/method binding.
 * `renderer` - Creates the `THREE.WebGLRenderer` (or a given class).
 * `size`     - Autosizes canvas to fit or size to given dimensions.
 * `fill`     - Removes margin/padding and sets positioning on the element.
 * `loop`     - Runs the rendering loop.
 * `time`     - Measures time and fps in seconds. Provides clocks.

Core:

 * `scene`    - Creates the `THREE.Scene`
 * `camera`   - Creates the `THREE.Camera`
 * `render`   - Renders the global scene and camera directly.
 * `warmup`   - Hide canvas for first few frames to avoid stuttering.

Additional plug-ins can be added, or the default set can be overridden on a case by case basis. `empty` is a do-it-yourself set up.


Shorthands:
```javascript
// Core only
var three = THREE.Bootstrap();

// Pass in list of plugins
var three = THREE.Bootstrap('core', 'stats');
var three = THREE.Bootstrap(['core', 'stats']);

// Insert into specific element
var three = THREE.Bootstrap(element);
var three = THREE.Bootstrap(element, 'core', 'stats');
var three = THREE.Bootstrap(element, ['core', 'stats']);

// Replace plugins ad-hoc
var three = THREE.Bootstrap(['core', 'stats', 'render:myRender']);
```

The following global options are available with these defaults:

```javascript
var three = THREE.Bootstrap({
  init: true,                      // Initialize on creation

  element: document.body,          // Containing element

  plugins: [                       // Active plugins
    'core',                        // Use all core plugins
    // 'render:myRender'           // Ad-hoc overrides
  ],

  aliases: {                       // Ad-hoc overrides
    // 'render': 'myRender',       
    // 'alias': ['myFoo', 'myBar']
  },
});
```

When `init` is set to false, initialization only happens when manually calling `three.init()`. To destroy the widget, call `three.destroy()`.

Plugins can make objects and methods available on the threestrap context, like `three.Time.now` or `three.Loop.start()`.

Builds
---
 * threestrap.js: Full build (but still requires three.js)
 * threestrap-core.js: Core only, requires three.js + lodash
 * threestrap-extra.js: Extra plugins

Plugins
---

To enable a plug-in, include its name in the `plugins` field. Plugins are installed in the given order.

Plug-in specific options are grouped under the plug-in's name:

```javascript
var three = THREE.Bootstrap({
  plugins: ['core', 'stats'],
  size: {
    width: 1280,
    height: 720,
  },
  camera: {
    fov: 40,
  },
});
```

The following aliases are available:

* `empty` = `fallback`, `bind`, `renderer`, `size`, `fill`, `loop`, `time`
* `core` = `empty` + `scene`, `camera`, `render`, `warmup`

Events
---

Threestrap plugins broadcast events to each other, like `resize` or `render`.

You can listen for events with `.on()` and unset them with `.off()`.

```javascript
three.on('event', function (event, three) {

});
```

```javascript
var handler = function () {};
three.on('event', handler);
three.off('event', handler);
```

You can also bind events directly to object methods using `.bind`:

```javascript
var object = {
  render: function (event, three) { },
  yup:    function (event, three) { },
  redraw: function (event, three) { },
  resize: function (event, three) { },
  change: function (event, three) { },
};

// Bind three.render event to object.render(event, three)
three.bind('render', object);

// Bind three.ready event to object.yup(event, three);
three.bind('ready:yup', object);

// Bind object.change event to object.redraw(event, three);
three.bind('this.change:redraw', object);

// Bind window.resize event to object.resize(event, three);
three.bind('window.resize', object);

// Bind DOM element's onchange event to object.change(event, three);
three.bind([element, 'change'], object);
```

Docs
---

* [Core reference](https://github.com/unconed/threestrap/blob/master/docs/core.md)
* [Extra plugins reference](https://github.com/unconed/threestrap/blob/master/docs/extra.md)
* [Write custom plugins](https://github.com/unconed/threestrap/blob/master/docs/custom.md)

* * *

Steven Wittens - http://acko.net/

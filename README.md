threestrap
==========

*Use Three.js with zero hassle.*

![threestrap](https://raw.github.com/unconed/threestrap/master/examples/basic_cube.png)


* * *

Threestrap is a minimal, pluggable bootstrapper for Three.js that gets out of your way.

Usage
===

Add `build/threestrap.js` to your Three.js:

```html
<script src="three.js"></script>
<script src="threestrap.js"></script>
```

Get a threestrap context:

```javascript
var three = THREE.Bootstrap();
```

This will create a fullscreen Three.js WebGL canvas, initialize the scene and camera, and set up a rendering loop.

You can access the globals `three.scene` and `three.camera`, and bind events on the `three` context:

```javascript
// Insert a cube
var mesh = new THREE.Mesh(new THREE.CubeGeometry(.5, .5, .5), new THREE.MeshNormalMaterial());
three.scene.add(mesh);

// Orbit the camera
three.addEventListener('update', function () {
  var t = three.Time.now;
  three.camera.position.set(Math.cos(t), .5, Math.sin(t));
  three.camera.lookAt(new THREE.Vector3());
});
```

Configuration
---

Threestrap is made out of plugins that each do one thing. The basic set up of `size`, `fill`, `loop`, `time`, `scene`, `camera`, `render` gets you a fully functional canvas in the page.

Additional plug-ins can be added, or the default set can be overridden on a case by case basis.

The following global options are available with these defaults:

```javascript
var three = THREE.Bootstrap({
  init: true,                    // Initialize on creation

  element: document.body,        // Containing element

  plugins: [                     // Active plugins
    'core',                      // Use all core plugins
  ],                             

  klass: THREE.WebGLRenderer,    // Renderer class
  parameters: {                  // Parameters passed to Three.js renderer
    depth: true,                                          
    stencil: true,
    preserveDrawingBuffer: true,
    antialias: true,
  },
});
```

When `init` is set to false, initialization only happens when manually calling `three.init()`. To destroy the widget, call `three.destroy()`.

They can also make objects and methods available on the threestrap context, like `three.Time.now` or `three.Loop.start()`.

Builds
---
 * threestrap.js: Full build (but still requires three.js)
 * threestrap-core.js: Core only, requires three.js + lodash

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

* `empty` = `size`, `fill`, `loop`, `time`
* `core` = `empty` + `scene`, `camera`, `render`

Events
---

Threestrap plugins broadcast events to each other, like `resize` or `render`.

Use `.addEventListener`, `removeEventListener` to track named events on the threestrap context:

```javascript
three.addEventListener('update', function (event) {
  // ...
});
```

Docs
---

* [Core reference](https://github.com/unconed/threestrap/blob/master/docs/core.md)
* [Write custom plugins](https://github.com/unconed/threestrap/blob/master/docs/custom.md)

* * *

Steven Wittens - http://acko.net/

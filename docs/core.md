Threestrap - Core Reference
===

* Global properties

```javascript
three.container;  // Containing element
three.canvas;     // Canvas element
three.renderer;   // Three renderer
three.plugins;    // Collection of active plugins
````

* Global Events

```javascript
// Fires once after all plugins have been installed
three.addEventListener('ready', function () { });
```

size
---
Autosizes canvas to fill its container or size to given dimensions. Force aspect ratio, limit maximum frame buffer size and apply a global scale.

* Options

```javascript
{
  width: null,           // Fixed width in pixels
  height: null,          // Fixed height in pixels
  aspect: null,          // Fixed aspect ratio
  scale: 1,              // Scale factor. e.g. scale `1/2` renders at half resolution.
  capWidth:  Infinity,   // Maximum width in pixels of framebuffer
  capHeight: Infinity,   // Maximum height in pixels of framebuffer
}
```

* API

```javascript
// Methods
three.Size.set({ });      // Set options
three.Size.get();         // Get options

// Properties (read-only)
three.Size.renderWidth;   // Width of frame buffer
three.Size.renderHeight;  // Height of frame buffer
three.Size.viewWidth;     // Width of canvas on page
three.Size.viewHeight;    // Height of canvas on page
```

* Events

```javascript
// Canvas was resized to new dimensions.
three.addEventListener('resize', function (event) {
  // event ==
  {
    renderWidth: 100,
    renderHeight: 100,
    viewWidth: 100,
    viewHeight: 100,
  }
}
```

fill
---
Makes sure canvas can fill the entire window when directly inside the body.

* No options or API

loop
---
Runs the rendering loop and asks plugins to update or render themselves.

* Options

```javascript
{
  start: true,       // Begin immediately on ready
}
```

* API

```javascript
// Methods
three.Loop.start();   // Start loop
three.Loop.stop();    // Stop loop

// Properties (read-only)
three.Loop.running;   // Is loop running?
```

* Events

```javascript
// Loop has been started
three.addEventListener('start', function () { });

// Loop has been stopped
three.addEventListener('stop', function () { });

// Prepare for rendering
three.addEventListener('pre', function () { });

// Update state of objects
three.addEventListener('update', function () { });

// Render objects
three.addEventListener('render', function () { });

// Finish up after rendering
three.addEventListener('post', function () { });
```

time
---
Measures time and fps in seconds.

* API

```javascript
// Properties (read-only)
three.Time.now     // Clock (seconds)
three.Time.delta   // Last frame time (seconds)
three.Time.average // Average frame time (seconds)
three.Time.fps     // Average frames per second
```

scene
---
Makes a scene available.

* API

```javascript
// Properties (read-only)
three.scene    // Global scene
```

camera
---
Makes a camera available.

* Options

```javascript
{
  near: .1,                    // Near clip plane
  far: 10000,                  // Far clip plane

  type: 'perspective',         // Perspective camera
  fov: 60,                     // Field of view
  aspect: 'auto',              // Aspect ratio (number or 'auto')

  // type: 'orthographic',     // Orthographic camera
  left: -1,                    // Bounding box
  right: 1,                      
  bottom: -1,
  top: 1,
}
```

* API

```javascript
// Methods
three.Camera.set({ }); // Set options
three.Camera.get();    // Get options

// Properties (read-only)
three.camera;          // Global camera
```

* Events

```javascript
// Camera was recreated / changed
three.addEventListener('camera', function (event) {
  // event.camera
}
```

render
---
Renders the global scene and camera directly.

* No options or API
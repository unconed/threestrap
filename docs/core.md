Threestrap - Core Reference
===

* Initialization

```javascript
three.init()             // Initialize threestrap instance
three.destroy()          // Destroy threestrap instance
```

* Global properties

```javascript
three.element;    // Containing element
three.canvas;     // Canvas element
three.renderer;   // Three renderer
three.plugins;    // Collection of active plugins
````

* Global Events

```javascript
// Fires once after all plugins have been installed
three.on('ready', function (event, three) { });
```

* Event listeners

```javascript
// Listen for three.event events
three.on('event', function (event, three) { });
```

// Bind threestrap 'event' events to object.event(event, three)
three.bind('event', object);

// Bind threestrap 'event' events to object.method(event, three)
three.bind('event:method', object);

// Bind target's 'event' events to object.method(event, three)
// where target is one of:
// - three: threestrap context
// - this: the object itself
// - element: the containing element
// - canvas: the canvas
// - window: window object
three.bind('target.event:method', object);

// Bind target's 'event' events to object.method(event, three)
// where target is any object with on / off / addEventListener / removeEventListener methods.
three.bind('target.event:method', object);

// Trigger a threestrap event.
three.trigger({ type: 'event', /* ... */ });
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
three.on('resize', function (event) {
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
three.on('start', function () { });

// Loop has been stopped
three.on('stop', function () { });

// Prepare for rendering
three.on('pre', function () { });

// Update state of objects
three.on('update', function () { });

// Render objects
three.on('render', function () { });

// Finish up after rendering
three.on('post', function () { });
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
three.on('camera', function (event) {
  // event.camera
}
```

render
---
Renders the global scene and camera directly.

* No options or API

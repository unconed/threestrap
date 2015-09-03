Threestrap - Core Reference
===

* API

```javascript
THREE.Bootstrap()                            // Create bootstrap context

THREE.Bootstrap('plugin', ...)               // With given plugins
THREE.Bootstrap(['plugin', ...])
THREE.Bootstrap(['plugin', "plugin:plugin"]) // and ad-hoc overrides

THREE.Bootstrap(element, "plugin", ...)      // Inside given DOM element
THREE.Bootstrap(element, ["plugin", ...])    // 

THREE.Bootstrap({                            // With given options
  init: true,                                // Initialize on creation

  element: document.body,                    // Containing element

  plugins: [                                 // Active plugins
    'core',                                  // Use all core plugins
  ],

  aliases: {                                 // Ad-hoc overrides
    // 'alias': 'plugin',
    // 'alias': ['plugin', ...],
  }


three.init()                                 // Initialize threestrap instance
three.destroy()                              // Destroy threestrap instance

three.install('plugin', ...)                 // Install plugin(s) on the fly
three.install(['plugin', ...])
three.uninstall('plugin', ...)               // Uninstall plugin(s) on the fly
three.uninstall(['plugin', ...])
```

* Properties

```javascript
three.element;    // Containing element
three.plugins;    // Collection of installed plugins by name
````

* Event listeners

```javascript
// Listen for three.event events
three.on('event', function (event, three) { });
```
```javascript
// Remove event listener
three.off('event', handler);
```

```javascript
// Trigger a threestrap event.
three.trigger({
  type: 'event',
  // ...
});
```

* Events

```javascript
// Fires once after all plugins have been installed
three.on('ready', function (event, three) { });
```

renderer
---
Creates the Three.js renderer of the given class.

* Options

```javascript
{
  klass: THREE.WebGLRenderer,    // Renderer class
  parameters: {                  // Parameters passed to Three.js renderer
    depth: true,
    stencil: true,
    preserveDrawingBuffer: true,
    antialias: true,
  },
}
```

* Properties

```javascript
three.canvas;     // Canvas / DOM element
three.renderer;   // Three renderer
```

bind
---
Enables event/method binding on context and installed plug-ins (nothing works without it).

* API

```javascript
// Bind threestrap 'event' events to object.event(event, three)
three.bind('event', object);
```

```javascript
// Bind threestrap 'event' events to object.method(event, three)
three.bind('event:method', object);
```

```javascript
// Bind target's 'event' events to object.method(event, three)
// where target is one of:
// - three: threestrap context
// - this: the listening object itself
// - element: the containing element
// - canvas: the canvas
// - window: window object
three.bind('target.event:method', object);
```

```javascript
// Bind target's 'event' events to object.method(event, three)
// where target is any object with on / off / addEventListener / removeEventListener methods.
three.bind([ target, 'event:method' ], object);
```

```javascript
// Unbind all bound methods
three.unbind(object);
```

size
---
Autosizes canvas to fill its container or size to given dimensions. Force aspect ratio, limit maximum frame buffer size and apply a global scale.

* Options

```javascript
{
  width:  null,                // Fixed width in pixels
  height: null,                // Fixed height in pixels
  aspect: null,                // Fixed aspect ratio, e.g. 16/9
  scale:  1,                   // Scale factor. e.g. scale 1/2 renders at half resolution.
  maxRenderWidth:  Infinity,   // Maximum width in pixels of framebuffer
  maxRenderHeight: Infinity,   // Maximum height in pixels of framebuffer
  devixePixelRatio: true,      // Whether to automatically adjust for high DPI displays
}
```

* API

```javascript
// Methods
three.Size.set({ });      // Set options
three.Size.get();         // Get options
```

* Properties

```javascript
three.Size.renderWidth;   // Width of frame buffer
three.Size.renderHeight;  // Height of frame buffer
three.Size.viewWidth;     // Width of canvas on page
three.Size.viewHeight;    // Height of canvas on page
three.Size.aspect;        // Aspect ratio of view
three.Size.pixelRatio;    // Pixel ratio (render height / view height)
```

* Events

```javascript
// Canvas was resized to new dimensions.
three.on('resize', function (event, three) {
  // event ==
  {
    renderWidth: 100,
    renderHeight: 100,
    viewWidth: 100,
    viewHeight: 100,
    aspect: 1,
  }
}
```

fill
---
Makes sure canvas can fill the entire window when directly inside the body. Helps positioning when inside a DOM element.

* Options
```javascript
{
  block: true,       // Make canvas a block element
  body: true,        // Set auto height/margin/padding on <body>
  layout: true,      // Set position relative on container if needed to ensure layout
}
```

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
three.Loop.start();   // Start loop
three.Loop.stop();    // Stop loop
```

* Properties

```javascript
three.Loop.running;   // Is loop running?
```

* Events

```javascript
// Loop has been started
three.on('start', function () { });
```

```javascript
// Loop has been stopped
three.on('stop', function () { });
```

```javascript
// Prepare for rendering
three.on('pre', function () { });
```

```javascript
// Update state of objects
three.on('update', function () { });
```

```javascript
// Render objects
three.on('render', function () { });
```

```javascript
// Finish up after rendering
three.on('post', function () { });
```

time
---
Measures time and fps in seconds.

* Options

```javascript
{
  speed: 1,        // Clock speed (2 = fast forward, 0.5 = slow motion)
  warmup: 0,       // Wait N frames before starting clock
  timeout: 1       // Ignore ticks longer than this, effectively pausing the clock
}
```


* Properties

```javascript
three.Time.now     // Time since 1970 (seconds)

three.Time.clock   // Clock (seconds since start)
three.Time.step    // Clock step (seconds)

three.Time.frames  // Frame count
three.Time.time    // Real time (seconds since start)
three.Time.delta   // Last frame time (seconds)

three.Time.average // Average frame time (seconds)
three.Time.fps     // Average frames per second
```

scene
---
Makes a scene available.

* Properties

```javascript
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

  klass: null,                 // Custom class/parameters
  parameters: null,            // if you really want to
}
```

* API

```javascript
three.Camera.set({ }); // Set options
three.Camera.get();    // Get options
```

* Properties

```javascript
three.camera;          // Global camera
```

* Events

```javascript
// Camera was recreated / changed
three.on('camera', function (event, three) {
  // event.camera
}
```

render
---
Renders the global scene and camera directly.

* No options or API


fallback
---
Displays a standard message with a link if WebGL is unavailable.

* Options

```javascript
{
  force:   false,                 // Force fallback (for testing)
  fill:    true,                  // Use 'fill' plugin when displaying message

  // Message wrapper (center horizontally/vertically)
  begin:   '<div class="threestrap-fallback" style="display: table; width: 100%; height: 100%;'+
           'box-sizing: border-box; border: 1px dashed rgba(0, 0, 0, .25);">'+
           '<div style="display: table-cell; padding: 10px; vertical-align: middle; text-align: center;">',
  end:     '</div></div>',
  
  // Message
  message: '<big><strong>This example requires WebGL</strong></big><br>'+
           'Visit <a target="_blank" href="http://get.webgl.org/">get.webgl.org</a> for more info</a>',
}
```

* Properties

```javascript
three.fallback;   // True if fallback was triggered.
```

warmup
---
Hide canvas for first few frames to avoid stuttering while JS/GL warms up.

* Options

```javascript
{
  delay: 2,  // Number of frames to wait before showing canvas
}


Threestrap - Extra Plugins
===

vr
---
Supports rendering to HMDs like the Oculus Rift or Google Cardboard.

* Options:

```javascript
{
  mode: 'auto',               // Set '2d' to force VR off
  device: null,               // Force a specific device ID
  fov:      80,               // Set emulated FOV for fallback / cardboard use
}
```

* API

```javascript
three.VR.set({ });            // Set options
three.VR.get();               // Get options
```

* Properties

```javascript
three.VR.active               // Whether stereoscopic VR is currently active
three.VR.devices              // List of available VR devices
three.VR.hmd                  // Current head-mounted display device
three.VR.sensor               // Current positional sensor device
three.VR.renderer             // VRRenderer instance
three.VR.state                // Last sensor state
```

* Events

```javascript
// VR mode was activated / deactivated
three.on('vr', function (event, three) {
  // event ==
  {
    active: true,
    //active: false,
    hmd:    ...
    sensor: ...
  }
}
```

fullscreen
---
Supports going fullscreen via an API or a keypress. Integrates with `vr` if present.

* Options:

```javascript
{
  key: 'f',                    // Keyboard letter to toggle fullscreen mode with (e.g. 'f') or 'null' to disable
}
```

* API

```javascript
three.Fullscreen.set({ });      // Set options
three.Fullscreen.get();         // Get options
three.Fullscreen.toggle();      // Go fullscreen / exit fullscreen
```

* Properties

```javascript
three.Fullscreen.active       // Whether fullscreen is currently active
```

* Events

```javascript
// Fullscreen mode was activated / deactivated
three.on('fullscreen', function (event, three) {
  // event ==
  {
    active: true,
    //active: false,
  }
}
```

ui
---
Minimal UI for fullscreen / VR mode.

* Options:
```javascript
{
    // Class (white / black)
    theme: 'white',
    // Injected CSS.
    style: '.threestrap-ui { position: absolute; bottom: 5px; right: 5px; float: left; }'+
           '.threestrap-ui button { border: 0; background: none;'+
           '  vertical-align: middle; font-weight: bold; } '+
           '.threestrap-ui .glyphicon { top: 2px; font-weight: bold; } '+
           '@media (max-width: 640px) { .threestrap-ui button { font-size: 120% } }'+
           '.threestrap-white button { color: #fff; text-shadow: 0 1px 1px rgba(0, 0, 0, 1), '+
                                                                   '0 1px 3px rgba(0, 0, 0, 1); }'+
           '.threestrap-black button { color: #000; text-shadow: 0 0px 1px rgba(255, 255, 255, 1), '+
                                                                '0 0px 2px rgba(255, 255, 255, 1), '+
                                                                '0 0px 2px rgba(255, 255, 255, 1) }'
  }
```

stats
---
Shows live FPS stats in the corner (with Stats.js)

* Properties

```javascript
three.stats;  // Stats() object
```

controls
---
Binds a THREE camera controller to the global camera. Note: you must manually include the .js controller. See `vendor/controls/` and three.js' own examples.

* Options:

```javascript
{
  klass: THREE.OrbitControls, // Control class
  parameters: {               // Parameters for class
  },
}
```

* API

```javascript
three.Controls.set({ });      // Set options
three.Controls.get();         // Get options
```

* Properties

```javascript
three.controls;               // Global camera controls
```

cursor
---
Sets the mouse cursor contextually. If controls are present, `move` is used, otherwise a default.

* Options:

```javascript
{
  cursor: null,               // Force a specific CSS cursor (e.g. 'pointer')
  hide: false,                // Auto-hide the cursor after inactivity
  timeout: 3,                 // Time out for hiding (seconds)
}
```


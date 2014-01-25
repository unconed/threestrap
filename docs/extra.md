Threestrap - Extra Plugins
===

stats
---
Shows live FPS stats in the corner (with Stats.js)

* API

```javascript
// Properties (read-only)
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
//
three.Controls.set({ });      // Set options
three.Controls.get();         // Get options

three.controls;               // Global camera controls
```


Changes
----
0.0.8-dev
* New Core/Warmup: Hide canvas for first few frames to avoid stuttering while JS/GL warms up.
* Core/Size: Only apply render width/height to canvas-based renderers

0.0.7
* New Extra/Cursor: Set mouse cursor contextually. Can auto-hide cursor with time out.
* New Core/Fallback: Abort and display standard message when WebGL is unavailable.
* Initialize `three.Time.now` on install.

0.0.6
* Core: 'ready' event now always fires on hot install
* Core/Time: Frame count/time `frames` and variable speed `clock`/`step`. Use `speed` option to control.
* Core/Fill: Configurable options for behavior, add `layout` option to position overlays like stats correctly.
* Extra/Stats: Insert into containing DOM element.

0.0.5
* Make canvas display as block in 'fill'

0.0.4

* Shorthand syntax `foo:bar` for aliases in plugin list
* Make api mechanism reusable as `THREE.Api`
* Hot-swap plugins with `three.install/uninstall(name/plugins)`

0.0.3

* this.api({...}, three) now auto-passes `three` as argument to API methods.
* Move `bind` and `renderer` into their own plugins
* Make bind mechanism reusable as `THREE.Binder`
* Diff changes made with `$.api().set()`, provide `.changes` as well as all passed `.options` values
* Ad-hoc aliases to override plug-ins on init

0.0.2

* Declarative event binding
* .on/.off/.trigger naming, with fallback for DOM/THREE objects
* `controls` plug-in / examples

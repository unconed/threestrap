* $.api({...}, three) now auto-passes `three` as argument to API methods.
* Move `bind` and `renderer` into their own plugins
* Make bind mechanism reusable as `THREE.Binder`
* Ad-hoc aliases to override plug-ins on init
* Diff changes made with `api.set()`, fire 'change' only on change.

0.0.2

* Declarative event binding
* .on/.off/.trigger naming, with fallback for DOM/THREE objects
* `controls` plug-in / examples
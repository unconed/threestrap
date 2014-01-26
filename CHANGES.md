0.0.4-dev

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
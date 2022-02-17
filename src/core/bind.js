import { Bootstrap } from "../bootstrap";
import { Binder } from "../binder";

Bootstrap.registerPlugin("bind", {
  install: function (three) {
    const globals = {
      three: three,
      window: window,
    };

    three.bind = Binder.bind(three, globals);
    three.unbind = Binder.unbind(three);

    three.bind("install:bind", this);
    three.bind("uninstall:unbind", this);
  },

  uninstall: function (three) {
    three.unbind(this);

    delete three.bind;
    delete three.unbind;
  },

  bind: function (event, three) {
    const plugin = event.plugin;
    const listen = plugin.listen;

    listen &&
      listen.forEach(function (key) {
        three.bind(key, plugin);
      });
  },

  unbind: function (event, three) {
    three.unbind(event.plugin);
  },
});

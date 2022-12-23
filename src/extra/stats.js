import { default as Stats } from "stats.js";
import { Bootstrap } from "../bootstrap";

Bootstrap.registerPlugin("stats", {
  listen: ["pre", "post"],

  install: function (three) {
    const stats = (this.stats = new Stats());
    const style = stats.domElement.style;

    style.position = "absolute";
    style.top = style.left = 0;
    three.element.appendChild(stats.domElement);

    three.stats = stats;
  },

  uninstall: function (three) {
    this.stats.domElement.remove()
    delete three.stats;
  },

  pre: function (_event, _three) {
    this.stats.begin();
  },

  post: function (_event, _three) {
    this.stats.end();
  },
});

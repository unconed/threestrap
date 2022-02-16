import { Bootstrap } from "./bootstrap";

Bootstrap.registerAlias("empty", [
  "fallback",
  "bind",
  "renderer",
  "size",
  "fill",
  "loop",
  "time",
]);

Bootstrap.registerAlias("core", [
  "empty",
  "scene",
  "camera",
  "render",
  "warmup",
]);

Bootstrap.registerAlias("VR", ["core", "cursor", "fullscreen", "render:vr"]);

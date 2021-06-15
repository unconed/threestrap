import * as THREE from "three";
import "./bootstrap";

THREE.Bootstrap.registerAlias("empty", [
  "fallback",
  "bind",
  "renderer",
  "size",
  "fill",
  "loop",
  "time",
]);
THREE.Bootstrap.registerAlias("core", [
  "empty",
  "scene",
  "camera",
  "render",
  "warmup",
]);
THREE.Bootstrap.registerAlias("VR", [
  "core",
  "cursor",
  "fullscreen",
  "render:vr",
]);

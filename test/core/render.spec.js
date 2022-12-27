import * as Threestrap from "../../src";
import { Scene } from "three";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera.js";


describe("render", function () {
  it("renders the scene on update", function () {
    const options = {
      plugins: ["bind", "renderer", "render"],
    };

    const three = new Threestrap.Bootstrap(options);

    three.scene = new Scene();
    three.camera = new PerspectiveCamera();

    let called = 0;
    three.renderer.render = function () {
      called++;
    };

    three.dispatchEvent({ type: "render" });

    expect(called).toBe(1);

    three.destroy();
  });
});

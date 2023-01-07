import * as Threestrap from "../../src";
import { Scene, PerspectiveCamera } from "three";

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

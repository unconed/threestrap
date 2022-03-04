import * as THREE from "three";

describe("render", function () {
  it("renders the scene on update", function () {
    const options = {
      plugins: ["bind", "renderer", "render"],
    };

    const three = new Threestrap.Bootstrap(options);

    three.scene = new THREE.Scene();
    three.camera = new THREE.PerspectiveCamera();

    called = 0;
    three.renderer.render = function () {
      called++;
    };

    three.dispatchEvent({ type: "render" });

    expect(called).toBe(1);

    three.destroy();
  });
});

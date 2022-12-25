import * as Threestrap from "../../src"
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


describe("controls", function () {
  it("install controls", function () {
    let captured = false;
    const klass = function (object, domElement) {
      expect(object instanceof PerspectiveCamera).toBe(true);
      expect(domElement.tagName).toBe("CANVAS");
    };
    klass.prototype = {
      update: function (delta) {
        captured = delta > 0;
      },
    };

    const options = {
      plugins: ["bind", "renderer", "camera", "controls"],
      controls: {
        klass: klass,
        parameters: {
          foo: "bar",
        },
      },
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.controls instanceof klass).toBe(true);

    three.dispatchEvent({ type: "update" });

    expect(captured).toBe(true);

    expect(three.controls.foo).toBe("bar");

    three.destroy();
  });

  it("responds to camera changes", function () {
    const options = {
      plugins: ["bind", "renderer", "camera", "controls"],
      controls: {
        klass: OrbitControls,
      },
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.controls.object).toBe(three.camera);

    three.Camera.set({
      type: "orthographic",
    });

    expect(three.controls.object).toBe(three.camera);

    three.destroy();
  });
});

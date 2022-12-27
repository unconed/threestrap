import * as Threestrap from "../../src";
import { Scene } from "three/src/scenes/Scene.js";

describe("scene", function () {
  it("makes a scene", function () {
    const options = {
      plugins: ["scene"],
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.scene instanceof Scene).toBe(true);

    three.destroy();
  });
});

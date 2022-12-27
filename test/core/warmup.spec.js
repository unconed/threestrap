import * as Threestrap from "../../src";

describe("warmup", function () {
  it("hides canvas", function () {
    const n = 3;

    const options = {
      plugins: ["bind", "renderer", "warmup"],
      warmup: {
        delay: n,
      },
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.renderer.domElement.style.visibility).toBe("hidden");

    for (let i = 0; i < n; ++i) {
      three.trigger({ type: "pre" });
      three.trigger({ type: "post" });
      expect(three.renderer.domElement.style.visibility).toBe("hidden");
    }

    three.trigger({ type: "pre" });
    three.trigger({ type: "post" });
    expect(three.renderer.domElement.style.visibility).toBe("visible");

    three.destroy();
  });
});

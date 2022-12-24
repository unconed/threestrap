import * as Threestrap from "../../src"

describe("vr", function () {
  it("adds vr api", function () {
    const options = {
      plugins: ["bind", "renderer", "scene", "camera", "vr"],
    };

    const three = new Threestrap.Bootstrap(options);

    // Fire window.onload
    three.plugins.vr.load({}, three);
    three.trigger({ type: "pre" });

    expect(three.VR).toBeTruthy();
    expect(three.VR.active).toBeTruthy();
    expect(three.VR.devices).toBeTruthy();
    expect(three.VR.devices.length).toBeGreaterThan(0);

    three.destroy();
  });

  it("fires vr event", function () {
    const options = {
      plugins: ["bind", "renderer", "scene", "camera", "vr"],
    };

    const three = new Threestrap.Bootstrap(options);

    // Fire window.onload
    three.plugins.vr.load({}, three);

    let called = 0;
    const handler = function () {
      called++;
    };
    three.on("vr", handler);

    three.trigger({ type: "pre" });

    expect(called).toBe(1);

    three.off("vr", handler);

    three.destroy();

    expect(called).toBe(1);
  });
});

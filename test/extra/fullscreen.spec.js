/* global THREE */

describe("fullscreen", function () {
  it("adds fullscreen api", function () {
    const options = {
      plugins: ["bind", "renderer", "fullscreen"],
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.Fullscreen).toBeTruthy();
    expect(three.Fullscreen.toggle).toBeTruthy();
    expect(three.Fullscreen.active).toBeFalsy();

    three.destroy();
  });
});

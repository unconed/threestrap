/* global THREE */

describe("scene", function () {
  it("makes a scene", function () {
    const options = {
      plugins: ["scene"],
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.scene instanceof THREE.Scene).toBe(true);

    three.destroy();
  });
});

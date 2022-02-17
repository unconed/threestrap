/* global THREE */

describe("scene", function () {
  it("makes a scene", function () {
    var options = {
      plugins: ["scene"],
    };

    var three = new Threestrap.Bootstrap(options);

    expect(three.scene instanceof THREE.Scene).toBe(true);

    three.destroy();
  });
});

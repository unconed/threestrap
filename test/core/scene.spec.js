describe("scene", function () {
  it("makes a scene", function () {

    var options = {
      plugins: ['scene'],
    };

    var three = new THREE.Bootstrap(options);

    expect(three.scene instanceof THREE.Scene).toBe(true);

    three.destroy();
  });

});
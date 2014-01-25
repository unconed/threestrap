describe("time", function () {

  it("installs time values", function () {

    var options = {
      plugins: ['time'],
    };

    var three = new THREE.Bootstrap(options);

    expect(three.Time.now !== undefined).toBeTruthy();
    expect(three.Time.delta !== undefined).toBeTruthy();
    expect(three.Time.average !== undefined).toBeTruthy();
    expect(three.Time.fps !== undefined).toBeTruthy();

    three.destroy();
  });

  it("measures delta / fps correctly", function (cb) {

    var pre, update, render, post, three;

    function stall(val, delay) {
      delay = delay || 0;
      var k, i = 0;
      while (+new Date() <= val + delay) {
        k = ++i * ++i * ++i * ++i * ++i;
      }
    }

    var options = {
      plugins: ['time'],
    };

    var three = new THREE.Bootstrap(options);
    var fps = 60;
    var delta = 1/fps;

    three.dispatchEvent({ type: 'pre' });

    for (var i = 0; i < 5; ++i) {
      stall(three.Time.now * 1000, delta * 1000);
      three.dispatchEvent({ type: 'pre' });
    }

    expect(three.Time.now).toBeGreaterThan(0);
    expect(three.Time.delta).toBeGreaterThan(0);
    expect(three.Time.average).toBeGreaterThan(0);
    expect(three.Time.fps).toBeGreaterThan(0);

    expect(Math.abs(three.Time.delta - delta)).toBeLessThan(.005);
    expect(Math.abs(three.Time.fps - fps)).toBeLessThan(5);

    three.destroy();

  });

});
describe("time", function () {

  function stall(val, delay) {
    delay = delay || 0;
    var k, i = 0;
    while ((+new Date() / 1000) <= val + delay) {
      k = ++i * ++i * ++i * ++i * ++i;
    }
  }

  it("installs time values", function () {

    var options = {
      plugins: ['bind','time'],
    };

    var three = new THREE.Bootstrap(options);

    expect(three.Time.now !== undefined).toBeTruthy();
    expect(three.Time.clock !== undefined).toBeTruthy();
    expect(three.Time.step !== undefined).toBeTruthy();
    expect(three.Time.frames !== undefined).toBeTruthy();
    expect(three.Time.time !== undefined).toBeTruthy();
    expect(three.Time.delta !== undefined).toBeTruthy();
    expect(three.Time.average !== undefined).toBeTruthy();
    expect(three.Time.fps !== undefined).toBeTruthy();

    three.destroy();
  });

  it("measures delta / fps correctly", function (cb) {

    var pre, update, render, post, three;

    var options = {
      plugins: ['bind','time'],
    };

    var three = new THREE.Bootstrap(options);
    var fps = 60;
    var delta = 1/fps;
    var frames = 5;

    three.trigger({ type: 'pre' });

    stall(three.Time.now, delta);

    three.trigger({ type: 'pre' });

    for (var i = 0; i < frames - 1; ++i) {
      stall(three.Time.now, delta);
      three.trigger({ type: 'pre' });
    }

    expect(three.Time.now).toBeGreaterThan(0);

    expect(three.Time.clock).toBeGreaterThan(0);
    expect(three.Time.step).toBeGreaterThan(0);

    expect(three.Time.frames).toBe(frames);
    expect(three.Time.time).toBeGreaterThan(0);
    expect(three.Time.delta).toBeGreaterThan(0);

    expect(three.Time.average).toBeGreaterThan(0);
    expect(three.Time.fps).toBeGreaterThan(0);

    expect(Math.abs(three.Time.delta - delta)).toBeLessThan(.005);
    expect(Math.abs(three.Time.fps - fps)).toBeLessThan(5);
    expect(Math.abs(1/three.Time.average - fps)).toBeLessThan(5);

    three.destroy();

  });

  it("clock runs at half speed", function (cb) {

    var pre, update, render, post, three;

    var RATIO = 1/2;

    var options = {
      plugins: ['bind', 'time'],
      time: { speed: RATIO }
    };

    var three = new THREE.Bootstrap(options);
    var frames = 5;
    var fps = 60;
    var delta = 1/fps;

    three.trigger({ type: 'pre' });

    var start = three.Time.now;

    for (var i = 0; i < frames; ++i) {
      stall(three.Time.now, delta);
      three.trigger({ type: 'pre' });
    }

    var nowTime = three.Time.now - start;
    var realTime = three.Time.time;
    var clockTime = three.Time.clock;

    expect(nowTime).toBeGreaterThan(0);
    expect(realTime).toBeGreaterThan(0);
    expect(clockTime).toBeGreaterThan(0);

    var ratio = clockTime / realTime / RATIO;
    var diff = 1.0 - Math.min(ratio, 1/ratio);
    expect(diff).toBeLessThan(0.05);

    expect(Math.abs(1.0 / three.Time.step - fps / RATIO)).toBeLessThan(5);

    three.destroy();

  });

  it("clock waits N frames then starts from 0", function (cb) {

    var pre, update, render, post, three;

    var delay = 5;

    var options = {
      plugins: ['bind', 'time'],
      time: { warmup: delay }
    };

    var three = new THREE.Bootstrap(options);
    var frames = delay;
    var fps = 60;
    var delta = 1/fps;

    three.trigger({ type: 'pre' });

    var start = three.Time.clock;

    for (var i = 0; i < frames; ++i) {
      stall(three.Time.now, delta);
      three.trigger({ type: 'pre' });
    }

    var clockTime = three.Time.clock;

    expect(clockTime).toBe(0);

    stall(three.Time.now, delta);
    three.trigger({ type: 'pre' });

    clockTime = three.Time.clock;

    expect(clockTime).toBeGreaterThan(0);
    expect(clockTime).toBeLessThan(delta * 2);

    three.destroy();

  });

  it("clock ignores frames longer than timeout", function (cb) {

    var pre, update, render, post, three;

    var delay = 5/60;

    var options = {
      plugins: ['bind', 'time'],
      time: { timeout: delay }
    };

    var three = new THREE.Bootstrap(options);
    var frames = 3;
    var fps = 60;
    var delta = 1/fps;

    for (var i = 0; i < frames; ++i) {
      stall(three.Time.now, delta);
      three.trigger({ type: 'pre' });
    }

    var start = three.Time.clock;

    stall(three.Time.now, delay);
    three.trigger({ type: 'pre' });

    var clockTime = three.Time.clock;

    expect(clockTime - start).toBe(0);

    stall(three.Time.now, delta);
    three.trigger({ type: 'pre' });

    clockTime = three.Time.clock;

    expect(clockTime - start).toBeGreaterThan(0);
    expect(clockTime - start).toBeLessThan(delta * 2);

    three.destroy();

  });

});
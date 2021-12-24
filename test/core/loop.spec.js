describe('loop', function () {
  it('installs start/stop methods', function () {
    var options = {
      plugins: ['loop'],
      loop: {
        start: false,
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(three.Loop.start.call).toBeTruthy();
    expect(three.Loop.stop.call).toBeTruthy();

    three.destroy();
  });

  it('starts and stops', function () {
    var options = {
      plugins: ['loop'],
      loop: {
        start: false,
      },
    };

    var three = new THREE.Bootstrap(options);

    var started = false;
    var stopped = false;

    three.on('start', function () {
      started = true;
    });

    three.on('stop', function () {
      stopped = true;
    });

    expect(three.Loop.running).toBe(false);

    three.Loop.start();

    expect(three.Loop.running).toBe(true);

    three.Loop.stop();

    expect(three.Loop.running).toBe(false);

    three.Loop.start();

    expect(three.Loop.running).toBe(true);

    three.Loop.stop();

    expect(three.Loop.running).toBe(false);

    expect(started).toBe(true);
    expect(stopped).toBe(true);

    three.destroy();
  });

  it('loops correctly', async () => {
    let pre, update, render, post, three;
    let count = 0;

    const options = {
      init: false,
      plugins: ['bind', 'loop'],
    };

    three = new THREE.Bootstrap(options);

    three.on('pre', function () {
      pre = count;
      count += 1;
    });
    three.on('update', function () {
      update = count;
      count += 1;
    });
    three.on('render', function () {
      render = count;
      count += 1;
    });
    three.on('post', function () {
      post = count;
      count += 1;
    });

    three.init();

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(pre).toBeGreaterThan(0);
    expect(update).toBeGreaterThan(0);
    expect(render).toBeGreaterThan(0);
    expect(post).toBeGreaterThan(0);

    expect(update).toBeGreaterThan(pre);
    expect(render).toBeGreaterThan(update);
    expect(post).toBeGreaterThan(render);

    three.destroy();
  });
});

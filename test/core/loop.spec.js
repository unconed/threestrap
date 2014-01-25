describe("loop", function () {

  it("installs start/stop methods", function () {

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

  it("starts and stops", function (cb) {

    var options = {
      plugins: ['loop'],
      loop: {
        start: false,
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(three.Loop.running).toBe(false);

    three.Loop.start();

    expect(three.Loop.running).toBe(true);

    three.Loop.stop();

    expect(three.Loop.running).toBe(false);

    three.Loop.start();

    expect(three.Loop.running).toBe(true);

    three.Loop.stop();

    expect(three.Loop.running).toBe(false);

    three.destroy();

  });

  it("loops correctly", function (cb) {

    var pre, update, render, post, three;

    function stall(val) {
      var k, i = 0;
      while (+new Date() <= val) {
        k = ++i * ++i * ++i * ++i * ++i;
      }
    }

    runs(function () {
      var options = {
        init: false,
        plugins: ['loop'],
      };

      three = new THREE.Bootstrap(options);

      three.addEventListener('pre', function () {
        pre = +new Date();
        stall(pre);
      });
      three.addEventListener('render', function () {
        render = +new Date();
        stall(render);
      });
      three.addEventListener('update', function () {
        update = +new Date();
        stall(update);
      });
      three.addEventListener('post', function () {
        post = +new Date();
      });

      three.init();
    });

    waitsFor(function() {
      return pre > 0;
    }, "The pre event should be called", 100);

    waitsFor(function() {
      return update > 0;
    }, "The update event should be called", 100);

    waitsFor(function() {
      return render > 0;
    }, "The render event should be called", 100);

    waitsFor(function() {
      return post > 0;
    }, "The post event should be called", 100);

    runs(function () {
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

});
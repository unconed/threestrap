import * as Threestrap from "../../src";

describe("loop", function () {
  it("installs start/stop methods", function () {
    const options = {
      plugins: ["loop"],
      loop: {
        start: false,
      },
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.Loop.start.call).toBeTruthy();
    expect(three.Loop.stop.call).toBeTruthy();

    three.destroy();
  });

  it("starts and stops", function () {
    const options = {
      plugins: ["loop"],
      loop: {
        start: false,
      },
    };

    const three = new Threestrap.Bootstrap(options);

    let started = false;
    let stopped = false;

    three.on("start", function () {
      started = true;
    });

    three.on("stop", function () {
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

  it("loops correctly", function () {
    let pre, update, render, post, three;

    function stall(val) {
      let k,
        i = 0;
      const delay = 10;
      while (+new Date() <= val + delay) {
        k = ++i * ++i * ++i * ++i * ++i;
      }
    }

    runs(function () {
      const options = {
        init: false,
        plugins: ["bind", "loop"],
      };

      three = new Threestrap.Bootstrap(options);

      three.on("pre", function () {
        pre = +new Date();
        stall(pre);
      });
      three.on("update", function () {
        update = +new Date();
        stall(update);
      });
      three.on("render", function () {
        render = +new Date();
        stall(render);
      });
      three.on("post", function () {
        post = +new Date();
      });

      three.init();
    });

    waitsFor(
      function () {
        return pre > 0;
      },
      "The pre event should be called",
      100
    );

    waitsFor(
      function () {
        return update > 0;
      },
      "The update event should be called",
      100
    );

    waitsFor(
      function () {
        return render > 0;
      },
      "The render event should be called",
      100
    );

    waitsFor(
      function () {
        return post > 0;
      },
      "The post event should be called",
      100
    );

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

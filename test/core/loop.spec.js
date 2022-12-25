import * as Threestrap from "../../src";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

  it("loops correctly", async () =>  {
    const callOrder = []

    const options = {
      init: false,
      plugins: ["bind", "loop"],
    };

    const three = new Threestrap.Bootstrap(options);

    three.on("pre", () => {
      callOrder.push("pre")
    });
    three.on("update", () => {
      callOrder.push("update")
    });
    three.on("render", () => {
      callOrder.push("render")
    });
    three.on("post", () => {
      callOrder.push("post")
      // Lets do two loop iterations, just for fun
      if (callOrder.length > 4) {
        three.Loop.stop();
      }
    });

    three.init();

    await sleep(40)
    expect(callOrder).toEqual(["pre", "update", "render", "post", "pre", "update", "render", "post"])
  });
});

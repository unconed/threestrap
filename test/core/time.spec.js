import * as Threestrap from "../../src";


describe("time", function () {
  /**
   * We prefer synchronous sleep here (stalling) rather than something async
   * (based on setTimeout) because:
   *  - we are performing time calculations, so we want accurate-length sleeps
   *  - setTimeout really only guarantees waiting *at least* the given timespan
   */
  const syncSleep = (sec) => {
    const start = new Date().getTime();
    while (new Date().getTime() < start + sec * 1000) {/** pass */}
  }

  it("installs time values", function () {
    const options = {
      plugins: ["bind", "time"],
    };

    const three = new Threestrap.Bootstrap(options);

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

  it("measures delta / fps correctly", () => {

    const options = {
      plugins: ["bind", "time"],
    };

    const three = new Threestrap.Bootstrap(options);
    const fps = 40;
    const delta = 1 / fps;
    const frames = 5;

    three.trigger({ type: "pre" });

    syncSleep(delta)

    three.trigger({ type: "pre" });

    for (let i = 0; i < frames - 1; ++i) {
      syncSleep(delta)
      three.trigger({ type: "pre" });
    }

    expect(three.Time.now).toBeGreaterThan(0);

    expect(three.Time.clock).toBeGreaterThan(0);
    expect(three.Time.step).toBeGreaterThan(0);

    expect(three.Time.frames).toBe(frames);
    expect(three.Time.time).toBeGreaterThan(0);
    expect(three.Time.delta).toBeGreaterThan(0);

    expect(three.Time.average).toBeGreaterThan(0);
    expect(three.Time.fps).toBeGreaterThan(0);

    expect(Math.abs(three.Time.delta - delta)).toBeLessThan(0.005);
    expect(Math.abs(three.Time.fps - fps)).toBeLessThan(5);
    expect(Math.abs(1 / three.Time.average - fps)).toBeLessThan(5);

    three.destroy();
  });

  it("clock runs at half speed", () => {

    const RATIO = 1 / 2;

    const options = {
      plugins: ["bind", "time"],
      time: { speed: RATIO },
    };

    const three = new Threestrap.Bootstrap(options);
    const frames = 5;
    const fps = 60;
    const delta = 1 / fps;

    three.trigger({ type: "pre" });

    const start = three.Time.now;

    for (let i = 0; i < frames; ++i) {
      syncSleep(delta)
      three.trigger({ type: "pre" });
    }

    const nowTime = three.Time.now - start;
    const realTime = three.Time.time;
    const clockTime = three.Time.clock;

    expect(nowTime).toBeGreaterThan(0);
    expect(realTime).toBeGreaterThan(0);
    expect(clockTime).toBeGreaterThan(0);

    const ratio = clockTime / realTime / RATIO;
    const diff = 1.0 - Math.min(ratio, 1 / ratio);
    expect(diff).toBeLessThan(0.05);

    expect(Math.abs(1.0 / three.Time.step - fps / RATIO)).toBeLessThan(5);

    three.destroy();
  });

  it("clock waits N frames then starts from 0", () => {

    const delay = 5;

    const options = {
      plugins: ["bind", "time"],
      time: { warmup: delay },
    };

    const three = new Threestrap.Bootstrap(options);
    const frames = delay;
    const fps = 60;
    const delta = 1 / fps;

    three.trigger({ type: "pre" });

    for (let i = 0; i < frames; ++i) {
      syncSleep(delta)
      three.trigger({ type: "pre" });
    }

    let clockTime = three.Time.clock;

    expect(clockTime).toBe(0);

    syncSleep(delta)
    three.trigger({ type: "pre" });

    clockTime = three.Time.clock;

    expect(clockTime).toBeGreaterThan(0);
    expect(clockTime).toBeLessThan(delta * 2);

    three.destroy();
  });

  it("clock ignores frames longer than timeout", () => {
    const delay = 5 / 60;

    const options = {
      plugins: ["bind", "time"],
      time: { timeout: delay },
    };

    const three = new Threestrap.Bootstrap(options);
    const frames = 3;
    const fps = 60;
    const delta = 1 / fps;

    for (let i = 0; i < frames; ++i) {
      syncSleep(delta)
      three.trigger({ type: "pre" });
    }

    const start = three.Time.clock;

    syncSleep(delay);
    three.trigger({ type: "pre" });

    let clockTime = three.Time.clock;

    expect(clockTime - start).toBe(0);

    syncSleep(delta)
    three.trigger({ type: "pre" });

    clockTime = three.Time.clock;

    expect(clockTime - start).toBeGreaterThan(0);
    expect(clockTime - start).toBeLessThan(delta * 2);

    three.destroy();
  });
});

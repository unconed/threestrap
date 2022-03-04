/* global THREE */

describe("bind", function () {
  it("binds events", function () {
    let ready = false;
    let foo = false;
    let wtf = false;
    let api;

    const object = {};
    THREE.Binder.apply(object);

    const spec = {
      listen: ["ready", "this.foo:baz", [object, "wtf"]],
      ready: function (event, three) {
        expect(event.type).toBe("ready");
        expect(three instanceof Threestrap.Bootstrap).toBe(true);
        expect(this instanceof Threestrap.Bootstrap.Plugins.mockb).toBe(true);
        ready = true;
      },
      baz: function (event, three) {
        expect(event.type).toBe("foo");
        expect(three instanceof Threestrap.Bootstrap).toBe(true);
        expect(this instanceof Threestrap.Bootstrap.Plugins.mockb).toBe(true);
        foo = true;
      },
      wtf: function (event, three) {
        expect(event.type).toBe("wtf");
        expect(three instanceof Threestrap.Bootstrap).toBe(true);
        expect(this instanceof Threestrap.Bootstrap.Plugins.mockb).toBe(true);
        wtf = true;
      },
    };

    Threestrap.Bootstrap.registerPlugin("mockb", spec);

    const options = {
      plugins: ["bind", "mockb"],
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.bind).toBeTruthy();
    expect(three.unbind).toBeTruthy();

    three.plugins.mockb.trigger({ type: "foo" });
    object.trigger({ type: "wtf" });

    expect(ready).toBe(true);
    expect(foo).toBe(true);
    expect(wtf).toBe(true);

    three.destroy();

    expect(three.bind).toBeFalsy();
    expect(three.unbind).toBeFalsy();

    Threestrap.Bootstrap.unregisterPlugin("mockb", spec);
  });

  it("fires ready events for hot install", function () {
    let ready = false;
    let api;

    const object = {};
    THREE.Binder.apply(object);

    const spec = {
      listen: ["ready"],
      ready: function (event, three) {
        expect(event.type).toBe("ready");
        expect(three instanceof Threestrap.Bootstrap).toBe(true);
        expect(this instanceof Threestrap.Bootstrap.Plugins.mockc).toBe(true);
        ready = true;
      },
    };

    Threestrap.Bootstrap.registerPlugin("mockc", spec);

    const options = {
      plugins: ["bind"],
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.plugins.mockc).toBeFalsy();

    three.install("mockc");

    expect(ready).toBe(true);

    three.destroy();

    Threestrap.Bootstrap.unregisterPlugin("mockc", spec);
  });
});

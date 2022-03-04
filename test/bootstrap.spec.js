/* global THREE */

describe("three", function () {
  it("initializes and destroys once", function () {
    const options = {
      init: false,
      plugins: [],
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.__inited).toEqual(false);

    three.init();

    expect(three.__inited).toEqual(true);
    expect(three.__destroyed).toEqual(false);

    three.destroy();

    expect(three.__destroyed).toEqual(true);

    let called = false;
    three.on("ready", function () {
      called = true;
    });
    three.init();
    expect(called).toBe(false);
  });

  it("autoinits", function () {
    const options = {
      init: true,
      plugins: [],
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.__inited).toEqual(true);

    three.destroy();
  });

  it("installs in an element", function () {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const options = {
      init: true,
      plugins: [],
      element: element,
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.__inited).toEqual(true);
    expect(three.element).toEqual(element);

    three.destroy();

    document.body.removeChild(element);
  });

  it("installs in an element (shorthand)", function () {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const options = {
      init: true,
      plugins: [],
    };

    const three = new Threestrap.Bootstrap(element, options);

    expect(three.__inited).toEqual(true);
    expect(three.element).toEqual(element);

    three.destroy();

    document.body.removeChild(element);
  });

  it("installs in an element (selector)", function () {
    const element = document.createElement("div");
    element.setAttribute("id", "watwatwatselector");
    document.body.appendChild(element);

    const options = {
      init: true,
      plugins: [],
      element: "#watwatwatselector",
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.__inited).toEqual(true);
    expect(three.element).toEqual(element);

    three.destroy();

    document.body.removeChild(element);
  });

  it("fires a ready event", function () {
    let ready = 0;

    const options = {
      init: false,
      plugins: [],
    };

    const three = new Threestrap.Bootstrap(options);
    three.on("ready", function () {
      ready++;
    });

    expect(ready).toBe(0);

    three.init();

    expect(ready).toBe(1);

    three.destroy();

    expect(ready).toBe(1);
  });

  it("adds/removes handlers", function () {
    let update = 0;

    const options = {
      init: false,
      plugins: [],
    };

    const three = new Threestrap.Bootstrap(options);
    let cb;
    three.on(
      "update",
      (cb = function () {
        update++;
      })
    );

    expect(update).toBe(0);

    three.init();

    expect(update).toBe(0);
    three.trigger({ type: "update" });

    expect(update).toBe(1);

    three.trigger({ type: "update" });
    expect(update).toBe(2);

    three.off("update", cb);

    three.trigger({ type: "update" });
    expect(update).toBe(2);

    three.destroy();
  });

  it("installs/uninstall a plugin", function () {
    const spec = {
      install: function () {},
      uninstall: function () {},
      bind: function () {},
      unbind: function () {},
    };

    spyOn(spec, "install");
    spyOn(spec, "uninstall");

    const mock = function () {};
    mock.prototype = spec;

    const options = {
      init: false,
      plugins: ["mock"],
      plugindb: { mock: mock },
      aliasdb: {},
    };

    const three = new Threestrap.Bootstrap(options);

    expect(spec.install.calls.length).toEqual(0);

    three.init();

    expect(spec.uninstall.calls.length).toEqual(0);
    expect(spec.install.calls.length).toEqual(1);

    three.destroy();

    expect(spec.uninstall.calls.length).toEqual(1);
  });

  it("installs/uninstall an aliased plugin", function () {
    const spec = {
      install: function () {},
      uninstall: function () {},
      bind: function () {},
      unbind: function () {},
    };

    spyOn(spec, "install");
    spyOn(spec, "uninstall");

    const mock = function () {};
    mock.prototype = spec;

    const options = {
      init: false,
      aliases: { core: ["mock"] },
      plugins: ["core", "mock:mock2"],
      plugindb: { mock2: mock },
      aliasdb: {},
    };

    const three = new Threestrap.Bootstrap(options);

    expect(spec.install.calls.length).toEqual(0);

    three.init();

    expect(spec.uninstall.calls.length).toEqual(0);
    expect(spec.install.calls.length).toEqual(1);

    three.destroy();

    expect(spec.uninstall.calls.length).toEqual(1);
  });

  it("hot swaps a plugin", function () {
    let ready = false;
    const spec = {
      install: function (three) {
        three.on("ready", function () {
          ready = true;
        });
      },
      uninstall: function () {},
      bind: function () {},
      unbind: function () {},
    };

    spyOn(spec, "install").andCallThrough();
    spyOn(spec, "uninstall");

    const mock = function () {};
    mock.prototype = spec;

    const options = {
      plugins: [],
      plugindb: { mock: mock },
      aliasdb: {},
    };

    const three = new Threestrap.Bootstrap(options);

    expect(spec.install.calls.length).toEqual(0);
    expect(ready).toBe(false);

    three.install("mock");

    expect(spec.uninstall.calls.length).toEqual(0);
    expect(spec.install.calls.length).toEqual(1);
    expect(ready).toBe(true);

    three.uninstall("mock");

    expect(spec.uninstall.calls.length).toEqual(1);

    three.destroy();
  });

  it("expands aliases recursively", function () {
    const installed = [0, 0, 0, 0];
    const spec = function (key) {
      return {
        install: function () {
          installed[key]++;
        },
        uninstall: function () {},
        bind: function () {},
        unbind: function () {},
      };
    };

    const mock1 = function () {};
    const mock2 = function () {};
    const mock3 = function () {};
    const mock4 = function () {};

    mock1.prototype = spec(0);
    mock2.prototype = spec(1);
    mock3.prototype = spec(2);
    mock4.prototype = spec(3);

    const options = {
      plugins: ["foo", "bar"],
      plugindb: { mock1: mock1, mock2: mock2, mock3: mock3, mock4: mock4 },
      aliasdb: {
        foo: "mock1",
        bar: ["mock2", "baz"],
        baz: ["mock3", "mock4"],
      },
    };

    const three = new Threestrap.Bootstrap(options);

    expect(installed[0]).toEqual(1);
    expect(installed[1]).toEqual(1);
    expect(installed[2]).toEqual(1);
    expect(installed[3]).toEqual(1);

    three.destroy();
  });

  it("doesn't allow circular aliases", function () {
    const options = {
      plugins: ["foo"],
      plugindb: {},
      aliasdb: {
        foo: ["bar"],
        bar: ["foo"],
      },
    };

    let caught = false;
    try {
      const three = new Threestrap.Bootstrap(options);
    } catch (e) {
      caught = true;
    }

    expect(caught).toBe(true);
  });

  it("expands custom aliases", function () {
    const installed = [0, 0, 0, 0];
    const spec = function (key) {
      return {
        install: function () {
          installed[key]++;
        },
        uninstall: function () {},
        bind: function () {},
        unbind: function () {},
      };
    };

    const mock1 = function () {};
    const mock2 = function () {};
    const mock3 = function () {};
    const mock4 = function () {};

    mock1.prototype = spec(0);
    mock2.prototype = spec(1);
    mock3.prototype = spec(2);
    mock4.prototype = spec(3);

    const options = {
      plugins: ["foo", "bar"],
      plugindb: { mock1: mock1, mock2: mock2, mock3: mock3, mock4: mock4 },
      aliases: {
        foo: "mock1",
        baz: ["mock3", "mock4"],
      },
      aliasdb: {
        bar: ["mock2", "baz"],
      },
    };

    const three = new Threestrap.Bootstrap(options);

    expect(installed[0]).toEqual(1);
    expect(installed[1]).toEqual(1);
    expect(installed[2]).toEqual(1);
    expect(installed[3]).toEqual(1);

    three.destroy();
  });

  it("passed on plugin options", function () {
    let captured = false;

    const spec = {
      install: function () {},
      uninstall: function () {},
      bind: function () {},
      unbind: function () {},
    };

    const mock = function (options) {
      captured = options;
    };
    mock.prototype = spec;

    const options = {
      init: false,
      mock: {
        foo: "bar",
      },
      plugins: ["mock"],
      plugindb: { mock: mock },
      aliasdb: {},
    };

    const three = new Threestrap.Bootstrap(options);

    three.init();

    expect(captured.foo).toBe("bar");

    three.destroy();
  });

  it("autoinits core", function () {
    const three = new Threestrap.Bootstrap();

    expect(three.__inited).toEqual(true);

    three.destroy();
  });
});

/* global Threestrap */

describe("plugin", function () {
  it("registers a plugin", function () {
    var spec = {};

    expect(Threestrap.Bootstrap.Plugins.mockp1).toBeFalsy();

    Threestrap.Bootstrap.registerPlugin("mockp1", spec);

    expect(new Threestrap.Bootstrap.Plugins.mockp1()).toEqual(
      jasmine.any(Threestrap.Bootstrap.Plugin)
    );

    Threestrap.Bootstrap.unregisterPlugin("mockp1", spec);

    expect(Threestrap.Bootstrap.Plugins.mockp1).toBeFalsy();
  });

  it("sets defaults", function () {
    var captured = {};

    var spec = {
      install: function () {
        captured = this.options;
      },
      defaults: {
        foo: "bar",
        foos: "bars",
      },
    };

    Threestrap.Bootstrap.registerPlugin("mockp2", spec);

    var options = {
      init: false,
      mockp2: {
        foo: "baz",
      },
      plugins: ["mockp2"],
    };

    var three = new Threestrap.Bootstrap(options);

    three.init();

    expect(captured.foo).toBe("baz");
    expect(captured.foos).toBe("bars");

    three.destroy();

    Threestrap.Bootstrap.unregisterPlugin("mockp2", spec);
  });
});

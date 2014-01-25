describe("plugin", function () {

  it("registers a plugin", function () {

    var spec = {};

    expect(THREE.Bootstrap.Plugins.mockp1).toBeFalsy();

    THREE.Bootstrap.registerPlugin('mockp1', spec);

    expect(new THREE.Bootstrap.Plugins.mockp1()).toEqual(jasmine.any(THREE.Bootstrap.Plugin));

    THREE.Bootstrap.unregisterPlugin('mockp1', spec);

    expect(THREE.Bootstrap.Plugins.mockp1).toBeFalsy();
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

    THREE.Bootstrap.registerPlugin('mockp2', spec);

    var options = {
      init: false,
      mockp2: {
        foo: "baz",
      },
      plugins: ['mockp2'],
    };

    var three = new THREE.Bootstrap(options);

    three.init();

    expect(captured.foo).toBe('baz');
    expect(captured.foos).toBe('bars');

    three.destroy();

    THREE.Bootstrap.unregisterPlugin('mockp2', spec);

  });

});

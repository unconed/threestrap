describe("plugin", function () {

  it("registers a plugin", function () {

    var spec = {
      install: function () {},
      uninstall: function () {},
    };

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

    var bootstrap = new THREE.Bootstrap(options);

    bootstrap.init();

    expect(captured.foo).toBe('baz');
    expect(captured.foos).toBe('bars');

    bootstrap.destroy();

    THREE.Bootstrap.unregisterPlugin('mockp2', spec);

  });

  it("api sends change events", function () {

    var captured;
    var fired = true;
    var api;

    var spec = {
      install: function () {
        api = this.api();

        this.addEventListener('change', function () {
          captured = this.options;
        });
      },
    };

    THREE.Bootstrap.registerPlugin('mockp3', spec);

    var options = {
      init: false,
      plugins: ['mockp3'],
    };

    var bootstrap = new THREE.Bootstrap(options);

    bootstrap.init();

    api.set({ foo: 'wtf' });
    expect(captured.foo).toBe('wtf');

    bootstrap.destroy();

    THREE.Bootstrap.unregisterPlugin('mockp3', spec);

  });

});

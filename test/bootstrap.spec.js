describe("three", function () {

  it("initializes and destroys once", function () {

    var options = {
      init: false,
      plugins: [],
    };

    var three = new THREE.Bootstrap(options);

    expect(three.__inited).toEqual(false);

    three.init();

    expect(three.__inited).toEqual(true);
    expect(three.__destroyed).toEqual(false);

    three.destroy();

    expect(three.__destroyed).toEqual(true);

    var called = false;
    three.on('ready', function () { called = true; });
    three.init();
    expect(called).toBe(false);

  });

  it("autoinits", function () {

    var options = {
      init: true,
      plugins: [],
    };

    var three = new THREE.Bootstrap(options);

    expect(three.__inited).toEqual(true);

    three.destroy();
  });

  it("installs in an element", function () {

    var element = document.createElement('div');
    document.body.appendChild(element);

    var options = {
      init: true,
      plugins: [],
      element: element,
    };

    var three = new THREE.Bootstrap(options);

    expect(three.__inited).toEqual(true);
    expect(three.element).toEqual(element);

    three.destroy();

    document.body.removeChild(element);
  });

  it("installs in an element (shorthand)", function () {

    var element = document.createElement('div');
    document.body.appendChild(element);

    var options = {
      init: true,
      plugins: [],
    };

    var three = new THREE.Bootstrap(element, options);

    expect(three.__inited).toEqual(true);
    expect(three.element).toEqual(element);

    three.destroy();

    document.body.removeChild(element);
  });

  it("installs in an element (selector)", function () {

    var element = document.createElement('div');
    element.setAttribute('id', 'watwatwatselector');
    document.body.appendChild(element);

    var options = {
      init: true,
      plugins: [],
      element: '#watwatwatselector'
    };

    var three = new THREE.Bootstrap(options);

    expect(three.__inited).toEqual(true);
    expect(three.element).toEqual(element);

    three.destroy();

    document.body.removeChild(element);
  });

  it('fires a ready event', function () {

    var ready = 0;

    var options = {
      init: false,
      plugins: [],
    };

    var three = new THREE.Bootstrap(options);
    three.on('ready', function () { ready++; });

    expect(ready).toBe(0);

    three.init();

    expect(ready).toBe(1);

    three.destroy();

    expect(ready).toBe(1);
  });

  it('adds/removes handlers', function () {

    var update = 0;

    var options = {
      init: false,
      plugins: [],
    };

    var three = new THREE.Bootstrap(options);
    var cb;
    three.on('update', cb = function () { update++; });

    expect(update).toBe(0);

    three.init();

    expect(update).toBe(0);
    three.trigger({ type: 'update' });

    expect(update).toBe(1);

    three.trigger({ type: 'update' });
    expect(update).toBe(2);

    three.off('update', cb);

    three.trigger({ type: 'update' });
    expect(update).toBe(2);

    three.destroy();

  });

  it("installs/uninstall a plugin", function () {

    var spec = {
      install: function () {},
      uninstall: function () {},
      bind: function () {},
      unbind: function () {},
    };

    spyOn(spec, 'install');
    spyOn(spec, 'uninstall');

    var mock = function () {};
    mock.prototype = spec;

    var options = {
      init: false,
      plugins: ['mock'],
      plugindb: { mock: mock },
      aliasdb: {},
    };

    var three = new THREE.Bootstrap(options);

    expect(spec.install.calls.length).toEqual(0);

    three.init();

    expect(spec.uninstall.calls.length).toEqual(0);
    expect(spec.install.calls.length).toEqual(1);

    three.destroy();

    expect(spec.uninstall.calls.length).toEqual(1);
  });

  it("installs/uninstall an aliased plugin", function () {

    var spec = {
      install: function () {},
      uninstall: function () {},
      bind: function () {},
      unbind: function () {},
    };

    spyOn(spec, 'install');
    spyOn(spec, 'uninstall');

    var mock = function () {};
    mock.prototype = spec;

    var options = {
      init: false,
      aliases: {'core': ['mock']},
      plugins: ['core', 'mock:mock2'],
      plugindb: { mock2: mock },
      aliasdb: {},
    };

    var three = new THREE.Bootstrap(options);

    expect(spec.install.calls.length).toEqual(0);

    three.init();

    expect(spec.uninstall.calls.length).toEqual(0);
    expect(spec.install.calls.length).toEqual(1);

    three.destroy();

    expect(spec.uninstall.calls.length).toEqual(1);
  });

  it("hot swaps a plugin", function () {

    var ready = false;
    var spec = {
      install: function (three) {
        three.on('ready', function () { ready = true });
      },
      uninstall: function () {},
      bind: function () {},
      unbind: function () {},
    };

    spyOn(spec, 'install').andCallThrough();
    spyOn(spec, 'uninstall');

    var mock = function () {};
    mock.prototype = spec;

    var options = {
      plugins: [],
      plugindb: { mock: mock },
      aliasdb: {},
    };

    var three = new THREE.Bootstrap(options);

    expect(spec.install.calls.length).toEqual(0);
    expect(ready).toBe(false);

    three.install('mock');

    expect(spec.uninstall.calls.length).toEqual(0);
    expect(spec.install.calls.length).toEqual(1);
    expect(ready).toBe(true);

    three.uninstall('mock');

    expect(spec.uninstall.calls.length).toEqual(1);

    three.destroy();

  });

  it("expands aliases recursively", function () {

    var installed = [0, 0, 0, 0];
    var spec = function (key) {
      return {
        install: function () { installed[key]++; },
        uninstall: function () {},
        bind: function () {},
        unbind: function () {},
      };
    }

    var mock1 = function () {};
    var mock2 = function () {};
    var mock3 = function () {};
    var mock4 = function () {};

    mock1.prototype = spec(0);
    mock2.prototype = spec(1);
    mock3.prototype = spec(2);
    mock4.prototype = spec(3);

    var options = {
      plugins: ['foo', 'bar'],
      plugindb: { mock1: mock1, mock2: mock2, mock3: mock3, mock4: mock4 },
      aliasdb: {
        foo: 'mock1',
        bar: ['mock2', 'baz'],
        baz: ['mock3', 'mock4'],
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(installed[0]).toEqual(1);
    expect(installed[1]).toEqual(1);
    expect(installed[2]).toEqual(1);
    expect(installed[3]).toEqual(1);

    three.destroy();
  });

  it("doesn't allow circular aliases", function () {

    var options = {
      plugins: ['foo'],
      plugindb: { },
      aliasdb: {
        foo: ['bar'],
        bar: ['foo'],
      },
    };

    var caught = false;
    try { var three = new THREE.Bootstrap(options); } catch (e) { caught = true };

    expect(caught).toBe(true);
  });

  it("expands custom aliases", function () {

    var installed = [0, 0, 0, 0];
    var spec = function (key) {
      return {
        install: function () { installed[key]++; },
        uninstall: function () {},
        bind: function () {},
        unbind: function () {},
      };
    }

    var mock1 = function () {};
    var mock2 = function () {};
    var mock3 = function () {};
    var mock4 = function () {};

    mock1.prototype = spec(0);
    mock2.prototype = spec(1);
    mock3.prototype = spec(2);
    mock4.prototype = spec(3);

    var options = {
      plugins: ['foo', 'bar'],
      plugindb: { mock1: mock1, mock2: mock2, mock3: mock3, mock4: mock4 },
      aliases: {
        foo: 'mock1',
        baz: ['mock3', 'mock4'],
      },
      aliasdb: {
        bar: ['mock2', 'baz'],
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(installed[0]).toEqual(1);
    expect(installed[1]).toEqual(1);
    expect(installed[2]).toEqual(1);
    expect(installed[3]).toEqual(1);

    three.destroy();
  });

  it("passed on plugin options", function () {

    var captured = false;

    var spec = {
      install: function () {},
      uninstall: function () {},
      bind: function () {},
      unbind: function () {},
    };

    var mock = function (options) {
      captured = options;
    };
    mock.prototype = spec;

    var options = {
      init: false,
      mock: {
        foo: 'bar',
      },
      plugins: ['mock'],
      plugindb: { mock: mock },
      aliasdb: {},
    };

    var three = new THREE.Bootstrap(options);

    three.init();

    expect(captured.foo).toBe('bar');

    three.destroy();
  });

  it("autoinits core", function () {

    var three = new THREE.Bootstrap();

    expect(three.__inited).toEqual(true);

    three.destroy();

  });


});

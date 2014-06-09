describe("bind", function () {

  it("binds events", function () {

    var ready = false;
    var foo = false;
    var wtf = false;
    var api;

    var object = {};
    THREE.Binder.apply(object);

    var spec = {
      listen: ['ready', 'this.foo:baz', [object, 'wtf']],
      ready: function (event, three) {
        expect(event.type).toBe('ready');
        expect(three instanceof THREE.Bootstrap).toBe(true);
        expect(this instanceof THREE.Bootstrap.Plugins.mockb).toBe(true);
        ready = true;
      },
      baz: function (event, three) {
        expect(event.type).toBe('foo');
        expect(three instanceof THREE.Bootstrap).toBe(true);
        expect(this instanceof THREE.Bootstrap.Plugins.mockb).toBe(true);
        foo = true;
      },
      wtf: function (event, three) {
        expect(event.type).toBe('wtf');
        expect(three instanceof THREE.Bootstrap).toBe(true);
        expect(this instanceof THREE.Bootstrap.Plugins.mockb).toBe(true);
        wtf = true;
      },
    };

    THREE.Bootstrap.registerPlugin('mockb', spec);

    var options = {
      plugins: ['bind','mockb'],
    };

    var three = new THREE.Bootstrap(options);

    expect(three.bind).toBeTruthy();
    expect(three.unbind).toBeTruthy();

    three.plugins.mockb.trigger({ type: 'foo' });
    object.trigger({ type: 'wtf' });

    expect(ready).toBe(true);
    expect(foo).toBe(true);
    expect(wtf).toBe(true);

    three.destroy();

    expect(three.bind).toBeFalsy();
    expect(three.unbind).toBeFalsy();

    THREE.Bootstrap.unregisterPlugin('mockb', spec);

  });

  it("fires ready events for hot install", function () {

    var ready = false;
    var api;

    var object = {};
    THREE.Binder.apply(object);

    var spec = {
      listen: ['ready'],
      ready: function (event, three) {
        expect(event.type).toBe('ready');
        expect(three instanceof THREE.Bootstrap).toBe(true);
        expect(this instanceof THREE.Bootstrap.Plugins.mockc).toBe(true);
        ready = true;
      },
    };

    THREE.Bootstrap.registerPlugin('mockc', spec);

    var options = {
      plugins: ['bind'],
    };

    var three = new THREE.Bootstrap(options);

    expect(three.plugins.mockc).toBeFalsy();

    three.install('mockc');

    expect(ready).toBe(true);

    three.destroy();

    THREE.Bootstrap.unregisterPlugin('mockc', spec);

  });

});
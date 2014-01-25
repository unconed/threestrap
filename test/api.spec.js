describe('api', function () {

  it("sends change events", function () {

    var captured = {};
    var fired = true;
    var api;

    var klass = function () {
      api = this.api({});
    };

    THREE.Binder.apply(klass.prototype);
    THREE.Api.apply(klass.prototype);

    var o = new klass();
    o.on('change', function (event) {
      captured = event.changes;
      expect(event.changes.foo).toBe(this.options.foo);
    });

    api.set({ foo: 'wtf' });
    expect(captured.foo).toBe('wtf');

  });

});
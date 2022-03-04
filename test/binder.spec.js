/* global THREE */

describe("binder", function () {
  it("binds/unbinds events", function () {
    let ready = 0;
    let foo = 0;
    let wtf = 0;

    const context = {};
    THREE.Binder.apply(context);

    var object = {
      listen: ["ready", "this.foo:baz", [context, "wtf"]],
      ready: function (event, _context) {
        expect(event.type).toBe("ready");
        expect(context).toBe(_context);
        expect(this).toBe(object);
        ready++;
      },
      baz: function (event, _context) {
        expect(event.type).toBe("foo");
        expect(context).toBe(_context);
        expect(this).toBe(object);
        foo++;
      },
      wtf: function (event, _context) {
        expect(event.type).toBe("wtf");
        expect(context).toBe(_context);
        expect(this).toBe(object);
        wtf++;
      },
    };
    THREE.Binder.apply(object);

    const bind = THREE.Binder.bind(context, {});
    const unbind = THREE.Binder.unbind(context);

    _.each(object.listen, function (key) {
      bind(key, object);
    });

    expect(ready).toBe(0);
    expect(foo).toBe(0);
    expect(wtf).toBe(0);

    context.trigger({ type: "ready" });
    object.trigger({ type: "foo" });
    context.trigger({ type: "wtf" });

    expect(ready).toBe(1);
    expect(foo).toBe(1);
    expect(wtf).toBe(1);

    unbind(object);

    context.trigger({ type: "ready" });
    object.trigger({ type: "foo" });
    context.trigger({ type: "wtf" });

    expect(ready).toBe(1);
    expect(foo).toBe(1);
    expect(wtf).toBe(1);
  });

  it("binds/unbinds once events", function () {
    let ready = 0;

    const context = {};
    THREE.Binder.apply(context);

    var object = {
      listen: ["ready"],
      ready: function (event, _context) {
        expect(event.type).toBe("ready");
        expect(context).toBe(_context);
        expect(this).toBe(object);
        ready++;
      },
    };
    THREE.Binder.apply(object);

    const bind = THREE.Binder.bind(context, {});
    const unbind = THREE.Binder.unbind(context);

    _.each(object.listen, function (key) {
      bind(key, object);
    });

    expect(ready).toBe(0);

    context.triggerOnce({ type: "ready" });

    expect(ready).toBe(1);

    context.triggerOnce({ type: "ready" });

    expect(ready).toBe(1);

    unbind(object);

    expect(ready).toBe(1);
  });
});

/* global THREE */

describe("api", function () {
  it("sends change events", function () {
    let captured = {};
    let api;

    const klass = function () {
      api = this.api({});
    };

    THREE.Binder.apply(klass.prototype);
    THREE.Api.apply(klass.prototype);

    const o = new klass();
    o.on("change", function (event) {
      captured = event.changes;
      expect(event.changes.foo).toBe(this.options.foo);
    });

    api.set({ foo: "wtf" });
    expect(captured.foo).toBe("wtf");
  });
});

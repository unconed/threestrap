describe("controls", function () {

  it("install controls", function () {

    var captured = false;
    var klass = function (object, domElement) {
      expect(object instanceof THREE.Camera).toBe(true);
      expect(domElement.tagName).toBe('CANVAS');
    };
    klass.prototype = {
      update: function (delta) {
        captured = delta > 0;
      },
    }

    var options = {
      plugins: ['bind', 'renderer', 'camera', 'controls'],
      controls: {
        klass: klass,
        parameters: {
          foo: 'bar',
        },
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(three.controls instanceof klass).toBe(true);

    three.dispatchEvent({ type: 'update' });

    expect(captured).toBe(true);

    expect(three.controls.foo).toBe('bar');

    three.destroy();
  });

  it("responds to camera changes", function () {

    var options = {
      plugins: ['bind', 'renderer', 'camera', 'controls'],
      controls: {
        klass: THREE.OrbitControls,
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(three.controls.object).toBe(three.camera);

    three.Camera.set({
      type: 'orthographic',
    });

    expect(three.controls.object).toBe(three.camera);

    three.destroy();
  });

});
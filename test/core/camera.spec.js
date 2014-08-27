describe("camera", function () {

  it("installs a perspective camera", function () {

    var options = {
      plugins: ['camera'],
      camera: {
        fov: 42,
        near: 1,
        far: 2,
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(three.camera instanceof THREE.PerspectiveCamera).toBeTruthy();
    expect(three.camera.fov).toEqual(42);
    expect(three.camera.near).toEqual(1);
    expect(three.camera.far).toEqual(2);

    three.destroy();

  });

  it("installs an orthographic camera", function () {

    var options = {
      plugins: ['camera'],
      camera: {
        type: 'orthographic',
        left: 0,
        right: 1,
        top: 2,
        bottom: 3,
        near: 4,
        far: 5,
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(three.camera instanceof THREE.OrthographicCamera).toBeTruthy();
    expect(three.camera.left).toEqual(0);
    expect(three.camera.right).toEqual(1);
    expect(three.camera.top).toEqual(2);
    expect(three.camera.bottom).toEqual(3);
    expect(three.camera.near).toEqual(4);
    expect(three.camera.far).toEqual(5);

    three.destroy();

  });

  it("installs a custom camera", function () {

    var captured = null;

    var klass = function (parameters) {
      captured = parameters.foo;
      this.left = -1;
      this.right = 0;
      this.top = 0;
      this.bottom = 0;
      this.near = 0;
      this.far = 0;
    };
    klass.prototype = new THREE.OrthographicCamera();

    var options = {
      plugins: ['camera'],
      camera: {
        klass: klass,
        parameters: { foo: 'bar' },
        left: 0,
        right: 1,
        top: 2,
        bottom: 3,
        near: 4,
        far: 5,
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(captured).toBe('bar');

    expect(three.camera instanceof klass).toBeTruthy();
    expect(three.camera.left).toEqual(0);
    expect(three.camera.right).toEqual(1);
    expect(three.camera.top).toEqual(2);
    expect(three.camera.bottom).toEqual(3);
    expect(three.camera.near).toEqual(4);
    expect(three.camera.far).toEqual(5);

    three.destroy();

  });

  it("sets the aspect ratio when resizing", function () {

    var element = document.createElement('div');
    element.style.width = "12px";
    element.style.height = "8px";
    document.body.appendChild(element);

    var options = {
      element: element,
      plugins: ['bind', 'renderer', 'size', 'camera'],
    };

    var three = new THREE.Bootstrap(options);

    expect(three.camera.aspect).toBe(1.5);

    three.destroy();

    document.body.removeChild(element);
  });

  it("recreates the camera when needed", function () {

    var options = {
      plugins: ['bind', 'camera'],
      camera: {
        type: 'orthographic',
        left: 0,
        right: 1,
        top: 2,
        bottom: 3,
        near: 4,
        far: 5,
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(three.camera instanceof THREE.OrthographicCamera).toBeTruthy();
    expect(three.camera.left).toEqual(0);
    expect(three.camera.right).toEqual(1);
    expect(three.camera.top).toEqual(2);
    expect(three.camera.bottom).toEqual(3);
    expect(three.camera.near).toEqual(4);
    expect(three.camera.far).toEqual(5);

    var old = three.camera;
    three.Camera.set({
      near: -5,
      far: 5,
    });
    expect(three.camera).toEqual(old);
    expect(three.camera.near).toEqual(-5);
    expect(three.camera.far).toEqual(5);

    three.Camera.set({
      type: 'perspective',
      fov: 42,
      near: 1,
      far: 2,
    });

    expect(three.camera instanceof THREE.PerspectiveCamera).toBeTruthy();
    expect(three.camera.fov).toEqual(42);
    expect(three.camera.near).toEqual(1);
    expect(three.camera.far).toEqual(2);

    three.destroy();

  });

});
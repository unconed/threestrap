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

  it("sets the aspect ratio when resizing", function () {

    var element = document.createElement('div');
    element.style.width = "12px";
    element.style.height = "8px";
    document.body.appendChild(element);

    var options = {
      element: element,
      plugins: ['size', 'camera'],
    };

    var three = new THREE.Bootstrap(options);

    expect(three.camera.aspect).toBe(1.5);

    three.destroy();

    document.body.removeChild(element);
  });

  it("can recreate the camera", function () {

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
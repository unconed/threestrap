describe("render", function () {

  it("renders the scene on update", function () {

    var options = {
      plugins: ['bind', 'renderer', 'render'],
    };

    var three = new THREE.Bootstrap(options);

    three.scene = new THREE.Scene();
    three.camera = new THREE.PerspectiveCamera();

    expect(three.scene.__webglObjects).toBeFalsy();

    three.dispatchEvent({ type: 'render' });

    expect(three.scene.__webglObjects).toBeTruthy();

    three.destroy();

  });

});
describe("render", function () {

  it("renders the scene on update", function () {

    var options = {
      plugins: ['bind', 'renderer', 'render'],
    };

    var three = new THREE.Bootstrap(options);

    three.scene = new THREE.Scene();
    three.camera = new THREE.PerspectiveCamera();

    called = 0;
    three.renderer.render = function () { called++; }

    three.dispatchEvent({ type: 'render' });

    expect(called).toBe(1);

    three.destroy();

  });

});
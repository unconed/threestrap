describe("warmup", function () {

  it("hides canvas", function () {

    var n = 3;

    var options = {
      plugins: ['bind', 'renderer', 'warmup'],
      warmup: {
        delay: n,
      }
    };

    var three = new THREE.Bootstrap(options);

    expect(three.renderer.domElement.style.visibility).toBe('hidden');

    for (var i = 0; i < n; ++i) {
      three.trigger({ type: 'pre' });
      three.trigger({ type: 'post' });
      expect(three.renderer.domElement.style.visibility).toBe('hidden');
    }

    three.trigger({ type: 'pre' });
    three.trigger({ type: 'post' });
    expect(three.renderer.domElement.style.visibility).toBe('visible');

    three.destroy();
  });

});
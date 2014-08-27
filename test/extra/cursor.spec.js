describe("cursor", function () {

  it("sets and autohides the cursor", function () {

    var options = {
      plugins: ['bind', 'renderer', 'camera', 'cursor'],
      cursor: {
        hide: true,
        timeout: 1,
        cursor: 'pointer',
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(three.element.style.cursor).toBe('pointer');

    three.trigger({ type: 'update' })

    expect(three.element.style.cursor).toBe('pointer');

    for (var i = 0; i < 65; ++i) {
      three.trigger({ type: 'update' })
    }

    expect(three.element.style.cursor).toBe('none');

    three.plugins.cursor.mousemove({ type: 'mousemove' }, three);

    expect(three.element.style.cursor).toBe('pointer');

    for (var i = 0; i < 65; ++i) {
      three.trigger({ type: 'update' })
    }

    expect(three.element.style.cursor).toBe('none');

    three.destroy();
  });

  it("sets the cursor contextually", function () {

    var options = {
      plugins: ['bind', 'renderer', 'camera', 'controls', 'cursor'],
      controls: {
        klass: THREE.OrbitControls,
      },
    };

    var three = new THREE.Bootstrap(options);

    expect(three.element.style.cursor).toBe('move');

    three.trigger({ type: 'update' })

    expect(three.element.style.cursor).toBe('move');

    three.uninstall('controls');

    expect(three.element.style.cursor).toBe('');

    three.install('controls');

    expect(three.element.style.cursor).toBe('move');

    three.destroy();
  });

});
describe("fallback", function () {

  it("displays a fallback, halts install, and cleans up on uninstall", function () {

    var options = {
      plugins: ['fallback', 'renderer'],
      fallback: { force: true, klass: 'fallback-test', style: 'color: red', message: '<span class="wat">wat</span>' },
    };

    var getNode = function () { return document.querySelector('.fallback-test') };
    var getSpan = function () { return document.querySelector('.fallback-test span.wat') };

    expect(getNode()).toBe(null);
    expect(getSpan()).toBe(null);

    var three = new THREE.Bootstrap(options);

    node = getNode()
    expect(node).toBeTruthy();
    expect(node.style.color).toBe('red');
    expect(getSpan()).toBeTruthy();

    expect(three.renderer).toBeFalsy();
    expect(three.fallback).toBe(true);

    three.destroy();

    expect(getNode()).toBe(null);
    expect(getSpan()).toBe(null);
  });

  it("installs the fill plugin on failure", function () {

    var options = {
      plugins: ['fallback', 'renderer'],
      fallback: { force: true },
    };

    var three = new THREE.Bootstrap(options);

    expect(three.plugins.fill).toBeTruthy();
    expect(three.renderer).toBeFalsy();

    three.destroy();

  });

  it("doesn't interfere", function () {

    var options = {
      plugins: ['fallback', 'renderer'],
    };

    var three = new THREE.Bootstrap(options);

    expect(three.fallback).toBe(false);

    three.destroy();

  });

});
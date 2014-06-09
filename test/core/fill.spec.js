describe("fill", function () {

  it("sets/unsets html, body height", function () {

    function test() {
      return document.body.style.height == '100%' &&
             document.documentElement.style.height == '100%';
    }

    var options = {
      plugins: ['fill'],
    };

    expect(test()).toBe(false);

    var three = new THREE.Bootstrap(options);

    expect(test()).toBe(true);

    three.destroy();

    expect(test()).toBe(false);
  });

  it("makes the canvas a block element", function () {

    function test() {
      canvas = document.querySelector('canvas');
      return canvas && canvas.style.display == 'block';
    }

    var options = {
      plugins: ['renderer', 'fill'],
    };

    expect(test()).toBeFalsy();

    var three = new THREE.Bootstrap(options);

    expect(test()).toBe(true);

    three.destroy();

    expect(test()).toBeFalsy();
  });

  it("makes the containing element have layout", function () {

    function test() {
      canvas = document.querySelector('canvas');
      return canvas && canvas.parentNode.style.position == 'relative';
    }

    var element = document.createElement('div');
    document.body.appendChild(element);

    var options = {
      plugins: ['renderer', 'fill'],
      element: element,
    };

    expect(test()).toBeFalsy();

    var three = new THREE.Bootstrap(options);

    expect(test()).toBe(true);

    three.destroy();

    expect(test()).toBeFalsy();

    document.body.removeChild(element);
  });

});
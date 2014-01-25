describe('renderer', function () {

  it("installs the canvas into the body", function () {

    var options = {
      init: false,
      plugins: ['renderer'],
    };

    var three = new THREE.Bootstrap(options);

    expect(document.querySelectorAll('canvas').length).toBe(0);

    three.init();

    expect(document.querySelectorAll('canvas').length).toBe(1);

    expect(three.renderer).toEqual(jasmine.any(THREE.WebGLRenderer));
    expect(three.renderer.domElement.parentNode).toEqual(document.body);

    three.destroy();

    expect(document.querySelectorAll('canvas').length).toBe(0);

  });

  it("installs the canvas into an element", function () {

    var element = document.createElement('div');
    document.body.appendChild(element);

    var options = {
      init: false,
      element: element,
      plugins: ['renderer'],
    };

    var three = new THREE.Bootstrap(options);

    expect(document.querySelectorAll('canvas').length).toBe(0);

    three.init();

    expect(document.querySelectorAll('canvas').length).toBe(1);

    expect(three.renderer).toEqual(jasmine.any(THREE.WebGLRenderer));
    expect(three.renderer.domElement.parentNode).toEqual(element);

    three.destroy();

    expect(document.querySelectorAll('canvas').length).toBe(0);

    document.body.removeChild(element);
  });

});
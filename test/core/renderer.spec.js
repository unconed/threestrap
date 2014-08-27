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

  it("calls renderer setSize", function () {

    var element = document.createElement('div');
    document.body.appendChild(element);

    var options = {
      init: false,
      element: element,
      plugins: ['renderer'],
    };

    var three = new THREE.Bootstrap(options);

    var called = 0;
    var callback = function () { called++; };

    three.init();
    three.renderer.setSize = callback;
    three.plugins.renderer.resize({ renderWidth: 5, renderHeight: 4, viewWidth: 3, viewHeight: 2, aspect: 3/2 }, three);
    three.destroy();

    expect(called).toBe(1);
  });

  it("calls renderer setSize and setRenderSize", function () {

    var element = document.createElement('div');
    document.body.appendChild(element);

    var options = {
      init: false,
      element: element,
      plugins: ['renderer'],
    };

    var three = new THREE.Bootstrap(options);

    var called = 0;
    var callback = function () { called++; };

    three.init();
    el = three.renderer.domElement
    three.renderer.domElement = document.createElement('div')
    three.renderer.setSize = callback;
    three.renderer.setRenderSize = callback;
    three.plugins.renderer.resize({ renderWidth: 5, renderHeight: 4, viewWidth: 3, viewHeight: 2, aspect: 3/2 }, three);
    three.renderer.domElement = el
    three.destroy();

    expect(called).toBe(2);
  });

});
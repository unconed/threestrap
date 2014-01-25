describe("size", function () {

  it("fits the canvas in an element", function () {

    var element = document.createElement('div');
    element.style.width = "451px";
    element.style.height = "251px";
    document.body.appendChild(element);

    var options = {
      element: element,
      plugins: ['size'],
    };

    var three = new THREE.Bootstrap(options);

    var canvas = three.renderer.domElement;

    expect(canvas.width).toBe(451);
    expect(canvas.height).toBe(251);

    three.destroy();

    document.body.removeChild(element);
  });

  it("applies width, height, scale", function () {

    var options = {
      init: false,
      size: {
        width: 230,
        height: 130,
        scale: 1/2,
      },
      plugins: ['size'],
    };

    var three = new THREE.Bootstrap(options);

    var h;
    three.addEventListener('resize', h = function (event) {
      expect(event.viewWidth).toBe(options.size.width);
      expect(event.viewHeight).toBe(options.size.height);

      expect(event.renderWidth).toBe(options.size.width * options.size.scale);
      expect(event.renderHeight).toBe(options.size.height * options.size.scale);
    });

    three.init();

    three.removeEventListener('resize', h);

    three.destroy();
  });

  it("caps resolution while retaining aspect wide", function () {

    var options = {
      init: false,
      plugins: ['size'],
      size: {
        width: 600,
        height: 400,
        capWidth: 300,
        capHeight: 300,
      },
    };

    var three = new THREE.Bootstrap(options);

    three.addEventListener('resize', function (event) {
      expect(event.renderWidth).toBe(300);
      expect(event.renderHeight).toBe(200);
    });

    three.init();

    three.destroy();

  });

  it("caps resolution while retaining aspect tall", function () {

    var options = {
      init: false,
      plugins: ['size'],
      size: {
        width: 400,
        height: 600,
        capWidth: 300,
        capHeight: 300,
      },
    };

    var three = new THREE.Bootstrap(options);

    three.addEventListener('resize', function (event) {
      expect(event.renderWidth).toBe(200);
      expect(event.renderHeight).toBe(300);
    });

    three.init();

    three.destroy();

  });

  it("applies width, height, scale, aspect wide", function () {

    var options = {
      init: false,
      size: {
        width: 500,
        height: 500,
        aspect: 5/4,
        scale: 1/2,
      },
      plugins: ['size'],
    };

    var three = new THREE.Bootstrap(options);

    three.addEventListener('resize', function (event) {
      expect(event.viewWidth).toBe(500);
      expect(event.viewHeight).toBe(400);

      expect(event.renderWidth).toBe(250);
      expect(event.renderHeight).toBe(200);
    });

    three.init();

    three.destroy();
  });

  it("applies width, height, scale, aspect tall", function () {

    var options = {
      init: false,
      size: {
        width: 500,
        height: 500,
        aspect: 4/5,
        scale: 1/2,
      },
      plugins: ['size'],
    };

    var three = new THREE.Bootstrap(options);

    three.addEventListener('resize', function (event) {
      expect(event.viewWidth).toBe(400);
      expect(event.viewHeight).toBe(500);

      expect(event.renderWidth).toBe(200);
      expect(event.renderHeight).toBe(250);
    });

    three.init();

    three.destroy();
  });

  it("changes on set", function () {

    var element = document.createElement('div');
    element.style.width = "451px";
    element.style.height = "251px";
    document.body.appendChild(element);

    var options = {
      element: element,
      plugins: ['size'],
    };

    options = {
      width: 500,
      height: 500,
      aspect: 5/4,
      scale: 1/2,
      capWidth: 150,
      capHeight: 100,
    };

    var three = new THREE.Bootstrap(options);

    three.addEventListener('resize', function (event) {
      expect(event.viewWidth).toBe(500);
      expect(event.viewHeight).toBe(400);

      expect(event.renderWidth).toBe(125);
      expect(event.renderHeight).toBe(100);
    });

    three.Size.set(options);

    three.destroy();
  });

});
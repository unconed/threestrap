describe("size", function () {

  it("fits the canvas in an element", function () {

    var element = document.createElement('div');
    element.style.width = "451px";
    element.style.height = "251px";
    document.body.appendChild(element);

    var options = {
      element: element,
      plugins: ['bind', 'renderer', 'size'],
      size: {
        devicePixelRatio: false,
      },
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
        devicePixelRatio: false,
      },
      plugins: ['bind', 'renderer', 'size'],
    };

    var three = new THREE.Bootstrap(options);

    var h;
    three.on('resize', h = function (event) {
      expect(event.pixelRatio).toBe(event.renderHeight / event.viewHeight);

      expect(event.viewWidth).toBe(options.size.width);
      expect(event.viewHeight).toBe(options.size.height);

      expect(event.renderWidth).toBe(options.size.width * options.size.scale);
      expect(event.renderHeight).toBe(options.size.height * options.size.scale);
    });

    three.init();

    three.destroy();
  });

  it("applies devicepixelratio", function () {

    var options = {
      init: false,
      plugins: ['bind', 'renderer', 'size'],
      size: {
        width: 300,
        height: 200,
        devicePixelRatio: true,
      },
    };

    dpr = window.devicePixelRatio
    window.devicePixelRatio = 2

    var three = new THREE.Bootstrap(options);

    three.on('resize', function (event) {
      expect(event.renderWidth).toBe(600);
      expect(event.renderHeight).toBe(400);
      expect(event.viewWidth).toBe(300);
      expect(event.viewHeight).toBe(200);
    });

    three.init();

    three.destroy();

    window.devicePixelRatio = dpr

  });

  it("caps resolution while retaining aspect tall", function () {

    var options = {
      init: false,
      plugins: ['bind', 'renderer', 'size'],
      size: {
        width: 400,
        height: 600,
        maxRenderWidth: 300,
        maxRenderHeight: 300,
        devicePixelRatio: false,
      },
    };

    var three = new THREE.Bootstrap(options);

    three.on('resize', function (event) {
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
        devicePixelRatio: false,
      },
      plugins: ['bind', 'renderer', 'size'],
    };

    var three = new THREE.Bootstrap(options);

    three.on('resize', function (event) {
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
        devicePixelRatio: false,
      },
      plugins: ['bind', 'renderer', 'size'],
    };

    var three = new THREE.Bootstrap(options);

    three.on('resize', function (event) {
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
      plugins: ['bind', 'renderer', 'size'],
      size: {
        width: 300,
        height: 200,
      }
    };

    var three = new THREE.Bootstrap(options);

    var called = false;
    three.on('resize', function (event) {
      expect(event.viewWidth).toBe(500);
      expect(event.viewHeight).toBe(400);

      expect(event.renderWidth).toBe(125);
      expect(event.renderHeight).toBe(100);
      
      called = true;
    });

    options = {
      width: 500,
      height: 500,
      aspect: 5/4,
      scale: 1/2,
      maxRenderWidth: 150,
      maxRenderHeight: 100,
      devicePixelRatio: false,
    };

    three.Size.set(options);
    
    three.trigger({ type: 'pre' });

    expect(called).toBe(true);

    three.destroy();
  });

});
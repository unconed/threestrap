import * as Threestrap from "../../src";
import { WebGLRenderer } from "three";

describe("renderer", function () {
  it("installs the canvas into the body", function () {
    const options = {
      init: false,
      plugins: ["renderer"],
    };

    const three = new Threestrap.Bootstrap(options);

    expect(document.querySelectorAll("canvas").length).toBe(0);

    three.init();

    expect(document.querySelectorAll("canvas").length).toBe(1);

    expect(three.renderer).toEqual(jasmine.any(WebGLRenderer));
    expect(three.renderer.domElement.parentNode).toEqual(document.body);

    three.destroy();

    expect(document.querySelectorAll("canvas").length).toBe(0);
  });

  it("installs the canvas into an element", function () {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const options = {
      init: false,
      element: element,
      plugins: ["renderer"],
    };

    const three = new Threestrap.Bootstrap(options);

    expect(document.querySelectorAll("canvas").length).toBe(0);

    three.init();

    expect(document.querySelectorAll("canvas").length).toBe(1);

    expect(three.renderer).toEqual(jasmine.any(WebGLRenderer));
    expect(three.renderer.domElement.parentNode).toEqual(element);

    three.destroy();

    expect(document.querySelectorAll("canvas").length).toBe(0);

    document.body.removeChild(element);
  });

  it("calls renderer setSize", function () {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const options = {
      init: false,
      element: element,
      plugins: ["renderer"],
    };

    const three = new Threestrap.Bootstrap(options);

    let called = 0;
    const callback = function () {
      called++;
    };

    three.init();
    three.renderer.setSize = callback;
    three.plugins.renderer.resize(
      {
        renderWidth: 5,
        renderHeight: 4,
        viewWidth: 3,
        viewHeight: 2,
        aspect: 3 / 2,
      },
      three
    );
    three.destroy();

    expect(called).toBe(1);
  });

  it("calls renderer setSize and setRenderSize", function () {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const options = {
      init: false,
      element: element,
      plugins: ["renderer"],
    };

    const three = new Threestrap.Bootstrap(options);

    let called = 0;
    const callback = function () {
      called++;
    };

    three.init();
    const el = three.renderer.domElement;
    three.renderer.domElement = document.createElement("div");
    three.renderer.setSize = callback;
    three.renderer.setRenderSize = callback;
    three.plugins.renderer.resize(
      {
        renderWidth: 5,
        renderHeight: 4,
        viewWidth: 3,
        viewHeight: 2,
        aspect: 3 / 2,
      },
      three
    );
    three.renderer.domElement = el;
    three.destroy();

    expect(called).toBe(2);
  });
});

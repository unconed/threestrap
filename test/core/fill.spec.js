import * as Threestrap from "../../src";

describe("fill", function () {
  it("sets/unsets html, body height", function () {
    function test() {
      return (
        document.body.style.height == "100%" &&
        document.documentElement.style.height == "100%"
      );
    }

    const options = {
      plugins: ["fill"],
    };

    expect(test()).toBe(false);

    const three = new Threestrap.Bootstrap(options);

    expect(test()).toBe(true);

    three.destroy();

    expect(test()).toBe(false);
  });

  it("makes the canvas a block element", function () {
    function test() {
      const canvas = document.querySelector("canvas");
      return canvas && canvas.style.display == "block";
    }

    const options = {
      plugins: ["renderer", "fill"],
    };

    expect(test()).toBeFalsy();

    const three = new Threestrap.Bootstrap(options);

    expect(test()).toBe(true);

    three.destroy();

    expect(test()).toBeFalsy();
  });

  it("makes the containing element have layout", function () {
    function test() {
      const canvas = document.querySelector("canvas");
      return canvas && canvas.parentNode.style.position == "relative";
    }

    const element = document.createElement("div");
    document.body.appendChild(element);

    const options = {
      plugins: ["renderer", "fill"],
      element: element,
    };

    expect(test()).toBeFalsy();

    const three = new Threestrap.Bootstrap(options);

    expect(test()).toBe(true);

    three.destroy();

    expect(test()).toBeFalsy();

    document.body.removeChild(element);
  });
});

import * as Threestrap from "../../src";

describe("fallback", function () {
  it("displays a fallback, halts install, and cleans up on uninstall", function () {
    const options = {
      plugins: ["fallback", "renderer"],
      fallback: {
        force: true,
        begin: '<div></div><div><div class="threestrap-wat">',
        message: '<span class="wat">wat</span>',
        end: "</div></div>",
      },
    };

    const getNode = function () {
      return document.querySelector(".threestrap-wat");
    };
    const getSpan = function () {
      return document.querySelector(".threestrap-wat span.wat");
    };

    expect(getNode()).toBe(null);
    expect(getSpan()).toBe(null);

    const three = new Threestrap.Bootstrap(options);

    node = getNode();
    expect(node).toBeTruthy();
    expect(getSpan()).toBeTruthy();

    expect(three.renderer).toBeFalsy();
    expect(three.fallback).toBe(true);

    three.destroy();

    expect(getNode()).toBe(null);
    expect(getSpan()).toBe(null);
  });

  it("installs the fill plugin on failure", function () {
    const options = {
      plugins: ["fallback", "renderer"],
      fallback: { force: true },
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.plugins.fill).toBeTruthy();
    expect(three.renderer).toBeFalsy();

    three.destroy();
  });

  it("doesn't interfere", function () {
    const options = {
      plugins: ["fallback", "renderer"],
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.fallback).toBe(false);

    three.destroy();
  });
});

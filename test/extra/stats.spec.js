import * as Threestrap from "../../src"

describe("stats", function () {
  it("adds stats to the dom", function () {
    const containerId = "#stats-test-container"
    const container = document.createElement("div")
    container.id = containerId
    document.body.appendChild(container)
    const cleanupDOM = () => container.remove()

    const options = {
      plugins: ["bind", "renderer", "stats"],
      element: container
    }

    expect(container.querySelector("div")).toBeFalsy();

    const three = new Threestrap.Bootstrap(options);

    expect(container.querySelector("div")).toBeTruthy();
    expect(container.contains(three.stats.dom)).toBe(true)

    three.destroy();

    expect(container.querySelector("div")).toBeFalsy();

    cleanupDOM()
  });
});

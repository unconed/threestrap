import * as Threestrap from "../../src"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

describe("cursor", function () {
  it("sets and autohides the cursor", function () {
    const options = {
      plugins: ["bind", "renderer", "camera", "cursor"],
      cursor: {
        hide: true,
        timeout: 1,
        cursor: "pointer",
      },
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.element.style.cursor).toBe("pointer");

    three.trigger({ type: "update" });

    expect(three.element.style.cursor).toBe("pointer");

    for (let i = 0; i < 65; ++i) {
      three.trigger({ type: "update" });
    }

    expect(three.element.style.cursor).toBe("none");

    three.plugins.cursor.mousemove({ type: "mousemove" }, three);

    expect(three.element.style.cursor).toBe("pointer");

    for (let i = 0; i < 65; ++i) {
      three.trigger({ type: "update" });
    }

    expect(three.element.style.cursor).toBe("none");

    three.destroy();
  });

  fit("sets the cursor contextually", function () {
    const options = {
      plugins: ["bind", "renderer", "camera", "controls", "cursor"],
      controls: {
        klass: OrbitControls,
      },
    };

    const three = new Threestrap.Bootstrap(options);

    expect(three.element.style.cursor).toBe("move");

    three.trigger({ type: "update" });

    expect(three.element.style.cursor).toBe("move");

    three.uninstall("controls");

    expect(three.element.style.cursor).toBe("");

    three.install("controls");

    expect(three.element.style.cursor).toBe("move");

    three.destroy();
  });
});

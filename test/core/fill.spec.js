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

});
describe("stats", function () {

  it("adds stats to the dom", function () {

    var options = {
      plugins: ['renderer', 'bind', 'stats'],
    };

    expect(document.querySelector('#stats')).toBeFalsy();

    var three = new THREE.Bootstrap(options);

    expect(document.querySelector('#stats')).toBeTruthy();

    three.destroy();

    expect(document.querySelector('#stats')).toBeFalsy();
  });

});
THREE.Bootstrap.registerPlugin('fill', {

  install: function (three, renderer, element) {

    function is(element) {
      var h = element.style.height;
      return h == 'auto' || h == '';
    }

    function set(element) {
      element.style.height = '100%';
      element.style.margin = 0;
      element.style.padding = 0;
      return element;
    }

    if (element == document.body) {
      // Fix body height if we're naked
      this.applied =
        [ element, document.documentElement ].filter(is).map(set);
    }

  },

  uninstall: function (three, renderer, element) {
    if (this.applied) {
      function set(element) {
        element.style.height = '';
        element.style.margin = '';
        element.style.padding = '';
        return element;
      }

      this.applied.map(set);
    }
  }

});

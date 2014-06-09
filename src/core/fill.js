THREE.Bootstrap.registerPlugin('fill', {

  defaults: {
    block: true,
    body: true,
    layout: true,
  },

  install: function (three) {

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

    if (this.options.body && three.element == document.body) {
      // Fix body height if we're naked
      this.applied =
        [ three.element, document.documentElement ].filter(is).map(set);
    }

    if (this.options.block && three.canvas) {
      three.canvas.style.display = 'block'
      this.block = true;
    }

    if (this.options.layout && three.element) {
      var style = window.getComputedStyle(three.element);
      if (style.position == 'static') {
        three.element.style.position = 'relative';
        this.layout = true;
      }
    }

  },

  uninstall: function (three) {
    if (this.applied) {
      function set(element) {
        element.style.height = '';
        element.style.margin = '';
        element.style.padding = '';
        return element;
      }

      this.applied.map(set);
      delete this.applied;
    }

    if (this.block && three.canvas) {
      three.canvas.style.display = '';
      delete this.block;
    }

    if (this.layout && three.element) {
      three.element.style.position = '';
      delete this.layout;
    }
  },

  change: function (three) {
    this.uninstall(three);
    this.install(three);
  },

});

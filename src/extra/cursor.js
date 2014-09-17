THREE.Bootstrap.registerPlugin('cursor', {

  listen: ['update', 'this.change', 'install:change', 'uninstall:change', 'element.mousemove', 'vr'],

  defaults: {
    cursor: null,
    hide: false,
    timeout: 3,
  },

  install: function (three) {
    this.timeout = this.options.timeout;
    this.element = three.element;
    this.change(null, three);
  },

  uninstall: function (three) {
    delete three.controls;
  },

  change: function (event, three) {
    this.applyCursor(three);
  },

  mousemove: function (event, three) {
    if (this.options.hide) {
      this.applyCursor(three);
      this.timeout = +this.options.timeout || 0;
    }
  },

  update: function (event, three) {
    var delta = three.Time && three.Time.delta || 1/60;

    if (this.options.hide) {
      this.timeout -= delta;
      if (this.timeout < 0) {
        this.applyCursor(three, 'none');
      }
    }
  },

  vr: function (event, three) {
    this.hide = event.active && !event.hmd.fake;
    this.applyCursor(three);
  },

  applyCursor: function (three, cursor) {
    var auto = three.controls ? 'move' : '';
    cursor = cursor || this.options.cursor || auto;
    if (this.hide) cursor = 'none';
    if (this.cursor != cursor) {
      this.element.style.cursor = cursor;
    }
  },

});
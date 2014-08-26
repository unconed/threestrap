THREE.Bootstrap.registerPlugin('size', {

  defaults: {
    width: null,
    height: null,
    aspect: null,
    scale: 1,
    capWidth: Infinity,
    capHeight: Infinity,
  },

  listen: [
    'window.resize:queue',
    'element.resize:queue',
    'this.change:queue',
    'ready:resize',
    'pre:pre',
  ],

  install: function (three) {

    three.Size = this.api({
      renderWidth: 0,
      renderHeight: 0,
      viewWidth: 0,
      viewHeight: 0,
    });

    this.resized = false;
  },

  uninstall: function (three) {
    delete three.Size;
  },

  queue: function (event, three) {
    this.resized = true;
  },

  pre: function (event, three) {
    if (!this.resized) return;
    this.resized = false;
    this.resize(event, three);
  },

  resize: function (event, three) {
    var options = this.options;
    var element = three.element;
    var renderer = three.renderer;

    var w, h, ew, eh, rw, rh, aspect, cut, style,
        ml = 0 , mt = 0;

    // Measure element
    w = ew = (options.width === undefined || options.width == null)
      ? element.offsetWidth || element.innerWidth || 0
      : options.width;

    h = eh = (options.height === undefined || options.height == null)
      ? element.offsetHeight || element.innerHeight || 0
      : options.height;

    // Force aspect ratio
    aspect = w / h;
    if (options.aspect) {
      if (options.aspect > aspect) {
        h = Math.round(w / options.aspect);
        mt = Math.floor((eh - h) / 2);
      }
      else {
        w = Math.round(h * options.aspect);
        ml = Math.floor((ew - w) / 2);
      }
      aspect = w / h;
    }

    // Apply scale and resolution cap
    rw = Math.min(w * options.scale, options.capWidth);
    rh = Math.min(h * options.scale, options.capHeight);

    // Retain aspect ratio
    raspect = rw / rh;
    if (raspect > aspect) {
      rw = Math.round(rh * aspect);
    }
    else {
      rh = Math.round(rw / aspect);
    }

    if (renderer) {
      var el = renderer.domElement;

      // Resize renderer to render width if it's a canvas
      if (el && el.tagName == 'CANVAS') {
        renderer.setSize(rw, rh);
      }
      // Or real width if it's just a DOM element
      else {
        renderer.setSize(w, h);
      }

      // Resize Canvas
      style = renderer.domElement.style;
      style.width = w + "px";
      style.height = h + "px";
      style.marginLeft = ml + "px";
      style.marginTop = mt + "px";
    }

    // Notify
    _.extend(three.Size, {
      renderWidth: rw,
      renderHeight: rh,
      viewWidth: w,
      viewHeight: h,
      aspect: aspect,
    });

    three.trigger({
      type: 'resize',
      renderWidth: rw,
      renderHeight: rh,
      viewWidth: w,
      viewHeight: h,
      aspect: aspect,
    });
  },

});
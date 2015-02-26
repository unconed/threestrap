THREE.Bootstrap.registerPlugin('size', {

  defaults: {
    width: null,
    height: null,
    aspect: null,
    scale: 1,
    maxRenderWidth: Infinity,
    maxRenderHeight: Infinity,
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

    var w, h, ew, eh, rw, rh, aspect, cut, style, ratio,
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

    // Apply scale and resolution max
    rw = Math.min(w * options.scale, options.maxRenderWidth);
    rh = Math.min(h * options.scale, options.maxRenderHeight);

    // Retain aspect ratio
    raspect = rw / rh;
    if (raspect > aspect) {
      rw = Math.round(rh * aspect);
    }
    else {
      rh = Math.round(rw / aspect);
    }

    // Resize and position renderer element
    style = renderer.domElement.style;
    style.width = w + "px";
    style.height = h + "px";
    style.marginLeft = ml + "px";
    style.marginTop = mt + "px";

    // Measure device pixel ratio
    ratio = 1
    if (typeof window != 'undefined') {
      ratio = window.devicePixelRatio || 1
    }

    // Notify
    _.extend(three.Size, {
      renderWidth: rw,
      renderHeight: rh,
      viewWidth: w,
      viewHeight: h,
      aspect: aspect,
      pixelRatio: ratio,
    });

    three.trigger({
      type: 'resize',
      renderWidth: rw,
      renderHeight: rh,
      viewWidth: w,
      viewHeight: h,
      aspect: aspect,
      pixelRatio: ratio,
    });
  },

});
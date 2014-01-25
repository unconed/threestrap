THREE.Bootstrap.registerPlugin('size', {

  defaults: {
    width: null,
    height: null,
    aspect: null,
    scale: 1,
    capWidth: Infinity,
    capHeight: Infinity,
  },

  install: function (three, renderer, element) {

    // On resize handler
    this.handler = function () {
      var options = this.options;

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
        aspect = options.aspect;
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

      // Resize WebGL
      renderer.setSize(rw, rh);

      // Resize Canvas
      style = renderer.domElement.style;
      style.width = w + "px";
      style.height = h + "px";
      style.marginLeft = ml + "px";
      style.marginTop = mt + "px";

      // Notify
      _.extend(three.Size, {
        renderWidth: rw,
        renderHeight: rh,
        viewWidth: w,
        viewHeight: h,
      });

      three.dispatchEvent({
        type: 'resize',
        renderWidth: rw,
        renderHeight: rh,
        viewWidth: w,
        viewHeight: h,
      });

    }.bind(this);

    window.addEventListener('resize', this.handler);
    element.addEventListener('resize', this.handler);
    three.addEventListener('ready', this.handler);

    three.Size = this.api({
      renderWidth: 0,
      renderHeight: 0,
      viewWidth: 0,
      viewHeight: 0,
    });

    this.addEventListener('change', this.handler);
  },

  uninstall: function (three, renderer, element) {
    window.removeEventListener('resize', this.handler);
    element.removeEventListener('resize', this.handler);
    three.removeEventListener('ready', this.handler);

    delete three.Size;
  },

});
THREE.Bootstrap.registerPlugin('fallback', {

  defaults: {
    force:   false,
    fill:    true,
    klass:   'threestrap-fallback',
    style:   'display: table; width: 100%; height: 100%;'+
             'box-sizing: border-box; border: 1px dashed rgba(0, 0, 0, .25);',
    message: '<div style="display: table-cell; padding: 10px; vertical-align: middle; text-align: center;">'+
             '<big><strong>This example requires WebGL</strong></big><br>'+
             'Visit <a target="_blank" href="http://get.webgl.org/">get.webgl.org</a> for more info</a>'+
             '</div>',
  },

  install: function (three) {
    var cnv;
    try {
      cnv = document.createElement('canvas');
      gl = cnv.getContext('webgl') || cnv.getContext('experimental-webgl');
      if (!gl || this.options.force) {
        throw "WebGL unavailable.";
      }
      three.fallback = false;
    }
    catch (e) {
      message = this.options.message;
      style = this.options.style;
      klass = this.options.klass;
      fill  = this.options.fill;

      div = document.createElement('div');
      div.setAttribute('style', style);
      div.setAttribute('class', klass);
      div.innerHTML = message;
      three.element.appendChild(div);

      if (fill) {
        three.install('fill');
      }

      this.div = div;
      three.fallback = true;
      return false; // Abort install
    }
  },

  uninstall: function (three) {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
    }

    delete three.fallback;
  },

});
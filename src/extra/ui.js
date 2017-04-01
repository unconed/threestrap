THREE.Bootstrap.registerPlugin('ui', {

  defaults: {
    theme: 'white',
    style: '.threestrap-ui { position: absolute; bottom: 5px; right: 5px; float: left; }'+
           '.threestrap-ui button { border: 0; background: none;'+
           '  vertical-align: middle; font-weight: bold; } '+
           '.threestrap-ui .glyphicon { top: 2px; font-weight: bold; } '+
           '@media (max-width: 640px) { .threestrap-ui button { font-size: 120% } }'+
           '.threestrap-white button { color: #fff; text-shadow: 0 1px 1px rgba(0, 0, 0, 1), '+
                                                                   '0 1px 3px rgba(0, 0, 0, 1); }'+
           '.threestrap-black button { color: #000; text-shadow: 0 0px 1px rgba(255, 255, 255, 1), '+
                                                                '0 0px 2px rgba(255, 255, 255, 1), '+
                                                                '0 0px 2px rgba(255, 255, 255, 1) }'
  },

  listen: ['fullscreen'],

  markup: function (three, theme, style) {
    var url = "//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css";
    if (location.href.match(/^file:\/\//)) url = 'http://' + url;

    var buttons = [];

    if (three.Fullscreen) {
      buttons.push('<button class="fullscreen" title="Full Screen">'+
         '<span class="glyphicon glyphicon-fullscreen"></span>'+
       '</button>');
    }
    if (three.VR) {
      buttons.push('<button class="vr" title="VR Headset">VR</button>');
    }

    return '<style type="text/css">@import url("' + url + '"); '+ style + '</style>'+
           '<div class="threestrap-ui threestrap-'+ theme + '">'+ buttons.join("\n") + '</div>';
  },

  install: function (three) {
    var ui = this.ui = document.createElement('div');
    ui.innerHTML = this.markup(three, this.options.theme, this.options.style);
    document.body.appendChild(ui);

    var fullscreen = this.ui.fullscreen = ui.querySelector('button.fullscreen');
    if (fullscreen) {
      three.bind([ fullscreen, 'click:goFullscreen' ], this);
    }

    var vr = this.ui.vr = ui.querySelector('button.vr');
    if (vr && three.VR) {
      three.VR.set({ mode: '2d' });
      three.bind([ vr, 'click:goVR' ], this);
    }
  },

  uninstall: function (three) {
    document.body.removeChild(ui);
  },

  fullscreen: function (event, three) {
    this.ui.style.display = event.active ? 'none' : 'block';
    if (!event.active) three.VR && three.VR.set({ mode: '2d' });
  },

  goFullscreen: function (event, three) {
    if (three.Fullscreen) {
      three.Fullscreen.toggle();
    }
  },

  goVR: function (event, three) {
    if (three.VR) {
      three.VR.set({ mode: 'auto' });
      three.Fullscreen.toggle();
    }
  },

  uninstall: function (three) {
    document.body.removeChild(this.ui);
  },

});
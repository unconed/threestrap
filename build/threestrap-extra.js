// stats.js - http://github.com/mrdoob/stats.js
THREE.Stats=function(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};

/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

THREE.DeviceOrientationControls = function ( object ) {

	var scope = this;

	this.object = object;

	this.object.rotation.reorder( "YXZ" );

	this.freeze = true;

	this.deviceOrientation = {};

	this.screenOrientation = 0;

	var onDeviceOrientationChangeEvent = function ( event ) {

		scope.deviceOrientation = event;

	};

	var onScreenOrientationChangeEvent = function () {

		scope.screenOrientation = window.orientation || 0;

	};

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setObjectQuaternion = function () {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		return function ( quaternion, alpha, beta, gamma, orient ) {

			euler.set( beta, alpha, - gamma, 'YXZ' );                       // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler );                               // orient the device

			quaternion.multiply( q1 );                                      // camera looks out the back of the device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) );    // adjust for screen orientation

		}

	}();

	this.connect = function() {

		onScreenOrientationChangeEvent(); // run once on load

		window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

		scope.freeze = false;

	};

	this.disconnect = function() {

		scope.freeze = true;

		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

	};

	this.update = function () {

		if ( scope.freeze ) return;

		var alpha  = scope.deviceOrientation.gamma ? THREE.Math.degToRad( scope.deviceOrientation.alpha ) : 0; // Z
		var beta   = scope.deviceOrientation.beta  ? THREE.Math.degToRad( scope.deviceOrientation.beta  ) : 0; // X'
		var gamma  = scope.deviceOrientation.gamma ? THREE.Math.degToRad( scope.deviceOrientation.gamma ) : 0; // Y''
		var orient = scope.screenOrientation       ? THREE.Math.degToRad( scope.screenOrientation       ) : 0; // O

		setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );

	};

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */

THREE.FirstPersonControls = function ( object, domElement ) {

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.movementSpeed = 1.0;
	this.lookSpeed = 0.005;

	this.lookVertical = true;
	this.autoForward = false;
	// this.invertVertical = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 1.0;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor = 0.0;

	this.mouseX = 0;
	this.mouseY = 0;

	this.lat = 0;
	this.lon = 0;
	this.phi = 0;
	this.theta = 0;

	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;
	this.freeze = false;

	this.mouseDragOn = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;

	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', -1 );

	}

	//

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};

	this.onMouseDown = function ( event ) {

		if ( this.domElement !== document ) {

			this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = true; break;
				case 2: this.moveBackward = true; break;

			}

		}

		this.mouseDragOn = true;

	};

	this.onMouseUp = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = false; break;
				case 2: this.moveBackward = false; break;

			}

		}

		this.mouseDragOn = false;

	};

	this.onMouseMove = function ( event ) {

		if ( this.domElement === document ) {

			this.mouseX = event.pageX - this.viewHalfX;
			this.mouseY = event.pageY - this.viewHalfY;

		} else {

			this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

		}

	};

	this.onKeyDown = function ( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ this.moveForward = true; break;

			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = true; break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = true; break;

			case 39: /*right*/
			case 68: /*D*/ this.moveRight = true; break;

			case 82: /*R*/ this.moveUp = true; break;
			case 70: /*F*/ this.moveDown = true; break;

			case 81: /*Q*/ this.freeze = !this.freeze; break;

		}

	};

	this.onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ this.moveForward = false; break;

			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = false; break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = false; break;

			case 39: /*right*/
			case 68: /*D*/ this.moveRight = false; break;

			case 82: /*R*/ this.moveUp = false; break;
			case 70: /*F*/ this.moveDown = false; break;

		}

	};

	this.update = function( delta ) {

		if ( this.freeze ) {

			return;

		}

		if ( this.heightSpeed ) {

			var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
			var heightDelta = y - this.heightMin;

			this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

		} else {

			this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * this.movementSpeed;

		if ( this.moveForward || ( this.autoForward && !this.moveBackward ) ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
		if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

		if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
		if ( this.moveRight ) this.object.translateX( actualMoveSpeed );

		if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
		if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

		var actualLookSpeed = delta * this.lookSpeed;

		if ( !this.activeLook ) {

			actualLookSpeed = 0;

		}

		var verticalLookRatio = 1;

		if ( this.constrainVertical ) {

			verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

		}

		this.lon += this.mouseX * actualLookSpeed;
		if( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

		this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
		this.phi = THREE.Math.degToRad( 90 - this.lat );

		this.theta = THREE.Math.degToRad( this.lon );

		if ( this.constrainVertical ) {

			this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

		}

		var targetPosition = this.target,
			position = this.object.position;

		targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
		targetPosition.y = position.y + 100 * Math.cos( this.phi );
		targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

		this.object.lookAt( targetPosition );

	};


	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	this.domElement.addEventListener( 'mousemove', bind( this, this.onMouseMove ), false );
	this.domElement.addEventListener( 'mousedown', bind( this, this.onMouseDown ), false );
	this.domElement.addEventListener( 'mouseup', bind( this, this.onMouseUp ), false );
	this.domElement.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
	this.domElement.addEventListener( 'keyup', bind( this, this.onKeyUp ), false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

	this.handleResize();

};

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 * @author unconed / https://github.com/unconed
 */
/*global THREE, console */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe
//
// This is a drop-in replacement for (most) TrackballControls used in examples.
// That is, include this js file and wherever you see:
//      controls = new THREE.TrackballControls( camera );
//      controls.target.z = 150;
// Simple substitute "OrbitControls" and the control should work as-is.

THREE.OrbitControls = function ( object, domElement ) {

  this.object = object;
  this.domElement = ( domElement !== undefined ) ? domElement : document;

  // API

  // Set to false to disable this control
  this.enabled = true;

  // "target" sets the location of focus, where the control orbits around
  // and where it pans with respect to.
  this.target = new THREE.Vector3();

  // center is old, deprecated; use "target" instead
  this.center = this.target;

  // This option actually enables dollying in and out; left as "zoom" for
  // backwards compatibility
  this.noZoom = false;
  this.zoomSpeed = 1.0;

  // Limits to how far you can dolly in and out
  this.minDistance = 0;
  this.maxDistance = Infinity;

  // Set to true to disable this control
  this.noRotate = false;
  this.rotateSpeed = 1.0;

  // Set to true to disable this control
  this.noPan = false;
  this.keyPanSpeed = 7.0; // pixels moved per arrow key push

  // Set to true to automatically rotate around the target
  this.autoRotate = false;
  this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.
  this.minPolarAngle = 0; // radians
  this.maxPolarAngle = Math.PI; // radians

  // Set to true to disable use of the keys
  this.noKeys = false;

  // The four arrow keys
  this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

  ////////////
  // internals

  var scope = this;

  var EPS = 0.000001;

  var rotateStart = new THREE.Vector2();
  var rotateEnd = new THREE.Vector2();
  var rotateDelta = new THREE.Vector2();

  var panStart = new THREE.Vector2();
  var panEnd = new THREE.Vector2();
  var panDelta = new THREE.Vector2();
  var panOffset = new THREE.Vector3();

  var offset = new THREE.Vector3();

  var dollyStart = new THREE.Vector2();
  var dollyEnd = new THREE.Vector2();
  var dollyDelta = new THREE.Vector2();

  var phiDelta = 0;
  var thetaDelta = 0;
  var scale = 1;
  var pan = new THREE.Vector3();

  var lastPosition = new THREE.Vector3();

  var STATE = { NONE : -1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };

  var state = STATE.NONE;

  // for reset

  this.target0 = this.target.clone();
  this.position0 = this.object.position.clone();

  // so camera.up is the orbit axis

  var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
  var quatInverse = quat.clone().inverse();

  // events

  var changeEvent = { type: 'change' };
  var startEvent = { type: 'start'};
  var endEvent = { type: 'end'};

  this.rotateLeft = function ( angle ) {

    if ( angle === undefined ) {

      angle = getAutoRotationAngle();

    }

    thetaDelta -= angle;

  };

  this.rotateUp = function ( angle ) {

    if ( angle === undefined ) {

      angle = getAutoRotationAngle();

    }

    phiDelta -= angle;

  };

  // pass in distance in world space to move left
  this.panLeft = function ( distance ) {

    var te = this.object.matrix.elements;

    // get X column of matrix
    panOffset.set( te[ 0 ], te[ 1 ], te[ 2 ] );
    panOffset.multiplyScalar( - distance );

    pan.add( panOffset );

  };

  // pass in distance in world space to move up
  this.panUp = function ( distance ) {

    var te = this.object.matrix.elements;

    // get Y column of matrix
    panOffset.set( te[ 4 ], te[ 5 ], te[ 6 ] );
    panOffset.multiplyScalar( distance );

    pan.add( panOffset );

  };

  // pass in x,y of change desired in pixel space,
  // right and down are positive
  this.pan = function ( deltaX, deltaY ) {

    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    if ( scope.object.fov !== undefined ) {

      // perspective
      var position = scope.object.position;
      var offset = position.clone().sub( scope.target );
      var targetDistance = offset.length();

      // half of the fov is center to top of screen
      targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

      // we actually don't use screenWidth, since perspective camera is fixed to screen height
      scope.panLeft( 2 * deltaX * targetDistance / element.clientHeight );
      scope.panUp( 2 * deltaY * targetDistance / element.clientHeight );

    } else if ( scope.object.top !== undefined ) {

      // orthographic
      scope.panLeft( deltaX * (scope.object.right - scope.object.left) / element.clientWidth );
      scope.panUp( deltaY * (scope.object.top - scope.object.bottom) / element.clientHeight );

    } else {

      // camera neither orthographic or perspective
      console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );

    }

  };

  this.dollyIn = function ( dollyScale ) {

    if ( dollyScale === undefined ) {

      dollyScale = getZoomScale();

    }

    scale /= dollyScale;

  };

  this.dollyOut = function ( dollyScale ) {

    if ( dollyScale === undefined ) {

      dollyScale = getZoomScale();

    }

    scale *= dollyScale;

  };

  this.update = function () {

    var position = this.object.position;

    offset.copy( position ).sub( this.target );

    // rotate offset to "y-axis-is-up" space
    offset.applyQuaternion( quat );

    // angle from z-axis around y-axis

    var theta = Math.atan2( offset.x, offset.z );

    // angle from y-axis

    var phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

    if ( this.autoRotate ) {

      this.rotateLeft( getAutoRotationAngle() );

    }

    theta += thetaDelta;
    phi += phiDelta;

    // restrict phi to be between desired limits
    phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

    // restrict phi to be betwee EPS and PI-EPS
    phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

    var radius = offset.length() * scale;

    // restrict radius to be between desired limits
    radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );

    // move target to panned location
    this.target.add( pan );

    offset.x = radius * Math.sin( phi ) * Math.sin( theta );
    offset.y = radius * Math.cos( phi );
    offset.z = radius * Math.sin( phi ) * Math.cos( theta );

    // rotate offset back to "camera-up-vector-is-up" space
    offset.applyQuaternion( quatInverse );

    position.copy( this.target ).add( offset );

    this.object.lookAt( this.target );

    thetaDelta = 0;
    phiDelta = 0;
    scale = 1;
    pan.set( 0, 0, 0 );

    if ( lastPosition.distanceToSquared( this.object.position ) > EPS ) {

      this.dispatchEvent( changeEvent );

      lastPosition.copy( this.object.position );

    }

  };


  this.reset = function () {

    state = STATE.NONE;

    this.target.copy( this.target0 );
    this.object.position.copy( this.position0 );

    this.update();

  };

  function getAutoRotationAngle() {

    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

  }

  function getZoomScale() {

    return Math.pow( 0.95, scope.zoomSpeed );

  }

  function onMouseDown( event ) {

    if ( scope.enabled === false ) return;
    event.preventDefault();

    if ( event.button === 0 ) {
      if ( scope.noRotate === true ) return;

      state = STATE.ROTATE;

      rotateStart.set( event.clientX, event.clientY );

    } else if ( event.button === 1 ) {
      if ( scope.noZoom === true ) return;

      state = STATE.DOLLY;

      dollyStart.set( event.clientX, event.clientY );

    } else if ( event.button === 2 ) {
      if ( scope.noPan === true ) return;

      state = STATE.PAN;

      panStart.set( event.clientX, event.clientY );

    }

    document.documentElement.addEventListener( 'mousemove', onMouseMove, false );
    document.documentElement.addEventListener( 'mouseup', onMouseUp, false );
    scope.dispatchEvent( startEvent );

  }

  function onMouseMove( event ) {

    if ( scope.enabled === false ) return;

    event.preventDefault();

    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    if ( state === STATE.ROTATE ) {

      if ( scope.noRotate === true ) return;

      rotateEnd.set( event.clientX, event.clientY );
      rotateDelta.subVectors( rotateEnd, rotateStart );

      // rotating across whole screen goes 360 degrees around
      scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

      // rotating up and down along whole screen attempts to go 360, but limited to 180
      scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

      rotateStart.copy( rotateEnd );

    } else if ( state === STATE.DOLLY ) {

      if ( scope.noZoom === true ) return;

      dollyEnd.set( event.clientX, event.clientY );
      dollyDelta.subVectors( dollyEnd, dollyStart );

      if ( dollyDelta.y > 0 ) {

        scope.dollyIn();

      } else {

        scope.dollyOut();

      }

      dollyStart.copy( dollyEnd );

    } else if ( state === STATE.PAN ) {

      if ( scope.noPan === true ) return;

      panEnd.set( event.clientX, event.clientY );
      panDelta.subVectors( panEnd, panStart );

      scope.pan( panDelta.x, panDelta.y );

      panStart.copy( panEnd );

    }

    scope.update();

  }

  function onMouseUp( /* event */ ) {

    if ( scope.enabled === false ) return;

    document.documentElement.removeEventListener( 'mousemove', onMouseMove, false );
    document.documentElement.removeEventListener( 'mouseup', onMouseUp, false );
    scope.dispatchEvent( endEvent );
    state = STATE.NONE;

  }

  function onMouseWheel( event ) {

    if ( scope.enabled === false || scope.noZoom === true ) return;

    event.preventDefault();
    event.stopPropagation();

    var delta = 0;

    if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

      delta = event.wheelDelta;

    } else if ( event.detail !== undefined ) { // Firefox

      delta = - event.detail;

    }

    if ( delta > 0 ) {

      scope.dollyOut();

    } else {

      scope.dollyIn();

    }

    scope.update();
    scope.dispatchEvent( startEvent );
    scope.dispatchEvent( endEvent );

  }

  function onKeyDown( event ) {

    if ( scope.enabled === false || scope.noKeys === true || scope.noPan === true ) return;

    switch ( event.keyCode ) {

      case scope.keys.UP:
        scope.pan( 0, scope.keyPanSpeed );
        scope.update();
        break;

      case scope.keys.BOTTOM:
        scope.pan( 0, - scope.keyPanSpeed );
        scope.update();
        break;

      case scope.keys.LEFT:
        scope.pan( scope.keyPanSpeed, 0 );
        scope.update();
        break;

      case scope.keys.RIGHT:
        scope.pan( - scope.keyPanSpeed, 0 );
        scope.update();
        break;

    }

  }

  function touchstart( event ) {

    if ( scope.enabled === false ) return;

    switch ( event.touches.length ) {

      case 1: // one-fingered touch: rotate

        if ( scope.noRotate === true ) return;

        state = STATE.TOUCH_ROTATE;

        rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      case 2: // two-fingered touch: dolly

        if ( scope.noZoom === true ) return;

        state = STATE.TOUCH_DOLLY;

        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        var distance = Math.sqrt( dx * dx + dy * dy );
        dollyStart.set( 0, distance );
        break;

      case 3: // three-fingered touch: pan

        if ( scope.noPan === true ) return;

        state = STATE.TOUCH_PAN;

        panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      default:

        state = STATE.NONE;

    }

    scope.dispatchEvent( startEvent );

  }

  function touchmove( event ) {

    if ( scope.enabled === false ) return;

    event.preventDefault();
    event.stopPropagation();

    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    switch ( event.touches.length ) {

      case 1: // one-fingered touch: rotate

        if ( scope.noRotate === true ) return;
        if ( state !== STATE.TOUCH_ROTATE ) return;

        rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        rotateDelta.subVectors( rotateEnd, rotateStart );

        // rotating across whole screen goes 360 degrees around
        scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
        // rotating up and down along whole screen attempts to go 360, but limited to 180
        scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

        rotateStart.copy( rotateEnd );

        scope.update();
        break;

      case 2: // two-fingered touch: dolly

        if ( scope.noZoom === true ) return;
        if ( state !== STATE.TOUCH_DOLLY ) return;

        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        var distance = Math.sqrt( dx * dx + dy * dy );

        dollyEnd.set( 0, distance );
        dollyDelta.subVectors( dollyEnd, dollyStart );

        if ( dollyDelta.y > 0 ) {

          scope.dollyOut();

        } else {

          scope.dollyIn();

        }

        dollyStart.copy( dollyEnd );

        scope.update();
        break;

      case 3: // three-fingered touch: pan

        if ( scope.noPan === true ) return;
        if ( state !== STATE.TOUCH_PAN ) return;

        panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        panDelta.subVectors( panEnd, panStart );

        scope.pan( panDelta.x, panDelta.y );

        panStart.copy( panEnd );

        scope.update();
        break;

      default:

        state = STATE.NONE;

    }

  }

  function touchend( /* event */ ) {

    if ( scope.enabled === false ) return;

    scope.dispatchEvent( endEvent );
    state = STATE.NONE;

  }

  this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
  this.domElement.addEventListener( 'mousedown', onMouseDown, false );
  this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
  this.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox

  this.domElement.addEventListener( 'touchstart', touchstart, false );
  this.domElement.addEventListener( 'touchend', touchend, false );
  this.domElement.addEventListener( 'touchmove', touchmove, false );

  window.addEventListener( 'keydown', onKeyDown, false );

  // force an update at start
  this.update();

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );

/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin 	/ http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga 	/ http://lantiga.github.io
 */

THREE.TrackballControls = function ( object, domElement ) {

	var _this = this;
	var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// API

	this.enabled = true;

	this.screen = { left: 0, top: 0, width: 0, height: 0 };

	this.rotateSpeed = 1.0;
	this.zoomSpeed = 1.2;
	this.panSpeed = 0.3;

	this.noRotate = false;
	this.noZoom = false;
	this.noPan = false;

	this.staticMoving = false;
	this.dynamicDampingFactor = 0.2;

	this.minDistance = 0;
	this.maxDistance = Infinity;

	this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];

	// internals

	this.target = new THREE.Vector3();

	var EPS = 0.000001;

	var lastPosition = new THREE.Vector3();

	var _state = STATE.NONE,
	_prevState = STATE.NONE,

	_eye = new THREE.Vector3(),

	_movePrev = new THREE.Vector2(),
	_moveCurr = new THREE.Vector2(),

	_lastAxis = new THREE.Vector3(),
	_lastAngle = 0,

	_zoomStart = new THREE.Vector2(),
	_zoomEnd = new THREE.Vector2(),

	_touchZoomDistanceStart = 0,
	_touchZoomDistanceEnd = 0,

	_panStart = new THREE.Vector2(),
	_panEnd = new THREE.Vector2();

	// for reset

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.up0 = this.object.up.clone();

	// events

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };


	// methods

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.screen.left = 0;
			this.screen.top = 0;
			this.screen.width = window.innerWidth;
			this.screen.height = window.innerHeight;

		} else {

			var box = this.domElement.getBoundingClientRect();
			// adjustments come from similar code in the jquery offset() function
			var d = this.domElement.ownerDocument.documentElement;
			this.screen.left = box.left + window.pageXOffset - d.clientLeft;
			this.screen.top = box.top + window.pageYOffset - d.clientTop;
			this.screen.width = box.width;
			this.screen.height = box.height;

		}

	};

	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {

			this[ event.type ]( event );

		}

	};

	var getMouseOnScreen = ( function () {

		var vector = new THREE.Vector2();

		return function ( pageX, pageY ) {

			vector.set(
				( pageX - _this.screen.left ) / _this.screen.width,
				( pageY - _this.screen.top ) / _this.screen.height
			);

			return vector;

		};

	}() );

	var getMouseOnCircle = ( function () {

		var vector = new THREE.Vector2();

		return function ( pageX, pageY ) {

			vector.set(
				( ( pageX - _this.screen.width * 0.5 - _this.screen.left ) / ( _this.screen.width * 0.5 ) ),
				( ( _this.screen.height + 2 * ( _this.screen.top - pageY ) ) / _this.screen.width ) // screen.width intentional
			);

			return vector;
		};

	}() );

	this.rotateCamera = (function() {

		var axis = new THREE.Vector3(),
			quaternion = new THREE.Quaternion(),
			eyeDirection = new THREE.Vector3(),
			objectUpDirection = new THREE.Vector3(),
			objectSidewaysDirection = new THREE.Vector3(),
			moveDirection = new THREE.Vector3(),
			angle;

		return function () {

			moveDirection.set( _moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0 );
			angle = moveDirection.length();

			if ( angle ) {

				_eye.copy( _this.object.position ).sub( _this.target );

				eyeDirection.copy( _eye ).normalize();
				objectUpDirection.copy( _this.object.up ).normalize();
				objectSidewaysDirection.crossVectors( objectUpDirection, eyeDirection ).normalize();

				objectUpDirection.setLength( _moveCurr.y - _movePrev.y );
				objectSidewaysDirection.setLength( _moveCurr.x - _movePrev.x );

				moveDirection.copy( objectUpDirection.add( objectSidewaysDirection ) );

				axis.crossVectors( moveDirection, _eye ).normalize();

				angle *= _this.rotateSpeed;
				quaternion.setFromAxisAngle( axis, angle );

				_eye.applyQuaternion( quaternion );
				_this.object.up.applyQuaternion( quaternion );

				_lastAxis.copy( axis );
				_lastAngle = angle;

			}

			else if ( !_this.staticMoving && _lastAngle ) {

				_lastAngle *= Math.sqrt( 1.0 - _this.dynamicDampingFactor );
				_eye.copy( _this.object.position ).sub( _this.target );
				quaternion.setFromAxisAngle( _lastAxis, _lastAngle );
				_eye.applyQuaternion( quaternion );
				_this.object.up.applyQuaternion( quaternion );

			}

			_movePrev.copy( _moveCurr );

		};

	}());


	this.zoomCamera = function () {

		var factor;

		if ( _state === STATE.TOUCH_ZOOM_PAN ) {

			factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
			_touchZoomDistanceStart = _touchZoomDistanceEnd;
			_eye.multiplyScalar( factor );

		} else {

			factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * _this.zoomSpeed;

			if ( factor !== 1.0 && factor > 0.0 ) {

				_eye.multiplyScalar( factor );

				if ( _this.staticMoving ) {

					_zoomStart.copy( _zoomEnd );

				} else {

					_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;

				}

			}

		}

	};

	this.panCamera = (function() {

		var mouseChange = new THREE.Vector2(),
			objectUp = new THREE.Vector3(),
			pan = new THREE.Vector3();

		return function () {

			mouseChange.copy( _panEnd ).sub( _panStart );

			if ( mouseChange.lengthSq() ) {

				mouseChange.multiplyScalar( _eye.length() * _this.panSpeed );

				pan.copy( _eye ).cross( _this.object.up ).setLength( mouseChange.x );
				pan.add( objectUp.copy( _this.object.up ).setLength( mouseChange.y ) );

				_this.object.position.add( pan );
				_this.target.add( pan );

				if ( _this.staticMoving ) {

					_panStart.copy( _panEnd );

				} else {

					_panStart.add( mouseChange.subVectors( _panEnd, _panStart ).multiplyScalar( _this.dynamicDampingFactor ) );

				}

			}
		};

	}());

	this.checkDistances = function () {

		if ( !_this.noZoom || !_this.noPan ) {

			if ( _eye.lengthSq() > _this.maxDistance * _this.maxDistance ) {

				_this.object.position.addVectors( _this.target, _eye.setLength( _this.maxDistance ) );

			}

			if ( _eye.lengthSq() < _this.minDistance * _this.minDistance ) {

				_this.object.position.addVectors( _this.target, _eye.setLength( _this.minDistance ) );

			}

		}

	};

	this.update = function () {

		_eye.subVectors( _this.object.position, _this.target );

		if ( !_this.noRotate ) {

			_this.rotateCamera();

		}

		if ( !_this.noZoom ) {

			_this.zoomCamera();

		}

		if ( !_this.noPan ) {

			_this.panCamera();

		}

		_this.object.position.addVectors( _this.target, _eye );

		_this.checkDistances();

		_this.object.lookAt( _this.target );

		if ( lastPosition.distanceToSquared( _this.object.position ) > EPS ) {

			_this.dispatchEvent( changeEvent );

			lastPosition.copy( _this.object.position );

		}

	};

	this.reset = function () {

		_state = STATE.NONE;
		_prevState = STATE.NONE;

		_this.target.copy( _this.target0 );
		_this.object.position.copy( _this.position0 );
		_this.object.up.copy( _this.up0 );

		_eye.subVectors( _this.object.position, _this.target );

		_this.object.lookAt( _this.target );

		_this.dispatchEvent( changeEvent );

		lastPosition.copy( _this.object.position );

	};

	// listeners

	function keydown( event ) {

		if ( _this.enabled === false ) return;

		window.removeEventListener( 'keydown', keydown );

		_prevState = _state;

		if ( _state !== STATE.NONE ) {

			return;

		} else if ( event.keyCode === _this.keys[ STATE.ROTATE ] && !_this.noRotate ) {

			_state = STATE.ROTATE;

		} else if ( event.keyCode === _this.keys[ STATE.ZOOM ] && !_this.noZoom ) {

			_state = STATE.ZOOM;

		} else if ( event.keyCode === _this.keys[ STATE.PAN ] && !_this.noPan ) {

			_state = STATE.PAN;

		}

	}

	function keyup( event ) {

		if ( _this.enabled === false ) return;

		_state = _prevState;

		window.addEventListener( 'keydown', keydown, false );

	}

	function mousedown( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.NONE ) {

			_state = event.button;

		}

		if ( _state === STATE.ROTATE && !_this.noRotate ) {

			_moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );
			_movePrev.copy(_moveCurr);

		} else if ( _state === STATE.ZOOM && !_this.noZoom ) {

			_zoomStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_zoomEnd.copy(_zoomStart);

		} else if ( _state === STATE.PAN && !_this.noPan ) {

			_panStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_panEnd.copy(_panStart);

		}

		document.addEventListener( 'mousemove', mousemove, false );
		document.addEventListener( 'mouseup', mouseup, false );

		_this.dispatchEvent( startEvent );

	}

	function mousemove( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.ROTATE && !_this.noRotate ) {

			_movePrev.copy(_moveCurr);
			_moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );

		} else if ( _state === STATE.ZOOM && !_this.noZoom ) {

			_zoomEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		} else if ( _state === STATE.PAN && !_this.noPan ) {

			_panEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		}

	}

	function mouseup( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		_state = STATE.NONE;

		document.removeEventListener( 'mousemove', mousemove );
		document.removeEventListener( 'mouseup', mouseup );
		_this.dispatchEvent( endEvent );

	}

	function mousewheel( event ) {

		if ( _this.enabled === false || _this.noZoom ) return;

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta / 40;

		} else if ( event.detail ) { // Firefox

			delta = - event.detail / 3;

		}

		_zoomStart.y += delta * 0.01;
		_this.dispatchEvent( startEvent );
		_this.dispatchEvent( endEvent );

	}

	function touchstart( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:
				_state = STATE.TOUCH_ROTATE;
				_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_movePrev.copy(_moveCurr);
				break;

			case 2:
				_state = STATE.TOUCH_ZOOM_PAN;
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panStart.copy( getMouseOnScreen( x, y ) );
				_panEnd.copy( _panStart );
				break;

			default:
				_state = STATE.NONE;

		}
		_this.dispatchEvent( startEvent );


	}

	function touchmove( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1:
				_movePrev.copy(_moveCurr);
				_moveCurr.copy( getMouseOnCircle(  event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				break;

			case 2:
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panEnd.copy( getMouseOnScreen( x, y ) );
				break;

			default:
				_state = STATE.NONE;

		}

	}

	function touchend( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:
				_movePrev.copy(_moveCurr);
				_moveCurr.copy( getMouseOnCircle(  event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				break;

			case 2:
				_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panEnd.copy( getMouseOnScreen( x, y ) );
				_panStart.copy( _panEnd );
				break;

		}

		_state = STATE.NONE;
		_this.dispatchEvent( endEvent );

	}

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	this.domElement.addEventListener( 'mousedown', mousedown, false );

	this.domElement.addEventListener( 'mousewheel', mousewheel, false );
	this.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox

	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );

	window.addEventListener( 'keydown', keydown, false );
	window.addEventListener( 'keyup', keyup, false );

	this.handleResize();

	// force an update at start
	this.update();

};

THREE.TrackballControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;

/**
 * VRControls
 *
 * Mixes vrstate with OrbitControls / DeviceOrientationControls

 * When real vrstate is supplied, it is used.
 * When empty vrstate {} is supplied, device orientation is used if supported, for Cardboard VR mode.
 * When no vrstate (null/undef) is supplied, orbit controls are used (mouse/touch), for regular interaction
 * 
 * @author unconed / https://github.com/unconed
 */


THREE.VRControls = function (object, domElement) {
  var EPSILON = 1e-5;

  // Prepare real object and dummy object to swap out
  var dummy   = this.dummy = new THREE.Object3D();
  this.object = object;

  // Two camera controls
  this.device = new THREE.DeviceOrientationControls(dummy, domElement);
  this.orbit  = new THREE.OrbitControls            (dummy, domElement);

  // Ensure position/target are not identical
  this.orbit.target.copy(object.position);
  this.orbit.target.z += EPSILON;
  this.orbit.rotateSpeed = -0.25;

  // Check device orientation support
  this.supported = false;
  var callback = function (event) {
    this.supported = event && event.alpha == +event.alpha;
    window.removeEventListener('deviceorientation', callback, false);
  }.bind(this);
  window.addEventListener('deviceorientation', callback, false);
}

THREE.VRControls.prototype.vr = function (vrstate) {
  this.vrstate = vrstate;
}

THREE.VRControls.prototype.update = function (delta) {
  var freeze = false;

  if (this.vrstate && this.vrstate.orientation) {
    freeze = true;

    this.object.quaternion.copy(this.vrstate.orientation);
    this.object.position  .copy(this.vrstate.position);

    this.device.object = this.dummy;
    this.orbit .object = this.dummy;
  }
  else if (this.vrstate && this.supported) {
    if (this.device.freeze) this.device.connect();

    this.device.object = this.object;
    this.orbit .object = this.dummy;

    this.device.update(delta);
  }
  else {
    freeze = true;

    this.device.object = this.dummy;
    this.orbit .object = this.object;

    this.orbit.update(delta);
  }

  if (freeze && !this.device.freeze) this.device.disconnect();
}
THREE.Bootstrap.registerPlugin('stats', {

  listen: ['pre', 'post'],

  install: function (three) {

    var stats = this.stats = new THREE.Stats();
    var style = stats.domElement.style;

    style.position = 'absolute';
    style.top = style.left = 0;
    three.element.appendChild(stats.domElement);

    three.stats = stats;
  },

  uninstall: function (three) {
    document.body.removeChild(this.stats.domElement);

    delete three.stats;
  },

  pre: function (event, three) {
    this.stats.begin();
  },

  post: function (event, three) {
    this.stats.end();
  },

});
THREE.Bootstrap.registerPlugin('controls', {

  listen: ['update', 'resize', 'camera', 'this.change'],

  defaults: {
    klass: null,
    parameters: {},
  },

  install: function (three) {
    if (!this.options.klass) throw "Must provide class for `controls.klass`";

    three.controls = null;

    this._camera = three.camera || new THREE.PerspectiveCamera();
    this.change(null, three);
  },

  uninstall: function (three) {
    delete three.controls;
  },

  change: function (event, three) {
    if (this.options.klass) {
      if (!event || event.changes.klass) {
        three.controls = new this.options.klass(this._camera, three.renderer.domElement);
      }

      _.extend(three.controls, this.options.parameters);
    }
    else {
      three.controls = null;
    }
  },

  update: function (event, three) {
    var delta = three.Time && three.Time.delta || 1/60;
    var vr = three.VR && three.VR.state;

    if (three.controls.vr) three.controls.vr(vr);
    three.controls.update(delta);
  },

  camera: function (event, three) {
    three.controls.object = this._camera = event.camera;
  },

  resize: function (event, three) {
    three.controls.handleResize && three.controls.handleResize();
  },

});
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
THREE.Bootstrap.registerPlugin('fullscreen', {

  defaults: {
    key: 'f',
  },

  listen: ['ready', 'update'],

  install: function (three) {
    three.Fullscreen = this.api({
      active: false,
      toggle: this.toggle.bind(this),
    }, three);
  },

  uninstall: function (three) {
    delete three.Fullscreen
  },

  ready: function (event, three) {

    document.body.addEventListener('keypress', function (event) {
      if (this.options.key &&
          event.charCode == this.options.key.charCodeAt(0)) {
        this.toggle(three);
      }
    }.bind(this));

    var changeHandler = function () {
      var active = !!document.fullscreenElement       ||
                   !!document.mozFullScreenElement    ||
                   !!document.webkitFullscreenElement ||
                   !!document.msFullscreenElement;
      three.Fullscreen.active = this.active = active;
      three.trigger({
        type: 'fullscreen',
        active: active,
      });
    }.bind(this);
    document.addEventListener("fullscreenchange", changeHandler, false);
    document.addEventListener("webkitfullscreenchange", changeHandler, false);
    document.addEventListener("mozfullscreenchange", changeHandler, false);
  },

  toggle: function (three) {
    var canvas  = three.canvas;
    var options = (three.VR && three.VR.active) ? { vrDisplay: three.VR.hmd } : {};

    if (!this.active) {

      if (canvas.requestFullScreen) {
        canvas.requestFullScreen(options);
      }
      else if (canvas.msRequestFullScreen) {
        canvas.msRequestFullscreen(options);
      }
      else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen(options);
      }
      else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen(options); // s vs S
      }

    }
    else {

      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // s vs S
      }

    }
  },

});



/*
VR sensor / HMD hookup.
*/
THREE.Bootstrap.registerPlugin('vr', {

  defaults: {
    mode:   'auto',    // 'auto', '2d'
    device:  null,
    fov:     80,       // emulated FOV for fallback
  },

  listen: ['window.load', 'pre', 'render', 'resize', 'this.change'],

  install: function (three) {
    three.VR = this.api({
      active:   false,
      devices:  [],
      hmd:      null,
      sensor:   null,
      renderer: null,
      state:    null,
    }, three);
  },

  uninstall: function (three) {
    delete three.VR
  },

  mocks: function (three, fov, def) {
    // Fake VR device for cardboard / desktop

    // Interpuppilary distance
    var ipd = 0.03;

    // Symmetric eye FOVs (Cardboard style)
    var getEyeTranslation = function (key) { return {left: {x: -ipd, y: 0, z: 0}, right: {x: ipd, y: 0, z: 0}}[key]; };
    var getRecommendedEyeFieldOfView = function (key) {
      var camera = three.camera;
      var aspect = camera && camera.aspect || 16/9;
      var fov2   = (fov || (camera && camera.fov || def)) / 2;
      var fovX   = Math.atan(Math.tan(fov2 * Math.PI / 180) * aspect / 2) * 180 / Math.PI;
      var fovY   = fov2;

      return {
        left: {
          "rightDegrees": fovX,
          "leftDegrees":  fovX,
          "downDegrees":  fovY,
          "upDegrees":    fovY,
        },
        right: {
          "rightDegrees": fovX,
          "leftDegrees":  fovX,
          "downDegrees":  fovY,
          "upDegrees":    fovY,
        },
      }[key];
    };
    // Will be replaced with orbit controls or device orientation controls by THREE.VRControls
    var getState = function () { return {} };

    return [
      {
        fake: true,
        force: 1,
        deviceId: 'emu',
        deviceName: 'Emulated',
        getEyeTranslation: getEyeTranslation,
        getRecommendedEyeFieldOfView: getRecommendedEyeFieldOfView,
      },
      {
        force: 2,
        getState: getState,
      },
    ];
  },

  load: function (event, three) {
    var callback = function (devs) {
      this.callback(devs, three);
    }.bind(this);

    if (navigator.getVRDevices) {
      navigator.getVRDevices().then(callback);
    }
    else if (navigator.mozGetVRDevices) {
      navigator.mozGetVRDevices(callback);
    }
    else {
      console.warn('No native VR support detected.');
      callback(this.mocks(three, this.options.fov, this.defaults.fov), three);
    }
  },

  callback: function (vrdevs, three) {
    var hmd, sensor;

    var HMD    = window.HMDVRDevice            || function () {};
    var SENSOR = window.PositionSensorVRDevice || function () {};

    // Export list of devices
    vrdevs = three.VR.devices = vrdevs || three.VR.devices;

    // Get HMD device
    var deviceId = this.options.device;
    for (var i = 0; i < vrdevs.length; ++i) {
      var dev = vrdevs[i];
      if (dev.force == 1 || (dev instanceof HMD)) {
        if (deviceId && deviceId != dev.deviceId) continue;
        hmd = dev;
        break;
      }
    }

    if (hmd) {
      // Get sensor device
      for (var i = 0; i < vrdevs.length; ++i) {
        var dev = vrdevs[i];
        if (dev.force == 2 || (dev instanceof SENSOR && dev.hardwareUnitId == hmd.hardwareUnitId)) {
          sensor = dev;
          break;
        }
      }

      this.hookup(hmd, sensor, three);
    }
  },

  hookup: function (hmd, sensor, three) {
    if (!THREE.VRRenderer) console.log("THREE.VRRenderer not found");
    var klass = THREE.VRRenderer || function () {};

    this.renderer = new klass(three.renderer, hmd);
    this.hmd      = hmd;
    this.sensor   = sensor;

    three.VR.renderer = this.renderer;
    three.VR.hmd      = hmd;
    three.VR.sensor   = sensor;

    console.log("THREE.VRRenderer", hmd.deviceName);
  },

  change: function (event, three) {
    if (event.changes.device) {
      this.callback(null, three);
    }
    this.pre(event, three);
  },

  pre: function (event, three) {
    var last = this.active;

    // Global active flag
    var active = this.active = this.renderer && this.options.mode != '2d';
    three.VR.active = active;

    // Load sensor state
    if (active && this.sensor) {
      var state = this.sensor.getState();
      three.VR.state = state;
    }
    else {
      three.VR.state = null;
    }

    // Notify if VR state changed
    if (last != this.active) {
      three.trigger({ type: 'vr', active: active, hmd: this.hmd, sensor: this.sensor });
    }

  },

  resize: function (event, three) {
    if (this.active) {
      // Reinit HMD projection
      this.renderer.initialize();
    }
  },

  render: function (event, three) {
    if (three.scene && three.camera) {
      var renderer = this.active ? this.renderer : three.renderer;

      if (this.last != renderer) {
        if (renderer == three.renderer) {
          // Cleanup leftover renderer state when swapping back to normal
          var dpr    = renderer.getPixelRatio();
          var width  = renderer.domElement.width / dpr;
          var height = renderer.domElement.height / dpr;
          renderer.enableScissorTest(false);
          renderer.setViewport(0, 0, width, height);
        }
      }

      this.last = renderer;

      renderer.render(three.scene, three.camera);
    }
  },

});


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
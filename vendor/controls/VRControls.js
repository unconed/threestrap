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
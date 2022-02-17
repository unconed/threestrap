/**
 * VRRenderer
 *
 * @author wwwtyro https://github.com/wwwtyro
 * @author unconed https://github.com/unconed
 */
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera.js";
import { Vector3 } from "three/src/math/Vector3.js";

export class VRRenderer {
  constructor(renderer, hmd) {
    this.renderer = renderer;

    this.right = new Vector3();
    this.cameraLeft = new PerspectiveCamera();
    this.cameraRight = new PerspectiveCamera();

    var et = hmd.getEyeTranslation("left");
    this.halfIPD = new Vector3(et.x, et.y, et.z).length();
    this.fovLeft = hmd.getRecommendedEyeFieldOfView("left");
    this.fovRight = hmd.getRecommendedEyeFieldOfView("right");
  }

  FovToNDCScaleOffset(fov) {
    var pxscale = 2.0 / (fov.leftTan + fov.rightTan);
    var pxoffset = (fov.leftTan - fov.rightTan) * pxscale * 0.5;
    var pyscale = 2.0 / (fov.upTan + fov.downTan);
    var pyoffset = (fov.upTan - fov.downTan) * pyscale * 0.5;
    return {
      scale: [pxscale, pyscale],
      offset: [pxoffset, pyoffset],
    };
  }

  FovPortToProjection(
    matrix,
    fov,
    rightHanded /* = true */,
    zNear /* = 0.01 */,
    zFar /* = 10000.0 */
  ) {
    rightHanded = rightHanded === undefined ? true : rightHanded;
    zNear = zNear === undefined ? 0.01 : zNear;
    zFar = zFar === undefined ? 10000.0 : zFar;
    var handednessScale = rightHanded ? -1.0 : 1.0;
    var m = matrix.elements;
    var scaleAndOffset = this.FovToNDCScaleOffset(fov);
    m[0 * 4 + 0] = scaleAndOffset.scale[0];
    m[0 * 4 + 1] = 0.0;
    m[0 * 4 + 2] = scaleAndOffset.offset[0] * handednessScale;
    m[0 * 4 + 3] = 0.0;
    m[1 * 4 + 0] = 0.0;
    m[1 * 4 + 1] = scaleAndOffset.scale[1];
    m[1 * 4 + 2] = -scaleAndOffset.offset[1] * handednessScale;
    m[1 * 4 + 3] = 0.0;
    m[2 * 4 + 0] = 0.0;
    m[2 * 4 + 1] = 0.0;
    m[2 * 4 + 2] = (zFar / (zNear - zFar)) * -handednessScale;
    m[2 * 4 + 3] = (zFar * zNear) / (zNear - zFar);
    m[3 * 4 + 0] = 0.0;
    m[3 * 4 + 1] = 0.0;
    m[3 * 4 + 2] = handednessScale;
    m[3 * 4 + 3] = 0.0;
    matrix.transpose();
  }

  FovToProjection(
    matrix,
    fov,
    rightHanded /* = true */,
    zNear /* = 0.01 */,
    zFar /* = 10000.0 */
  ) {
    var fovPort = {
      upTan: Math.tan((fov.upDegrees * Math.PI) / 180.0),
      downTan: Math.tan((fov.downDegrees * Math.PI) / 180.0),
      leftTan: Math.tan((fov.leftDegrees * Math.PI) / 180.0),
      rightTan: Math.tan((fov.rightDegrees * Math.PI) / 180.0),
    };
    return this.FovPortToProjection(matrix, fovPort, rightHanded, zNear, zFar);
  }

  render(scene, camera) {
    this.FovToProjection(
      this.cameraLeft.projectionMatrix,
      this.fovLeft,
      true,
      camera.near,
      camera.far
    );
    this.FovToProjection(
      this.cameraRight.projectionMatrix,
      this.fovRight,
      true,
      camera.near,
      camera.far
    );

    this.right.set(this.halfIPD, 0, 0);
    this.right.applyQuaternion(camera.quaternion);

    this.cameraLeft.position.copy(camera.position).sub(this.right);
    this.cameraRight.position.copy(camera.position).add(this.right);

    this.cameraLeft.quaternion.copy(camera.quaternion);
    this.cameraRight.quaternion.copy(camera.quaternion);

    var dpr = this.renderer.devicePixelRatio || 1;
    var width = this.renderer.domElement.width / 2 / dpr;
    var height = this.renderer.domElement.height / dpr;

    this.renderer.enableScissorTest(true);

    this.renderer.setViewport(0, 0, width, height);
    this.renderer.setScissor(0, 0, width, height);
    this.renderer.render(scene, this.cameraLeft);

    this.renderer.setViewport(width, 0, width, height);
    this.renderer.setScissor(width, 0, width, height);
    this.renderer.render(scene, this.cameraRight);
  }
}

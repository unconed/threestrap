"use strict";

/**
 * VRRenderer
 *
 * @author wwwtyro https://github.com/wwwtyro
 * @author unconed https://github.com/unconed
 */
THREE.VRRenderer = function(renderer, hmd) {

    var self = this;

    self.initialize = function() {
        var et = hmd.getEyeTranslation("left");
        self.halfIPD = new THREE.Vector3(et.x, et.y, et.z).length();
        self.fovLeft = hmd.getRecommendedEyeFieldOfView("left");
        self.fovRight = hmd.getRecommendedEyeFieldOfView("right");
    }

    self.FovToNDCScaleOffset = function(fov) {
        var pxscale = 2.0 / (fov.leftTan + fov.rightTan);
        var pxoffset = (fov.leftTan - fov.rightTan) * pxscale * 0.5;
        var pyscale = 2.0 / (fov.upTan + fov.downTan);
        var pyoffset = (fov.upTan - fov.downTan) * pyscale * 0.5;
        return {
            scale: [pxscale, pyscale],
            offset: [pxoffset, pyoffset]
        };
    }

    self.FovPortToProjection = function(matrix, fov, rightHanded /* = true */ , zNear /* = 0.01 */ , zFar /* = 10000.0 */ ) {
        rightHanded = rightHanded === undefined ? true : rightHanded;
        zNear = zNear === undefined ? 0.01 : zNear;
        zFar = zFar === undefined ? 10000.0 : zFar;
        var handednessScale = rightHanded ? -1.0 : 1.0;
        var m = matrix.elements;
        var scaleAndOffset = self.FovToNDCScaleOffset(fov);
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
        m[2 * 4 + 2] = zFar / (zNear - zFar) * -handednessScale;
        m[2 * 4 + 3] = (zFar * zNear) / (zNear - zFar);
        m[3 * 4 + 0] = 0.0;
        m[3 * 4 + 1] = 0.0;
        m[3 * 4 + 2] = handednessScale;
        m[3 * 4 + 3] = 0.0;
        matrix.transpose();
    }

    self.FovToProjection = function(matrix, fov, rightHanded /* = true */ , zNear /* = 0.01 */ , zFar /* = 10000.0 */ ) {
        var fovPort = {
            upTan: Math.tan(fov.upDegrees * Math.PI / 180.0),
            downTan: Math.tan(fov.downDegrees * Math.PI / 180.0),
            leftTan: Math.tan(fov.leftDegrees * Math.PI / 180.0),
            rightTan: Math.tan(fov.rightDegrees * Math.PI / 180.0)
        };
        return self.FovPortToProjection(matrix, fovPort, rightHanded, zNear, zFar);
    }

    var right  = new THREE.Vector3();

    var cameraLeft  = new THREE.PerspectiveCamera();
    var cameraRight = new THREE.PerspectiveCamera();

    self.render = function(scene, camera) {
        self.FovToProjection(cameraLeft .projectionMatrix, self.fovLeft , true, camera.near, camera.far);
        self.FovToProjection(cameraRight.projectionMatrix, self.fovRight, true, camera.near, camera.far);

        right.set(self.halfIPD, 0, 0);
        right.applyQuaternion(camera.quaternion);

        cameraLeft .position.copy(camera.position).sub(right);
        cameraRight.position.copy(camera.position).add(right);

        cameraLeft .quaternion.copy(camera.quaternion);
        cameraRight.quaternion.copy(camera.quaternion);

        var dpr    = renderer.devicePixelRatio || 1;
        var width  = renderer.domElement.width  / 2 / dpr;
        var height = renderer.domElement.height / dpr;

        renderer.enableScissorTest(true);

        renderer.setViewport(0, 0, width, height);
        renderer.setScissor (0, 0, width, height);
        renderer.render(scene, cameraLeft);

        renderer.setViewport(width, 0, width, height);
        renderer.setScissor (width, 0, width, height);
        renderer.render(scene, cameraRight);
    }

    self.initialize();
}

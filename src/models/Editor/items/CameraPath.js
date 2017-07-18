import $ from 'jquery';
import THREE from 'three';

import {COLORS} from '../constants';
import Rectangle from './Rectangle';

function CameraPath(cameraPath, node)
{
    this.MATERIALS = {
        constraint: new THREE.MeshBasicMaterial({
            color: COLORS.camera.constraint,
            wireframe: true,
        }),
        window: new THREE.MeshBasicMaterial({
            color: COLORS.camera.window,
            wireframe: true,
        }),
    };

    Rectangle.call(this, cameraPath, $(node).find('> window'),
        cameraPath.window[0], cameraPath.window[1]);

    this.model = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 1, 1),
        this.MATERIALS.window);

    const constraint = new Rectangle(cameraPath, $(node).find('> constraint'),
        cameraPath.constraint[0], cameraPath.constraint[1]);

    constraint.model = new THREE.Mesh(
        new THREE.PlaneGeometry(25, 25, 1, 1),
        this.MATERIALS.constraint);

    this.addChild(constraint);

    this.update();
    constraint.update();
}

CameraPath.prototype = Object.create(Rectangle.prototype);
CameraPath.prototype.constructor = CameraPath;

CameraPath.prototype.TYPE = 'cameraPath';

export default CameraPath;

import THREE from 'three';
import Point from './Point';
import {COLORS} from '../constants';

function Checkpoint(checkpoint, node)
{
    this.MATERIALS = {
        checkpoint: new THREE.MeshBasicMaterial({
            color: COLORS.checkpoint,
            wireframe: true
        }),
    };

    const vec = new THREE.Vector3(checkpoint.pos.x, checkpoint.pos.y);
    vec.z = null;

    Point.call(this, checkpoint, node, vec);

    this.model = new THREE.Mesh(
        new THREE.CircleGeometry(checkpoint.radius, 16),
        this.MATERIALS.checkpoint);

    this.moveTo(vec);
}

Checkpoint.prototype = Object.create(Point.prototype);
Checkpoint.prototype.constructor = Checkpoint;

Checkpoint.prototype.TYPE = 'checkpoint';

Checkpoint.prototype.update = function()
{
    this.object.pos.copy(this.point);
    Point.prototype.update.call(this);
}

export default Checkpoint;
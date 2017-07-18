import THREE from 'three';

import {COLORS} from '../constants';
import Rectangle from './Rectangle';
import Rectangle2 from './Rectangle2';

function Behavior(object, node)
{
    if(object.traits.length === 1) {
        if (object.solid) {
            this.MATERIAL = new THREE.MeshBasicMaterial({
                color: COLORS.behavior.solid,
                wireframe: true,
            });
        } else if (object.climbable) {
            this.MATERIAL = new THREE.MeshBasicMaterial({
                color: COLORS.behavior.climbable,
                wireframe: true,
            });
        } else if (object.deathZone) {
            this.MATERIAL = new THREE.MeshBasicMaterial({
                color: COLORS.behavior.deathzone,
                wireframe: true,
            });
        }
    }

    Rectangle2.call(this, object, node, object.collision[0]);
    object.collision[0].geometry = this.model.geometry;
    this.moveTo(object.position);
}

Behavior.prototype = Object.create(Rectangle2.prototype);
Behavior.prototype.constructor = Behavior;

Behavior.prototype.TYPE = 'behavior';

Behavior.prototype.update = function()
{
    Rectangle.prototype.update.call(this);
    this.object.position.copy(this.model.position);
}

export default Behavior;
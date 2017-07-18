import {Vector2} from 'three';

import Rectangle from './Rectangle';

function Rectangle2(object, node, bounds)
{
    let vec1 = new Vector2(bounds.x - bounds.w / 2, bounds.y - bounds.h / 2),
        vec2 = new Vector2(bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);

    Rectangle.call(this, object, node, vec1, vec2);
}

Rectangle2.prototype = Object.create(Rectangle.prototype);
Rectangle2.prototype.constructor = Rectangle2;

Rectangle2.prototype.updateNode = function()
{
    let p = this.model.position,
        v = this.vectors,
        n = this.node;

    n.attr({
        "x": this.round(p.x),
        "y": this.round(p.y),
        "w": this.round(v[1].x - v[0].x),
        "h": this.round(v[1].y - v[0].y),
    });
}

export default Rectangle2;
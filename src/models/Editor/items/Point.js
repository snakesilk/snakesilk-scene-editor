import Item from './Item';

function Point(object, node, vec)
{
    Item.call(this, object, node);
    this.point = vec;
}

Point.prototype = Object.create(Item.prototype);
Point.prototype.constructor = Point;

Point.prototype.getComponent = function(name)
{
    return this.point[name];
}

Point.prototype.setComponent = function(name, value)
{
    this.propagateComponent(name, value);
    this.point[name] = this.round(value);
    this.update();
}

Point.prototype.updateNode = function()
{
    const n = this.node;
    Object.keys(this.point).forEach(key => {
        if (this.point[key] == null) {
            n.attr(key, null);
        } else {
            n.attr(key, this.round(this.point[key]));
        }
    });
}

Point.prototype.update = function()
{
    this.model.position.copy(this.point);
    this.updateNode();
}

export default Point;

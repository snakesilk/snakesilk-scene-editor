import $ from 'jquery';
import Point from './Point';

function Mesh(mesh)
{
    Point.call(this, mesh, $('<dummy>'), mesh.position);
    this.model = mesh;
}

Mesh.prototype = Object.create(Point.prototype);
Mesh.prototype.constructor = Mesh;

export default Mesh;

function Camera(editor)
{
    this.editor = editor;
    this.zoomFactor = Math.sqrt(2);
}

Object.defineProperties(Camera.prototype, {
    camera: {
        get: function() {
            return this.editor.scene && this.editor.scene.camera;
        },
    },
    realCamera: {
        get: function() {
            return this.camera && this.camera.camera;
        },
    },
    position: {
        get: function() {
            return this.realCamera.position;
        },
    },
});

Camera.prototype.centerGrid = function()
{
    let grid = this.editor.grid;
    grid.position.copy(this.camera.position);
    grid.snapVector(grid.position);
    grid.position.z = 0;
}

Camera.prototype.followSelected = function()
{
    let e = this.editor,
        i = e.items.selected[0],
        c = e.game.scene.camera;

    if (!i) {
        return;
    }

    c.follow(i.object);
}

Camera.prototype.moveTo = function(vec2)
{
    this.position.x = vec2.x;
    this.position.y = vec2.y;
}

Camera.prototype.nudge = function(vec2)
{
    let c = this.realCamera,
        p = c.position.clone();
    p.x += vec2.x;
    p.y += vec2.y;
    this.moveTo(p);
}

Camera.prototype.zoom = function(units)
{
    this.position.z += units;
    this.editor.grid.visible = this.position.z < 400;
}

Camera.prototype.zoomOut = function()
{
    this.zoom(-10);
}

Camera.prototype.zoomIn = function()
{
    this.zoom(10);
}

export default Camera;

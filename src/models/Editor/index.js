import $ from 'jquery';
import THREE from 'three';
import {UVCoords} from '@snakesilk/engine';
import {Parser} from '@snakesilk/xml-loader';

import {createLoader} from './Config';
import Camera from './Camera';
import Clipboard from './Clipboard';
import ComponentFactory from './ComponentFactory';
import ItemSet from './ItemSet';
import Modes from './Modes';
import UI from './UI';
import * as Items from './items';

function Editor()
{
    this.document = undefined;
    this.game = undefined;
    this.scene = undefined;

    this.camera = new Camera(this);
    this.clipboard = new Clipboard();
    this.componentFactory = new ComponentFactory(this);
    this.modes = new Modes(this);

    this.loader = createLoader();
    this.game = this.loader.game;

    this.activeMode = this.modes.view;

    this.storage = localStorage;

    this.grid = this.createGrid();
    this.marker = this.createMarker();

    this.renderOverlays = this.renderOverlays.bind(this);
}

Editor.prototype.setupUI = function(workspace) {
    this.ui = new UI(this, workspace);
    this.attachGame(this.game);
}

Editor.prototype.attachGame = function(game)
{
    game.renderer.autoClear = false;
    game.attachToElement(this.ui.viewport[0]);
    game.events.bind(game.EVENT_SCENE_CREATE, scene => {
        const timer = game.timer;
        timer.events.bind(timer.EVENT_RENDER, this.renderOverlays);
    });
    game.events.bind(game.EVENT_SCENE_DESTROY, scene => {
        const timer = game.timer;
        timer.events.unbind(timer.EVENT_RENDER, this.renderOverlays);
    });
    this.game = game;
}

Editor.prototype.clear = function()
{
    this.scene = undefined;

    this.componentFactory = new ComponentFactory(this);
    this.items = new ItemSet(this);

    this.guides = new THREE.Scene();
    this.guides.add(this.marker);
    this.guides.add(this.grid);

    this.marker.position.set(0,0,0);

    this.overlays = new THREE.Scene();

    this.layers = [
        this.guides,
        this.overlays,
    ];

    this.layers.guides = this.guides;
    this.layers.overlays = this.overlays;

    this.ui.palette.html('');
}

Editor.prototype.createGrid = function()
{
    const grid = new THREE.GridHelper(32, 1);
    grid.setColors(0x00ffff, 0xa0c3d2);
    grid.rotation.x = Math.PI / 2;
    grid.material.opacity = .22;
    grid.material.transparent = true;
    grid.scale.multiplyScalar(8);
    grid.snap = false;
    grid.snapVector = function(vec) {
        const components = ['x','y'];
        for (let c of components) {
            let s = this.scale[c],
                v = vec[c],
                i = s * Math.round(v / s);
            vec[c] = parseFloat(i.toFixed(8));
        }
        return vec;
    }
    return grid;
}

Editor.prototype.createMarker = function()
{
    const material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    const geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -10, 0),
        new THREE.Vector3(0, 10, 0)
    );

    const marker = new THREE.Line(geometry, material);
    marker.moveTo = pos => {
        marker.position.copy(pos);
        if (this.grid.snap) {
            this.grid.snapVector(this.position);
        }
        marker.position.z = 0;
        this.ui.viewport.coords.find('.x > .value').text(this.position.x.toFixed(2));
        this.ui.viewport.coords.find('.y > .value').text(this.position.y.toFixed(2));
    }

    return marker;
}

Editor.prototype.getXML = function()
{
    return this.document[0].outerHTML;
}

Editor.prototype.loadURL = function(url)
{
    return this.loader.asyncLoadXML(url)
    .then(doc => {
        const sceneNode = doc.querySelector('scene');
        if (!sceneNode) {
            throw new Error(`${url} does not contain <scene/>.`);
        }

        this.document = $(doc.children[0]);
        return this.loadNode(sceneNode);
    });
}

Editor.prototype.loadNode = function(node)
{
    const parser = new Parser.SceneParser(this.loader);
    return parser.getScene(node)
    .then(context => this.open(context));
}

Editor.prototype.open = function(context)
{
    this.clear();

    this.setupScene(context.scene);
    this.setupObjects(context);
    //this.setupSceneCheckpoints();
    this.setupSceneCamera();
    this.buildPalette(context);
    this.game.resume();
    this.game.scene.pause();
}

Editor.prototype.setupScene = function(scene)
{
    this.scene = scene;
    this.scene.input.disable();
    this.game.setScene(scene);
    this.game.audioPlayer.pause();
}

Editor.prototype.setupObjects = function(context)
{
    context.layoutObjects.forEach(o => {
        const i = new Items.Object(o.instance, o.node, o.sourceNode);
        this.items.add(i);
    });

    context.bevahiorObjects.forEach(o => {
        const b = new Items.Behavior(o.instance, o.node);
        this.items.add(b);
    });
}

Editor.prototype.setupSceneCheckpoints = function()
{
    const nodes = this.document.find('> checkpoints > checkpoint');
    this.scene.checkPoints.forEach((chkp, i) => {
        this.componentFactory.createCheckpoint(nodes[i], chkp)
            .then(item => { this.items.add(item); });
    });
}

Editor.prototype.setupSceneCamera = function()
{
    const camera = this.camera.realCamera;
    camera.far = 4000;
    camera.position.z = 300;
    camera.updateProjectionMatrix();
    /*if (this.scene.checkPoints.length) {
        this.camera.camera.jumpTo(this.scene.checkPoints[0].pos);
    }*/

    const nodes = this.document.find('> camera > path');
    this.scene.camera.paths.forEach((path, i) => {
        this.componentFactory.createCameraPath($(nodes[i]), path)
            .then(item => { this.items.add(item); });
    });
}

Editor.prototype.buildPalette = function(parser)
{
    const editor = this;
    this.document.find('> objects').each(function() {
        const txtNode = $(this).find('> textures > texture');
        if (txtNode.length === 0) {
            return;
        }

        const url = parser.resolveURL(txtNode[0]);
        const totalW = parseInt(txtNode.attr('w'), 10);
        const totalH = parseInt(txtNode.attr('h'), 10);

        $(this).find('> animations > animation').each(function() {
            const anim = $(this);
            const name = anim.attr('id');

            anim.find('> frame:first-child').each(function() {
                const frameNode = this,
                    x = parser.getFloat(frameNode, 'x') + 1,
                    y = parser.getFloat(frameNode, 'y') + 1,
                    w = parser.getFloat(frameNode, 'w'),
                    h = parser.getFloat(frameNode, 'h');

                const item = $('<div class="animation">');
                item.css({
                    'background-image': 'url(' + url + ')',
                    'background-position': -x + 'px ' + -y + 'px',
                    'height': h,
                    'width': w,
                });
                const uvcoords = new UVCoords({x, y}, {x: w, y: h}, {x: totalW, y: totalH});
                item.data('uv-coords', uvcoords);
                item.attr('name', name);
                editor.ui.palette.append(item);
            });
        });
    });
}

Editor.prototype.renderOverlays = function()
{
    const renderer = this.game.renderer;
    const camera = this.camera.realCamera;
    //renderer.render(this.scene.world, camera);
    this.layers.forEach(layer => {
        if (layer.visible) {
            renderer.clearDepth();
            renderer.render(layer, camera);
        }
    });
}

export default Editor;

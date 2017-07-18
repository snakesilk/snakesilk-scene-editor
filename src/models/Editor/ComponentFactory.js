import $ from 'jquery';
import {Parser} from '@snakesilk/xml-loader';

import NodeFactory from './NodeFactory';
import NodeManager from './NodeManager';
import * as Items from './items';

const {ObjectParser, SceneParser} = Parser;

function ComponentFactory(editor)
{
    this.editor = editor;
    this.nodeFactory = new NodeFactory(editor.document);
    this.nodeManager = new NodeManager(editor.document);
}

ComponentFactory.prototype.createBehavior = function(node, instance)
{
    if (!instance) {
        const parser = new SceneParser();
        instance = parser.getBehavior(node[0]).instance;
    }

    this.nodeManager.addBehavior(node);

    const item = new Items.Behavior(instance, node);
    return Promise.resolve(item);
}

ComponentFactory.prototype.createCameraPath = function(pathNode, cameraPath)
{
    const camera = this.editor.scene.camera;

    if (!pathNode) {
        pathNode = this.nodeFactory.createCameraPath();
        this.nodeManager.addCameraPath(pathNode);
    }

    if (!cameraPath) {
        console.warn('TODO: Implement CameraPath parsing');
        /*const parser = new Parser();
        cameraPath = parser.getCameraPath(pathNode[0]);
        this.editor.scene.camera.addPath(cameraPath);*/
    }

    const item = new Items.CameraPath(cameraPath, pathNode);

    item.delete = function() {
        pathNode.remove();
        camera.paths = camera.paths.filter(test => {
            return cameraPath !== test;
        });
    }

    return Promise.resolve(item);
}

ComponentFactory.prototype.createCheckpoint = function(checkpointNode, checkpoint)
{
    const level = this.editor.scene;

    if (!checkpointNode) {
        checkpointNode = this.nodeFactory.createCheckpoint();
        this.nodeManager.addCheckpoint(checkpointNode);
    }

    if (!checkpoint) {
        const c = {
            x: parseFloat(checkpointNode.attr('x')),
            y: -parseFloat(checkpointNode.attr('y')),
            r: parseFloat(checkpointNode.attr('r')),
        };
        level.addCheckPoint(c.x, c.y, c.r);
        checkpoint = level.checkPoints[level.checkPoints.length - 1];
    }

    const item = new Items.Checkpoint(checkpoint, checkpointNode);

    item.delete = function() {
        checkpointNode.remove();
        level.checkPoints = level.checkPoints.filter(test => {
            return checkpoint !== test;
        });
    }

    return Promise.resolve(item);
}

ComponentFactory.prototype.createObject = function(objectNode, objectRef)
{
    return new Promise(resolve => {
        if (!objectRef) {
            const objectsNode = $('<objects/>', this.editor.document).append(objectNode);
            const id = objectNode.attr('id');
            const parser = new ObjectParser(this.loader, objectsNode[0]);
            return parser.getObjects().then(objects => {
                this.nodeManager.addObject(objectNode);
                resolve(objects[id].constructor);
            });
        } else {
            resolve(objectRef);
        }
    }).then(objectRef => {
        const objectInstance = new objectRef();
        const objectInstanceNode = this.nodeFactory.createObjectInstance(objectInstance);
        this.nodeManager.addObjectInstance(objectInstanceNode);
        const item = new Items.Object(objectInstance, objectInstanceNode, objectNode);
        return item;
    });
}

export default ComponentFactory;

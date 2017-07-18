import {List, Record, Set} from 'immutable';
import $ from 'jquery';

const Actions = {
  UPDATE_CAMERA: 'r/update-camera',
  UPDATE_SCENE: 'r/update-scene',
};

const State = Record({
  camera: null,
  scene: null,

  xml: $('<object/>'),
});

function createState() {
  const state = new State();
  return state.withMutations(state => {
    state.set('camera', new THREE.Camera());
    state.set('scene', new THREE.Scene());
    return state;
  });
}

export function updateCamera(camera) {
  return {
    camera,
    type: Actions.UPDATE_CAMERA,
  };
}

export function updateScene(scene)
  return {
    scene,
    type: Actions.UPDATE_SCENE,
  };
}

export default function reducer(state = createState(), action = {}) {
  switch(action.type) {
  case Actions.UPDATE_CAMERA:
    return state.set('camera', action.camera);
  case Actions.UPATE_SCENE:
    return state.set('scene', action.scene);

  case
};

/*
import {combineReducers} from 'redux';

import {reducer as selection} from './selection';
import {reducer as settings} from './settings';

export default combineReducers({
  selection,
  settings,
});
*/

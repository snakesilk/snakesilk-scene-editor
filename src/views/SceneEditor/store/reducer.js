import {Record} from 'immutable';
import Editor from '../../../models/Editor';

const Actions = {
  REFRESH: Symbol(),
  TOGGLE_SNAP: Symbol('toggle-snap'),
  TOGGLE_SIMULATE: Symbol('toggle-simulate'),
};

const State = Record({
  editor: null,
  serial: 0,
});

function createState() {
  const state = new State();
  return state.set('editor', new Editor());
}

export function refresh() {
  return {
    type: Actions.REFRESH,
  };
}

export function toggleSnap() {
  return {
    type: Actions.TOGGLE_SNAP,
  }
}

export function toggleSimulate() {
  return {
    type: Actions.TOGGLE_SIMULATE,
  }
}

function incr(state) {
  return state.set('serial', state.serial + 1);
}

export default function reducer(state = createState(), action = {}) {
  switch(action.type) {
  case Actions.REFRESH:
    return incr(state);

  case Actions.SET_EDITOR:
    state.editor.grid.snap = !state.editor.grid.snap;
    return incr(state);

  case Actions.TOGGLE_SNAP:
    state.editor.grid.snap = !state.editor.grid.snap;
    return incr(state);

  case Actions.TOGGLE_SIMULATE:
    {
      const scene = state.editor.game.scene;
      if (scene._paused) {
        scene.resume();
      } else {
        scene.pause();
      }
      return incr(state);
    }
  default:
    return state;
  }
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

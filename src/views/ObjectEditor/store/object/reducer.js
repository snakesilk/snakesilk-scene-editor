import {Record} from 'immutable';
import $ from 'jquery';
import animationsReducer from './animations/reducer';

const State = Record({
  node: undefined,
});

const Actions = {
  ADD_COLLISION: 'r/object/add-collision',
  REMOVE_COLLISION: 'r/object/remove-collision',

  ADD_GEOMETRY: 'r/object/add-geometry',
};

export function addRectangularCollisionZone(w, h, offsetX = null, offsetY = null) {
  return {
    type: Actions.ADD_COLLISION,
    node: $('<rect/>').attr({
      w,
      h,
      'offset-x': offsetX,
      'offset-y': offsetY,
    }),
  };
}

export function addPlaneGeometry(w, h, segmentsX = 1, segmentsY = 1) {
  return {
    type: Actions.ADD_GEOMETRY,
    node: $('<geometry/>').attr({
      type: 'plane',
      w,
      h,
      'x-segments': segmentsX,
      'y-segments': segmentsY,
    }),
  };
}

function objectReducer(objectNode = $('<object/>'), action = {}) {
  let next = objectNode;
  {
    const originalNode = objectNode.find('> animations');
    const node = animationsReducer(originalNode.length ? originalNode : undefined);
    if (originalNode !== node) {
      next = objectNode.clone().append(node);
    }
  }

  switch(action.type) {
  case Actions.ADD_COLLISION:
  {
    const collisionNode = $('<collision/>');
    collisionNode.append(action.node);
    return next.clone().append(collisionNode);
  }
  case Actions.ADD_GEOMETRY:
  {
    console.log(action.node[0].outerHTML);
    return next.clone().append(action.node);
  }
  default:
    return next;
  }
};

export default function reducer(state = new State(), action = {}) {
  let nextState = state;
  {
    const node = objectReducer(state.node, action);
    if (node !== state.node) {
      nextState = state.set('node', node);
    }
  }
  return nextState;
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

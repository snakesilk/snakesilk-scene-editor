import {Record} from 'immutable';

const Actions = {
  TOGGLE_SNAP: 'r/settings/toggle-snap',
};

const State = Record({
  snap: true,
});

export function toggleSnap() {
  return {
    type: Actions.TOGGLE_SNAP,
  };
}

export function reducer(state = new State(), action = {}) {
  switch (action.type) {
  case Actions.TOGGLE_SNAP:
    return state.set('snap', !state.snap);
  default:
    return state;
  }
};

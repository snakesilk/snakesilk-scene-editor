import {List, Record} from 'immutable';

const Actions = {
  STACK: 'r/dialog/stack',
  DISMISS: 'r/dialog/dismiss',
};

const State = Record({
  counter: 0,
  stack: new List(),
});

export function addDialog(component) {
  return {
    type: Actions.STACK,
    component,
  };
}

export function dismiss(id) {
  return {
    type: Actions.DISMISS,
    id,
  };
}

export function reducer(state = new State(), action = {}) {
  switch (action.type) {
  case Actions.STACK:
  {
    const next = state.counter + 1;
    return state
      .set('stack', state.stack.clear().push({
        component: action.component,
        id: next,
      }))
      .set('counter', next);
  }
  case Actions.DISMISS:
  {
    const index = state.stack.findIndex(({id}) => id === action.id);
    return state.set('stack', state.stack.delete(index));
  }
  default:
    return state;
  }
};

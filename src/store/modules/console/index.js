import {Record} from 'immutable';

const Actions = {
  SET_CONTENTS: 'r/console/set-contents',
};

const State = Record({
  contents: '',
});

export function setContents(string) {
  return {
    type: Actions.SET_CONTENTS,
    string,
  };
}

export function reducer(state = new State(), action = {}) {
  switch (action.type) {
  case Actions.SET_CONTENTS:
    return state.set('contents', action.string);
  default:
    return state;
  }
};

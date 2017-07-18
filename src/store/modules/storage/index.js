import {List, Record} from 'immutable';
import {createModule} from '@scarbor/redux-user-storage';

const RECENT_LENGTH = 10;

const Actions = {
  ADD_RECENT: 'r/storage/add-recent',
};

const module = createModule({
  localStorageKey: 'snakesilk-editor-user-storage',
});

const State = Record({
  localStorage: undefined,
  recent: new List(),
});

export function addRecent(url) {
  return {
    url,
    type: Actions.ADD_RECENT,
  };
}

function reducer(state = new State(), action) {
  switch(action.type) {
  case Actions.ADD_RECENT:
    {
      const recent = state.recent.withMutations(recent => {
        const url = action.url;
        while (recent.includes(url)) {
          const index = recent.indexOf(url);
          recent.remove(index);
        }
        return recent.unshift(url).take(RECENT_LENGTH);
      });

      return state
        .set('recent', recent)
        .set('localStorage', module.reducer(state.localStorage, module.set('history', recent.toArray())))
    }
  default:
    const localStorage = module.reducer(state.localStorage, action);
    return state
      .set('recent', new List(localStorage.get('history', [])))
      .set('localStorage', localStorage);
  }

};

export {
  reducer,
};

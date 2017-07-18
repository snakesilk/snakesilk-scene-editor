import {List, Record} from 'immutable';
import {createStore} from 'redux';
import editorReducer from '../../../views/SceneEditor/store/reducer';

const Actions = {
  ADD_WORKSPACE: 'r/workspace/add-workspace',
  REMOVE_WORKSPACE: 'r/workspace/remove-workspace',
  SET_ACTIVE_WORKSPACE: 'r/workspace/set-active',
  TOGGLE_OVERVIEW_MODE: 'r/workspace/toggle-overview-mode',
};

const BaseState = Record({
  active: null,
  overviewMode: false,
  workspaces: new List(),
});

class State extends BaseState {
  get activeWorkspace() {
    return this.workspaces.get(this.active);
  }
};

export function addWorkspace(url = '/blank.xml') {
  const store = createStore(editorReducer);
  return {
    type: Actions.ADD_WORKSPACE,
    workspace: {
      url,
      store,
      // Blasphemy
      editor: store.getState().editor,
    },
  };
}

export function removeWorkspace(index) {
  return {
    index,
    type: Actions.REMOVE_WORKSPACE,
  };
}

export function setActiveWorkspace(index) {
  return {
    type: Actions.SET_ACTIVE_WORKSPACE,
    index,
  };
}

export function toggleOverviewMode() {
  return {
    type: Actions.TOGGLE_OVERVIEW_MODE,
  };
}

function pauseAll(state) {
  state.workspaces.forEach(workspace => {
    workspace.editor.game.timer.pause();
  });
}

function resumeActive(state) {
  state.workspaces.get(state.active).editor.game.timer.run();
}

function activateWorkspace(state, index) {
  pauseAll(state);
  state.set('active', index);
  resumeActive(state);
}

export function reducer(state = new State(), action = {}) {
  switch (action.type) {
  case Actions.TOGGLE_OVERVIEW_MODE:
    return state.withMutations(state => {
      state.set('overviewMode', !state.overviewMode);
      if (state.overviewMode) {
        pauseAll(state);
      } else {
        resumeActive(state);
      }
      return state;
    });
  case Actions.ADD_WORKSPACE:
    return state
      .set('workspaces', state.workspaces.push(action.workspace))
      .set('overviewMode', false)
      .withMutations(state => {
        activateWorkspace(state, state.workspaces.size - 1);
        return state;
      });
  case Actions.REMOVE_WORKSPACE:
    return state
      .set('workspaces', state.workspaces.delete(action.index))
      .set('overviewMode', true)
      .withMutations(state => {
        activateWorkspace(state, Math.min(state.active, state.workspaces.size - 1));
        return state;
      });
  case Actions.SET_ACTIVE_WORKSPACE:
    return state
      .withMutations(state => {
        activateWorkspace(state, action.index);
        return state;
      })
      .set('overviewMode', false);
  default:
    return state;
  }
};

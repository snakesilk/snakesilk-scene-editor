import {combineReducers} from 'redux';

import {reducer as console} from './modules/console';
import {reducer as dialog} from './modules/dialog';
import {reducer as storage} from './modules/storage';
import {reducer as workspace} from './modules/workspace';

export default combineReducers({
  console,
  dialog,
  storage,
  workspace,
});

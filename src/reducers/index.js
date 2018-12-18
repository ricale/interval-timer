import {combineReducers} from 'redux';

import player from './player';
import timers from './timers';

export default combineReducers({
  player,
  timers,
});

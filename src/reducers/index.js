import {combineReducers} from 'redux';

import player from './player';
import intervals from './intervals';

export default combineReducers({
  player,
  intervals,
});

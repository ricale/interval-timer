import {combineReducers} from 'redux';

import intervals from './intervals';
import timer from './timer';

export default combineReducers({
  intervals,
  timer,
});

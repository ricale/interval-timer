import {combineReducers} from 'redux';

import config from './config';
import intervals from './intervals';
import timer from './timer';

export default combineReducers({
  config,
  intervals,
  timer,
});

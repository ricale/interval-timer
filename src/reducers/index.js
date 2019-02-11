import {combineReducers} from 'redux';

import config from './config';
import history from './history';
import intervals from './intervals';
import timer from './timer';

export default combineReducers({
  config,
  history,
  intervals,
  timer,
});

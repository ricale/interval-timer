import {combineReducers} from 'redux';

import config from './config';
import intervals from './intervals';
import router from './router';
import timer from './timer';
import timerHistory from './timerHistory';

export default history => combineReducers({
  config,
  timerHistory,
  intervals,
  router: router(history),
  timer,
});

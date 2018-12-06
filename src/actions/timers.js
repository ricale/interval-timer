import {createActions} from 'redux-actions';

const actions = createActions({
  TIMERS: {
    CREATE_TIMER: (name, hours, minutes, seconds) => ({name, hours, minutes, seconds})
  }
});

export default actions;

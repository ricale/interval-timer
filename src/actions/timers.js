import {createActions} from 'redux-actions';

const actions = createActions({
  TIMERS: {
    CREATE_TIMER: (data) => (data),
    DELETE_TIMER: (id) => ({id}),
    DELETE_ALL_TIMER: () => ({}),

    START_TIMER: () => ({}),
    STOP_TIMER: () => ({}),
    PAUSE_TIMER: () => ({}),
    RESUME_TIMER: () => ({}),
    GO_TO_NEXT_TIMER: () => ({}),
  },
});

export default actions;

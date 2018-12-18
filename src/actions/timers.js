import {createActions} from 'redux-actions';

const actions = createActions({
  TIMERS: {
    CREATE_TIMER: (data) => (data),
    DELETE_TIMER: (id) => ({id}),
    DELETE_ALL_TIMER: () => ({}),
  },
});

export default {...actions.timers};

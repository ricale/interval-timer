import {createActions} from 'redux-actions';

const actions = createActions({
  TIMERS: {
    CREATE_TIMER: (data) => (data),
    EDIT_TIMER: (id) => ({id}),
    CANCEL_EDIT_TIMER: () => ({}),
    UPDATE_TIMER: (data) => (data),
    DELETE_TIMER: (id) => ({id}),
    DELETE_ALL_TIMER: () => ({}),
  },
});

export default {...actions.timers};

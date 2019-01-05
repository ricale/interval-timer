import {createActions} from 'redux-actions';

const actions = createActions({
  INTERVALS: {
    CREATE_INTERVAL: (data) => (data),
    EDIT_INTERVAL: (id) => ({id}),
    CANCEL_EDIT_INTERVAL: () => ({}),
    UPDATE_INTERVAL: (data) => (data),
    DELETE_INTERVAL: (id) => ({id}),
    DELETE_ALL_INTERVAL: () => ({}),
  },
});

export default {...actions.intervals};

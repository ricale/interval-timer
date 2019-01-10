import {createActions} from 'redux-actions';

const actions = createActions({
  CONFIG: {
    TOGGLE_FILLED: () => ({}),
    TURN_ON_FILLED: () => ({}),
    TURN_OFF_FILLED: () => ({}),
  },
});

export default {...actions.config};

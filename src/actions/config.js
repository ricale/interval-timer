import {createActions} from 'redux-actions';

const actions = createActions({
  CONFIG: {
    TOGGLE_FILLED: () => ({}),
    TOGGLE_RINGABLE: () => ({}),
    TOGGLE_ANIMATABLE: () => ({}),
  },
});

export default {...actions.config};

import {createActions} from 'redux-actions';

const actions = createActions({
  CONFIG: {
    TOGGLE_RINGABLE: () => ({}),
    TOGGLE_ANIMATABLE: () => ({}),
    TOGGLE_NOTIFICATION: () => ({}),
  },
});

export default {...actions.config};

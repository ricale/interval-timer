import {createActions} from 'redux-actions';

const actions = createActions({
  PLAYER: {
    START: () => ({}),
    STOP: () => ({}),
    PAUSE: () => ({}),
    RESUME: () => ({}),
    GO_TO_NEXT: () => ({}),
  },
});

export default {...actions.player};

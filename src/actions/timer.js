import {createActions} from 'redux-actions';

const actions = createActions({
  TIMER: {
    START: () => ({}),
    STOP: () => ({}),
    PAUSE: () => ({}),
    RESUME: () => ({}),
    GO_TO_NEXT: () => ({}),

    RING_ALARM: () => ({}),
    STOP_ALARM: () => ({}),
  },
});

export default {...actions.timer};

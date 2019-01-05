import {createActions} from 'redux-actions';

const actions = createActions({
  TIMER: {
    START: () => ({}),
    STOP: () => ({}),
    PAUSE: () => ({}),
    RESUME: () => ({}),
    GO_TO_NEXT: () => ({}),

    TURN_OFF_ALARM: () => ({}),
    TURN_ON_ALARM: () => ({}),
    RING_ALARM: () => ({}),
    STOP_ALARM: () => ({}),
  },
});

export default {...actions.timer};

import {createActions} from 'redux-actions';

const actions = createActions({
  TIMER: {
    START:      [() => ({}), () => ({recording: true})],
    STOP:       [() => ({}), () => ({recording: true})],
    PAUSE:      [() => ({}), () => ({recording: true})],
    GO_TO_NEXT: [() => ({}), () => ({recording: true})],

    RING_ALARM: () => ({}),
    STOP_ALARM: () => ({}),
  },
});

export default {...actions.timer};

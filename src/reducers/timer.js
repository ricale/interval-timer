import moment from 'moment';

import {PLAY_STATE} from 'constants';

const initialState = {
  playState: PLAY_STATE.IDLE,
  alarming: false,
  current: 0,

  startTime: null,
  pauseTime: null,
};

const isPlaying = ({playState}) => playState === PLAY_STATE.PLAYING;
const isIdle = ({playState}) => playState === PLAY_STATE.IDLE;

function start (state, action) {
  if(isPlaying(state)) {
    return state;
  }

  return {
    ...state,
    playState: PLAY_STATE.PLAYING,
    startTime: (
      state.pauseTime ?
        state.startTime.add(moment().diff(state.pauseTime)) :
        moment()
    ),
    pauseTime: null,
  };
}

function stop (state, action) {
  return isIdle(state) ? state : {
    ...state,
    playState: PLAY_STATE.IDLE,
    alarming: false,
    current: 0,
    startTime: null,
    pauseTime: null,
  };
}

function pause (state, action) {
  return !isPlaying(state) ? state : {
    ...state,
    playState: PLAY_STATE.PAUSE,
    alarming: false,
    pauseTime: moment(),
  };
}

function ringAlarm (state, action) {
  return {...state, alarming: true};
}

function stopAlarm (state, action) {
  return {...state, alarming: false};
}

function goToNext (state, action) {
  return {
    ...state,
    current: state.current + 1,
    alarming: false,
    startTime: moment(),
    pauseTime: null,
  };
}

const updaters = {
  'TIMER/START': start,
  'TIMER/STOP': stop,
  'TIMER/PAUSE': pause,
  'TIMER/RING_ALARM': ringAlarm,
  'TIMER/STOP_ALARM': stopAlarm,
  'TIMER/GO_TO_NEXT': goToNext,
};

export default function timer (state = initialState, action) {
  if(Object.keys(updaters).indexOf(action.type) !== -1) {
    return updaters[action.type](state, action);
  }

  return state;
}

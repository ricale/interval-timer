import {PLAY_STATE, ALARM_STATE} from 'constants';

const initialState = {
  playState: PLAY_STATE.IDLE,
  alarmState: ALARM_STATE.OFF,
  current: 0,
};

const isPlaying = ({playState}) => playState === PLAY_STATE.PLAYING;

export default function timer (state = initialState, action) {
  switch(action.type) {
    case 'TIMER/START':
      return isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.PLAYING,
      };

    case 'TIMER/STOP':
      return !isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.IDLE,
        alarmState: ALARM_STATE.OFF,
        current: 0,
      };

    case 'TIMER/PAUSE':
      return !isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.PAUSE,
      };

    case 'TIMER/RESUME':
      return isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.PLAYING,
      };

    case 'TIMER/RING_ALARM':
      return {...state, alarmState: ALARM_STATE.RING};
    case 'TIMER/STOP_ALARM':
      return {...state, alarmState: ALARM_STATE.OFF};

    case 'TIMER/GO_TO_NEXT':
      return {
        ...state,
        current: state.current + 1,
      };
  }
  return state;
}

import {PLAY_STATE, ALARM_STATE} from 'constants';

const initialState = {
  playState: PLAY_STATE.IDLE,
  alarmState: ALARM_STATE.ON,
  current: 0,
};

const isPlaying = ({playState}) => playState === PLAY_STATE.PLAYING;

export default function player (state = initialState, action) {
  switch(action.type) {
    case 'PLAYER/START':
      return isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.PLAYING,
      };

    case 'PLAYER/STOP':
      return !isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.IDLE,
        current: 0,
      };

    case 'PLAYER/PAUSE':
      return !isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.PAUSE,
      };

    case 'PLAYER/RESUME':
      return isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.PLAYING,
      };

    case 'PLAYER/TURN_ON_ALARM':
      return {...state, alarmState: ALARM_STATE.OFF};
    case 'PLAYER/TURN_OFF_ALARM':
      return {...state, alarmState: ALARM_STATE.ON};
    case 'PLAYER/RING_ALARM':
      return {...state, alarmState: ALARM_STATE.RING};
    case 'PLAYER/STOP_ALARM':
      return {...state, alarmState: ALARM_STATE.ON};

    case 'PLAYER/GO_TO_NEXT':
      return {
        ...state,
        current: state.current + 1,
      };
  }
  return state;
}

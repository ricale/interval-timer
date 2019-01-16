import {PLAY_STATE} from 'constants';

const initialState = {
  playState: PLAY_STATE.IDLE,
  alarming: false,
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
        alarming: false,
        current: 0,
      };

    case 'TIMER/PAUSE':
      return !isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.PAUSE,
        alarming: false,
      };

    case 'TIMER/RESUME':
      return isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.PLAYING,
      };

    case 'TIMER/RING_ALARM':
      return {...state, alarming: true};
    case 'TIMER/STOP_ALARM':
      return {...state, alarming: false};

    case 'TIMER/GO_TO_NEXT':
      return {
        ...state,
        current: state.current + 1,
        alarming: false,
      };
  }
  return state;
}

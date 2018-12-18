import {PLAY_STATE} from 'constants';

const initialState = {
  playState: PLAY_STATE.IDLE,
  current: 0,
};

const playStateByActionType = {
  'PLAYER/START': PLAY_STATE.PLAYING,
  'PLAYER/STOP': PLAY_STATE.IDLE,
  'PLAYER/PAUSE': PLAY_STATE.PAUSE,
  'PLAYER/RESUME': PLAY_STATE.PLAYING,
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

    case 'PLAYER/GO_TO_NEXT':
      return {
        ...state,
        current: state.current + 1,
      };
  }
  return state;
}

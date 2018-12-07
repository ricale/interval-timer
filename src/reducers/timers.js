import {PLAY_STATE} from 'constants';

const initialState = {
  list: [],
  lastId: 0,

  playState: PLAY_STATE.IDLE,
  current: 0,
};

const isAvailable = ({list}) => list.length > 0;
const isPlaying = ({playState}) => playState === PLAY_STATE.PLAYING;

export default function timers (state = initialState, action) {
  switch(action.type) {
    case 'TIMERS/CREATE_TIMER':
      return {
        ...state,
        list: [...state.list, {...action.payload, id: state.lastId}],
        lastId: state.lastId + 1,
      };

    case 'TIMERS/DELETE_ALL_TIMER':
      return {...state, list: [], lastId: 0};

    case 'TIMERS/DELETE_TIMER':
      return {
        ...state,
        list: state.list.filter(({id}) => id !== action.payload.id),
      };

    case 'TIMERS/START_TIMER':
      return !isAvailable(state) || isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.PLAYING,
      };
    case 'TIMERS/STOP_TIMER':
      return !isAvailable(state) || !isPlaying(state) ? state : {
        ...state,
        current: 0,
        playState: PLAY_STATE.IDLE,
      };
    case 'TIMERS/PAUSE_TIMER':
      return !isAvailable(state) || !isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.PAUSE,
      };
    case 'TIMERS/RESUME_TIMER':
      return !isAvailable(state) || isPlaying(state) ? state : {
        ...state,
        playState: PLAY_STATE.RESUME,
      };
    case 'TIMERS/GO_TO_NEXT_TIMER':
      return !isAvailable(state) ? state : {
        ...state,
        current: state.current + 1,
      };
  }
  return state;
}

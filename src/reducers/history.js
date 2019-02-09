import moment from 'moment';

const initialState = {
  list: [],
};

const getAddedHistory = (state, action) => {
  const {prevState, action: prevAction, result} = action.payload;

  if(prevAction.type.match(/^TIMER\//)) {
    if(prevState.timer.current !== result.timer.current ||
      prevState.timer.playState !== result.timer.playState) {

      return {
        ...state,
        list: [
          ...state.list,
          {
            type: prevAction.type,
            timestamp: moment().diff(0),
            timer: result.timer,
            interval: result.intervals.list[result.timer.current % result.intervals.list.length],
          },
        ],
      };
    }
  }

  return state;
};

const handlers = {
  'HISTORY/ADD': getAddedHistory,
};

const isUpdated = (type) => Object.keys(handlers).indexOf(type) !== -1;

export default function history (state = initialState, action) {
  if(!isUpdated(action.type)) {
    return state;
  }

  const newState = handlers[action.type](state, action);
  localStorage.setItem('history', JSON.stringify(newState));
  return newState;
}
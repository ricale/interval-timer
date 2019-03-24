import moment from 'moment';

const initialState = {
  list: [],
};

const MAX_COUNT = 100;

const getAddedHistory = (state, action) => {
  const {prevState, action: prevAction, result} = action.payload;

  if(prevAction.type.match(/^TIMER\//)) {
    if(prevState.timer.current !== result.timer.current ||
      prevState.timer.playState !== result.timer.playState) {

      return {
        ...state,
        list: [
          ...state.list.slice(state.list.length - MAX_COUNT + 1),
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

const getHistoryAfterInit = (state, action) => {
  if(state.list.length === 0) {
    return state;
  }
  if(state.list[state.list.length - 1].type === 'TIMER/QUIT') {
    return state;
  }

  return {
    ...state,
    list: [
      ...state.list,
      {
        type: 'TIMER/QUIT',
      },
    ],
  };
};

const handlers = {
  'HISTORY/ADD': getAddedHistory,
  '@@INIT': getHistoryAfterInit,
};

const isUpdated = (type) => Object.keys(handlers).indexOf(type) !== -1;

export default function timerHistory (state = initialState, action) {
  if(!isUpdated(action.type)) {
    return state;
  }

  const newState = handlers[action.type](state, action);
  localStorage.setItem('timerHistory', JSON.stringify(newState));
  return newState;
}

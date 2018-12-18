import {PLAY_STATE} from 'constants';

const initialState = {
  list: [],
  lastId: 0,
};

const createTimer = (obj) => {
  if(!obj.name) {
    obj.name = `timer #${obj.id}`;
    obj.hasDefaultName = true;
  }
  return obj;
};

const isChanged = (type) => (
  [
    'TIMERS/CREATE_TIMER',
    'TIMERS/DELETE_ALL_TIMER',
    'TIMERS/DELETE_TIMER',
  ].indexOf(type) !== -1
);

const getNewState = (state, action) => {
  switch(action.type) {
    case 'TIMERS/CREATE_TIMER':
      return {
        ...state,
        list: [...state.list, createTimer({...action.payload, id: state.lastId})],
        lastId: state.lastId + 1,
      };

    case 'TIMERS/DELETE_ALL_TIMER':
      return {...state, list: [], lastId: 0};

    case 'TIMERS/DELETE_TIMER':
      return {
        ...state,
        list: state.list.filter(({id}) => id !== action.payload.id),
      };
  }
  return state;
}

export default function timers (state = initialState, action) {
  if(!isChanged(action.type)) {
    return state;
  }

  const newState = getNewState(state, action);
  localStorage.setItem('timers', JSON.stringify(newState));
  return newState;
}

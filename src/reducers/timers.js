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

export default function timers (state = initialState, action) {
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

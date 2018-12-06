const initialState = {
  list: [],
  lastId: 0,
};

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
  }
  return state;
}

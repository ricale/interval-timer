const initialState = {
  list: []
};

export default function timers(state = initialState, action) {
  switch(action.type) {
    case 'TIMERS/CREATE_TIMER':
      return {...state, list: [...state.list, {...action.payload}]};
  }
  return state;
}

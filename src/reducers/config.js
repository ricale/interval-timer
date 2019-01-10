const initialState = {
  filled: false,
};

export default function timer (state = initialState, action) {
  switch(action.type) {
    case 'CONFIG/TOGGLE_FILLED':
      return {...state, filled: !state.filled};
    case 'CONFIG/TURN_ON_FILLED':
      return {...state, filled: true};
    case 'CONFIG/TURN_OFF_FILLED':
      return {...state, filled: false};
  }
  return state;
}

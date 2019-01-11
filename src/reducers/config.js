const initialState = {
  filled: false,
  ringable: true,
};

const isChanged = (type) => (
  [
    'CONFIG/TOGGLE_FILLED',
    'CONFIG/TURN_ON_FILLED',
    'CONFIG/TURN_OFF_FILLED',
  ].indexOf(type) !== -1
);

const getNewState = (state, action) => {
  switch(action.type) {
    case 'CONFIG/TOGGLE_FILLED':
      return {...state, filled: !state.filled};
    case 'CONFIG/TURN_ON_FILLED':
      return {...state, filled: true};
    case 'CONFIG/TURN_OFF_FILLED':
      return {...state, filled: false};
  }
  return state;
};

export default function config (state = initialState, action) {
  if(!isChanged(action.type)) {
    return state;
  }

  const newState = getNewState(state, action);
  localStorage.setItem('config', JSON.stringify(newState));
  return newState;
}

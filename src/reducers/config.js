const initialState = {
  filled: false,
  ringable: true,
  animatable: true,
};

const isChanged = (type) => (
  [
    'CONFIG/TOGGLE_FILLED',
    'CONFIG/TOGGLE_RINGABLE',
    'CONFIG/TOGGLE_ANIMATABLE',
  ].indexOf(type) !== -1
);

const getNewState = (state, action) => {
  switch(action.type) {
    case 'CONFIG/TOGGLE_FILLED':
      return {...state, filled: !state.filled};
    case 'CONFIG/TOGGLE_RINGABLE':
      return {...state, ringable: !state.ringable};
    case 'CONFIG/TOGGLE_ANIMATABLE':
      return {...state, animatable: !state.animatable};
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

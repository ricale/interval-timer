const initialState = {
  ringable: true,
  animatable: true,
  enableNotification: true,
};

const toggleRingable = (state, action) => {
  return {...state, ringable: !state.ringable};
};

const toggleAnimatable = (state, action) => {
  return {...state, animatable: !state.animatable};
};

const toggleNotification = (state, action) => {
  return {...state, enableNotification: !state.enableNotification};
};

const handlers = {
  'CONFIG/TOGGLE_RINGABLE': toggleRingable,
  'CONFIG/TOGGLE_ANIMATABLE': toggleAnimatable,
  'CONFIG/TOGGLE_NOTIFICATION': toggleNotification,
};

export default function config (state = initialState, action) {
  if(Object.keys(handlers).indexOf(action.type) === -1) {
    return state;
  }

  const newState = handlers[action.type](state, action);
  localStorage.setItem('config', JSON.stringify(newState));
  return newState;
}

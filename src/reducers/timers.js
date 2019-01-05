const initialState = {
  list: [],
  lastId: 1,
  editing: null,
};

const getTimer = (obj) => {
  if(!obj.name) {
    obj.name = `timer #${obj.id}`;
    obj.hasDefaultName = true;
  }
  return obj;
};

const isChanged = (type) => (
  [
    'TIMERS/CREATE_TIMER',
    'TIMERS/EDIT_TIMER',
    'TIMERS/CANCEL_EDIT_TIMER',
    'TIMERS/UPDATE_TIMER',
    'TIMERS/DELETE_ALL_TIMER',
    'TIMERS/DELETE_TIMER',
  ].indexOf(type) !== -1
);

const getNewState = (state, action) => {
  switch(action.type) {
    case 'TIMERS/CREATE_TIMER':
      return {
        ...state,
        list: [...state.list, getTimer({...action.payload, id: state.lastId})],
        lastId: state.lastId + 1,
      };

    case 'TIMERS/EDIT_TIMER':
      return {
        ...state,
        editing: state.list.filter(({id}) => id === action.payload.id)[0],
      };

    case 'TIMERS/CANCEL_EDIT_TIMER':
      return {...state, editing: null};

    case 'TIMERS/UPDATE_TIMER':
      return {
        ...state,
        list: [...state.list].map(t => t.id !== action.payload.id ? t : getTimer({...action.payload})),
        editing: null,
      };

    case 'TIMERS/DELETE_ALL_TIMER':
      return {
        ...state,
        list: [],
        editing: null,
        lastId: initialState.lastId,
      };

    case 'TIMERS/DELETE_TIMER':
      return {
        ...state,
        list: state.list.filter(({id}) => id !== action.payload.id),
        editing: null,
      };
  }
  return state;
};

export default function timers (state = initialState, action) {
  if(!isChanged(action.type)) {
    return state;
  }

  const newState = getNewState(state, action);
  localStorage.setItem('timers', JSON.stringify(newState));
  return newState;
}

const initialState = {
  list: [],
  lastId: 1,
  editing: null,
};

const getInterval = (obj) => {
  if(!obj.name) {
    obj.name = `interval #${obj.id}`;
    obj.hasDefaultName = true;
  }
  return obj;
};

const isChanged = (type) => (
  [
    'INTERVALS/CREATE_INTERVAL',
    'INTERVALS/EDIT_INTERVAL',
    'INTERVALS/CANCEL_EDIT_INTERVAL',
    'INTERVALS/UPDATE_INTERVAL',
    'INTERVALS/DELETE_ALL_INTERVAL',
    'INTERVALS/DELETE_INTERVAL',
  ].indexOf(type) !== -1
);

const getNewState = (state, action) => {
  switch(action.type) {
    case 'INTERVALS/CREATE_INTERVAL':
      return {
        ...state,
        list: [...state.list, getInterval({...action.payload, id: state.lastId})],
        lastId: state.lastId + 1,
      };

    case 'INTERVALS/EDIT_INTERVAL':
      return {
        ...state,
        editing: state.list.filter(({id}) => id === action.payload.id)[0],
      };

    case 'INTERVALS/CANCEL_EDIT_INTERVAL':
      return {...state, editing: null};

    case 'INTERVALS/UPDATE_INTERVAL':
      return {
        ...state,
        list: [...state.list].map(t => t.id !== action.payload.id ? t : getInterval({...action.payload})),
        editing: null,
      };

    case 'INTERVALS/DELETE_ALL_INTERVAL':
      return {
        ...state,
        list: [],
        editing: null,
        lastId: initialState.lastId,
      };

    case 'INTERVALS/DELETE_INTERVAL':
      return {
        ...state,
        list: state.list.filter(({id}) => id !== action.payload.id),
        editing: null,
      };
  }
  return state;
};

export default function intervals (state = initialState, action) {
  if(!isChanged(action.type)) {
    return state;
  }

  const newState = getNewState(state, action);
  localStorage.setItem('intervals', JSON.stringify(newState));
  return newState;
}

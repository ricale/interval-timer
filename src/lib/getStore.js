import {createStore} from 'redux';

export default function getStore (reducers) {
  const preloadedState = {};
  const preloadedTimersState = localStorage.getItem('timers');
  if(!!preloadedTimersState) {
    preloadedState.timers = JSON.parse(preloadedTimersState);
  }

  return createStore(
    reducers,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

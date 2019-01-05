import {createStore} from 'redux';

export default function getStore (reducers) {
  const preloadedState = {};
  const preloadedIntervalsState = localStorage.getItem('intervals');
  if(preloadedIntervalsState) {
    preloadedState.intervals = JSON.parse(preloadedIntervalsState);
  }

  return createStore(
    reducers,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

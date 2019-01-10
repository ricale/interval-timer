import {createStore} from 'redux';

export default function getStore (reducers) {
  const preloadedState = {};

  const keys = ['intervals', 'config'];
  keys.forEach(key => {
    const data = localStorage.getItem(key);
    if(data) {
      preloadedState[key] = JSON.parse(data);
    }
  });

  return createStore(
    reducers,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

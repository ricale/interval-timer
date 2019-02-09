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

  const devtoolExtension = (
    process.env.NODE_ENV !== 'production' ?
      (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) :
      undefined
  );

  return createStore(
    reducers,
    preloadedState,
    devtoolExtension
  );
}

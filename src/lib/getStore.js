import {createStore, applyMiddleware, compose} from 'redux';
import getActionHistoryMiddleware from './getActionHistoryMiddleware';

export default function getStore (reducers) {
  const preloadedState = {};

  const keys = ['intervals', 'config', 'history'];
  keys.forEach(key => {
    const data = localStorage.getItem(key);
    if(data) {
      preloadedState[key] = JSON.parse(data);
    }
  });

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' ?
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) :
      compose;

  return createStore(
    reducers,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        getActionHistoryMiddleware()
      )
    )
  );
}

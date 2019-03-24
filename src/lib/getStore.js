import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router';

import getActionHistoryMiddleware from './getActionHistoryMiddleware';

export default function getStore (reducers, history) {
  const preloadedState = {};

  const keys = ['intervals', 'config', 'timerHistory'];
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
    reducers(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        getActionHistoryMiddleware(),
      )
    )
  );
}

import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducers from 'reducers';

import MainView from './views/main';

const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class Entry extends Component {
  render () {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

export default Entry;

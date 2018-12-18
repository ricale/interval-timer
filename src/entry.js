import React, {Component} from 'react';
import {Provider} from 'react-redux';

import reducers from 'reducers';
import {getStore} from 'lib';

import MainView from './views/main';

class Entry extends Component {
  render () {
    return (
      <Provider store={getStore(reducers)}>
        <MainView />
      </Provider>
    );
  }
}

export default Entry;

import React, {Component} from 'react';
import {Provider} from 'react-redux';

import reducers from 'reducers';
import {getStore, Alarm} from 'lib';
import GlobalStyle from './globalStyle';

import MainView from './views/main';

const store = getStore(reducers);
Alarm.init(store);

class Entry extends Component {
  render () {
    return (
      <Provider store={store}>
        <>
          <GlobalStyle />
          <MainView />
        </>
      </Provider>
    );
  }
}

export default Entry;

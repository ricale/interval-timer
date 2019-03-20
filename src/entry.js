import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import reducers from 'reducers';
import {getStore, Alarm} from 'lib';
import {normal} from 'themes';

import GlobalStyle from './globalStyle';
import Router from './views/router';

const store = getStore(reducers);
Alarm.init(store);

class Entry extends Component {
  render () {
    return (
      <Provider store={store}>
        <ThemeProvider theme={normal}>
          <>
            <GlobalStyle />
            <Router />
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default Entry;

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {createHashHistory} from 'history';
import {ThemeProvider} from 'styled-components';

import reducers from 'reducers';
import {getStore, Alarm} from 'lib';
import {normal} from 'themes';

import GlobalStyle from './globalStyle';
import Router from './views/router';

const history = createHashHistory();
const store = getStore(reducers, history);
Alarm.init(store);

class Entry extends Component {
  render () {
    return (
      <Provider store={store}>
        <ThemeProvider theme={normal}>
          <ConnectedRouter history={history}>
            <>
              <GlobalStyle />
              <Router />
            </>
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default Entry;

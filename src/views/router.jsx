import React, {Component} from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import {
  Button,
  Icon,
  Tooltip,
} from 'components';

import Timer from './timer';
import Config from './config';
import Intervals from './intervals';
import History from './history';

import Sider from './_sider';

const Menu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
`;

const PAGES = [
  {path: '/',          title: 'Timer',     component: Timer},
  {path: '/config',    title: 'Config',    component: Config},
  {path: '/intervals', title: 'Intervals', component: Intervals},
  {path: '/history',   title: 'History',   component: History},
];

class RouterView extends Component {
  render () {
    return (
      <Router>
        <Switch>
          {PAGES.map(p =>
            <Route key={p.path} exact {...p} />
          )}
          <Redirect to='/' />
        </Switch>
        <Menu>
          <Button 
              onClick={() => this._sider.toggle()}
              as={Tooltip}
              tooltip={{text: 'Menu', position: 'bottom-right'}} >
            <Icon name='wrench' />
          </Button>
        </Menu>
        <Sider
            ref={r => this._sider = r}
            menu={PAGES}
            />
      </Router>
    );
  }
}

export default RouterView;

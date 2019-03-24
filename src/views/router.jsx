import React, {Component} from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled, {css} from 'styled-components';

import {
  Button,
  Icon,
} from 'components';

import Timer from './timer';
import Config from './config';
import Intervals from './intervals';
import History from './history';

import Sider from './_sider';

const Menu = styled.div`
  ${p => p.float && css`
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
  `}

  ${p => !p.float && css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding-left: 15px;
    padding-right: 5px;
    margin-bottom: 15px;
    background-color: #666;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.3);
  `};
`;

const MenuTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  flex: 1;
  color: #FFF;
`;

const StyledButton = styled(Button)`
  ${p => p.white && css`
    color: #FFF;
  `}
`;

const PAGES = [
  {path: '/',          title: 'Timer',     component: Timer},
  {path: '/config',    title: 'Config',    component: Config},
  {path: '/intervals', title: 'Intervals', component: Intervals},
  {path: '/history',   title: 'History',   component: History},
];

class RouterView extends Component {
  render () {
    const {pathname} = this.props;
    return (
      <>
        <Menu float={pathname === '/'}>
          {pathname !== '/' &&
            <MenuTitle>{PAGES.filter(p => p.path === pathname)[0].title}</MenuTitle>
          }
          <StyledButton white={pathname !== '/'} onClick={() => this._sider.toggle()}>
            <Icon name='bars' />
          </StyledButton>
        </Menu>
        <Switch>
          {PAGES.map(p =>
            <Route key={p.path} exact {...p} />
          )}
          <Redirect to='/' />
        </Switch>
        <Sider
            ref={r => this._sider = r}
            menu={PAGES}
            activeMenu={pathname}
            />
      </>
    );
  }
}

const RouterContainer = () => (
  <Router>
    <Route
        path='/'
        render={({history}) => <RouterView pathname={history.location.pathname} />}
        />
  </Router>
);

export default RouterContainer;

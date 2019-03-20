import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import Timer from './timer';
import Config from './config';
import Intervals from './intervals';
import History from './history';

const RouterView = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Timer} />
      <Route exact path='/config' component={Config} />
      <Route exact path='/intervals' component={Intervals} />
      <Route exact path='/history' component={History} />
      <Redirect to='/' />
    </Switch>
  </Router>
);

export default RouterView;

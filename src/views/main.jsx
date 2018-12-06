import React, {Component} from 'react';
import {connect} from 'react-redux';

import actions from '../actions/timers';

import TimerForm from './timers/form';
import TimerList from './timers/list';

class Main extends Component {
  render() {
    const {list} = this.props;
    return (
      <div>
        <TimerForm onSubmit={(name, h, m, s) => this.props.createTimer(name, h, m, s)} />
        <TimerList data={list} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.timers.list
});

const mapDispatchToProps = (dispatch) => ({
  createTimer: (...args) => dispatch(actions.timers.createTimer(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

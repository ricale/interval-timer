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
        <TimerForm
            onSubmit={(d) => this.props.createTimer(d)}
            isValid={({hours, minutes, seconds}) => hours || minutes || seconds}
            />
        <TimerList
            data={list}
            onDelete={({id}) => this.props.deleteTimer(id)}
            />

        <button onClick={() => this.props.deleteAllTimer()}>모두 삭제</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.timers.list
});

const mapDispatchToProps = (dispatch) => ({
  createTimer: (...args) => dispatch(actions.timers.createTimer(...args)),
  deleteTimer: (...args) => dispatch(actions.timers.deleteTimer(...args)),
  deleteAllTimer: (...args) => dispatch(actions.timers.deleteAllTimer(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

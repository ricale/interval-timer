import React, {Component} from 'react';
import {connect} from 'react-redux';

import actions from 'actions/timers';

import Timer from './timers/timer';
import TimerForm from './timers/form';
import TimerList from './timers/list';

import './main.less';

class Main extends Component {
  handleSubmit = (d) => {
    const timestamp = (d.hours * 60 * 60 * 1000) + (d.minutes * 60 * 1000) + (d.seconds * 1000);
    this.props.createTimer({...d, timestamp});
  }

  render() {
    const {list, current, playState} = this.props;
    return (
      <div className='it-main'>
        <div>
          <Timer
              onStart={this.props.startTimer}
              onStop={this.props.stopTimer}
              onPause={this.props.pauseTimer}
              onResume={this.props.resumeTimer}
              onDone={this.props.goToNextTimer}
              data={list[current % list.length]}
              playState={playState}
              />
        </div>
        <div>
          <TimerForm
              onSubmit={this.handleSubmit}
              isValid={({hours, minutes, seconds}) => hours || minutes || seconds}
              />
          <TimerList
              data={list}
              onDelete={({id}) => this.props.deleteTimer(id)}
              />

          <button onClick={() => this.props.deleteAllTimer()}>
            모두 삭제
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.timers.list,
  current: state.timers.current,
  playState: state.timers.playState,
});

const mapDispatchToProps = (dispatch) => ({
  createTimer: (...args) => dispatch(actions.timers.createTimer(...args)),
  deleteTimer: (...args) => dispatch(actions.timers.deleteTimer(...args)),
  deleteAllTimer: (...args) => dispatch(actions.timers.deleteAllTimer(...args)),

  startTimer: (...args) => dispatch(actions.timers.startTimer(...args)),
  stopTimer: (...args) => dispatch(actions.timers.stopTimer(...args)),
  pauseTimer: (...args) => dispatch(actions.timers.pauseTimer(...args)),
  resumeTimer: (...args) => dispatch(actions.timers.resumeTimer(...args)),
  goToNextTimer: (...args) => dispatch(actions.timers.goToNextTimer(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

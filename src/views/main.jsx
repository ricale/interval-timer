import React, {Component} from 'react';
import {connect} from 'react-redux';

import timerActions from 'actions/timers';
import playerActions from 'actions/player';

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
  current: state.player.current,
  playState: state.player.playState,
});

const mapDispatchToProps = (dispatch) => ({
  createTimer: (...args) => dispatch(timerActions.createTimer(...args)),
  deleteTimer: (...args) => dispatch(timerActions.deleteTimer(...args)),
  deleteAllTimer: (...args) => dispatch(timerActions.deleteAllTimer(...args)),

  startTimer: (...args) => dispatch(playerActions.start(...args)),
  stopTimer: (...args) => dispatch(playerActions.stop(...args)),
  pauseTimer: (...args) => dispatch(playerActions.pause(...args)),
  resumeTimer: (...args) => dispatch(playerActions.resume(...args)),
  goToNextTimer: (...args) => dispatch(playerActions.goToNext(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

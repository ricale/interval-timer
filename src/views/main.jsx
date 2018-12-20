import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FullScreenContainer} from 'components';
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

  render () {
    const {list, player: {current, ...player}} = this.props;
    return (
      <div className='it-main'>
        <FullScreenContainer>
          <Timer
              onStart={this.props.start}
              onStop={this.props.stop}
              onPause={this.props.pause}
              onResume={this.props.resume}
              onDone={this.props.goToNext}
              turnOffAlarm={this.props.turnOffAlarm}
              turnOnAlarm={this.props.turnOnAlarm}
              ringAlarm={this.props.ringAlarm}
              stopAlarm={this.props.stopAlarm}

              data={list[current % list.length]}
              index={current}
              {...player}
              />
        </FullScreenContainer>
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
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  createTimer: (...args) => dispatch(timerActions.createTimer(...args)),
  deleteTimer: (...args) => dispatch(timerActions.deleteTimer(...args)),
  deleteAllTimer: (...args) => dispatch(timerActions.deleteAllTimer(...args)),

  start: (...args) => dispatch(playerActions.start(...args)),
  stop: (...args) => dispatch(playerActions.stop(...args)),
  pause: (...args) => dispatch(playerActions.pause(...args)),
  resume: (...args) => dispatch(playerActions.resume(...args)),
  goToNext: (...args) => dispatch(playerActions.goToNext(...args)),
  turnOffAlarm: (...args) => dispatch(playerActions.turnOffAlarm(...args)),
  turnOnAlarm: (...args) => dispatch(playerActions.turnOnAlarm(...args)),
  ringAlarm: (...args) => dispatch(playerActions.ringAlarm(...args)),
  stopAlarm: (...args) => dispatch(playerActions.stopAlarm(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

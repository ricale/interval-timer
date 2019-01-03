import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  Accordion,
  Button,
  FullScreenContainer,
  Icon,
} from 'components';
import timerActions from 'actions/timers';
import playerActions from 'actions/player';

import Timer from './timers/timer';
import TimerForm from './timers/form';
import TimerList from './timers/list';

import Sider from './_sider';

import './main.less';

class Main extends Component {
  componentDidMount () {
    if(this.props.list.length === 0) {
      this._accordion.open();
    }
  }

  shouldComponentUpdate (nextProps) {
    if(this.props.list.length > 0 && nextProps.list.length === 0) {
      this._accordion.open();
    }
    return true;
  }

  handleValid = (d) => {
    return d.hours || d.minutes || d.seconds;
  }

  handleSubmit = (d) => {
    const timestamp = (d.hours * 60 * 60 * 1000) + (d.minutes * 60 * 1000) + (d.seconds * 1000);
    this.props.createTimer({...d, timestamp});
  }

  handleUpdate = (d) => {
    const timestamp = (d.hours * 60 * 60 * 1000) + (d.minutes * 60 * 1000) + (d.seconds * 1000);
    this.props.updateTimer({...d, timestamp});
  }

  handleCancelEdit = () => {
    this.props.cancelEditTimer();
  }

  handleDelete = (id) => {
    this.props.deleteTimer(id);
  }

  handleDeleteAll = () => {
    this.props.deleteAllTimer();
  }

  render () {
    const {
      list,
      lastId,
      editing,
      player: {current, ...player},

      start,
      stop,
      pause,
      resume,
      goToNext,
      turnOffAlarm,
      turnOnAlarm,
      ringAlarm,
      stopAlarm,
    } = this.props;

    return (
      <div className='it-main'>
        <div className='it-main__content'>
          <FullScreenContainer ref={r => this._fullscreenContainer = r}>
            <Timer
                onStart={start}
                onStop={stop}
                onPause={pause}
                onResume={resume}
                onDone={goToNext}
                turnOffAlarm={turnOffAlarm}
                turnOnAlarm={turnOnAlarm}
                ringAlarm={ringAlarm}
                stopAlarm={stopAlarm}

                data={list[current % list.length]}
                index={current}
                {...player}
                />
          </FullScreenContainer>

          <div className='it-main__controller'>
            <Button className='it-fullscreen__button' onClick={() => this._fullscreenContainer.toggle()}>
              <Icon name='expand' />
            </Button>
            <Button onClick={() => this._sider.toggle()}>
              <Icon name='bars' />
            </Button>
          </div>
        </div>

        <Sider
            title='목록'
            ref={r => this._sider = r}>
          <Accordion 
              className='it-main__form-accordion'
              title='타이머 추가'
              ref={r => this._accordion = r}>
            <TimerForm
                defaultName={`timer #${lastId}`} // FIXME: duplicated with createTimer on reducers/timers
                isValid={this.handleValid}
                onSubmit={this.handleSubmit}
                />
          </Accordion>

          <TimerList
              data={list}
              editing={editing}
              onEdit={(id) => this.props.editTimer(id)}
              onCancelEdit={this.handleCancelEdit}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
              onDeleteAll={this.handleDeleteAll}
              />
        </Sider>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.timers.list,
  lastId: state.timers.lastId,
  editing: state.timers.editing,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  createTimer: (...args) => dispatch(timerActions.createTimer(...args)),
  editTimer: (...args) => dispatch(timerActions.editTimer(...args)),
  cancelEditTimer: (...args) => dispatch(timerActions.cancelEditTimer(...args)),
  updateTimer: (...args) => dispatch(timerActions.updateTimer(...args)),
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

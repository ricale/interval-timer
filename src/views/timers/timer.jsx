import React from 'react';
import moment from 'moment';
import NoSleep from 'nosleep.js';

import {compose, withState, withProps, lifecycle} from 'lib/recompose';
import Sounds from 'lib/Sounds';
import {Button, FullScreenContainer, Icon} from 'components';
import {PLAY_STATE, ALARM_STATE} from 'constants';

import TimerDisplay from './_timerDisplay';

import './timer.less';

const noSleep = new NoSleep();

const TimerView = ({
  data,
  currentTimestamp,
  isRunning,
  isPlaying,
  isRinging,
  startTime,
  onStart,
  onStop,
  onPause,
  onResume,
  onDone,
  stopAlarm,
}) => (
  <FullScreenContainer className='it-timer'>
    <TimerDisplay
        name={data.name}
        isPlaying={isPlaying}
        timestamp={isRunning ? currentTimestamp : data.timestamp}
        />
    <div className='it-timer-controller'>
      <div className='it-timer-controller__row'>
        <Button onClick={() => onStart()} disabled={isPlaying}>
          <Icon name='play' />
        </Button>
        <Button onClick={() => onPause()} disabled={!isPlaying}>
          <Icon name='pause' />
        </Button>
        <Button onClick={() => onStop()} disabled={!isRunning}>
          <Icon name='stop' />
        </Button>
        <Button onClick={() => onDone()}>
          <Icon name='forward' />
        </Button>
      </div>
      <div className='it-timer-controller__row'>
        <Button onClick={() => stopAlarm()} disabled={!isRinging}>
          <Icon name='bell-slash' />
        </Button>
      </div>
    </div>
  </FullScreenContainer>
);

const Timer = compose(
  withState('startTime', 'onChangeStartTime', null),
  withState('pauseTime', 'onChangePauseTime', null),
  withState('currentTimestamp', 'onChangeCurrnetTimestamp', (props) => (props.data || {}).timestamp),
  withProps(({data, playState, alarmState, ...args}) => ({
    data: data || {},
    isRunning: playState !== PLAY_STATE.IDLE,
    isPlaying: playState !== PLAY_STATE.IDLE && playState !== PLAY_STATE.PAUSE,
    isRinging: alarmState === ALARM_STATE.RING,
  })),
  lifecycle({
    shouldComponentUpdate (nextProps, nextState) {
      const {
        onChangeStartTime,
        onChangePauseTime,
        onChangeCurrnetTimestamp,
        ringAlarm,
        stopAlarm,

        playState,
        alarmState,
        startTime,
        pauseTime,
        currentTimestamp,
        index,
        data,
      } = this.props;

      if(nextProps.playState !== playState) {
        switch(nextProps.playState) {
          case PLAY_STATE.PLAYING:
            if(pauseTime) {
              onChangeStartTime(startTime.add(moment().diff(pauseTime)));
              onChangePauseTime(null);

            } else {
              onChangeStartTime(moment());
            }

            this._timer =
              setInterval(() => {
                onChangeCurrnetTimestamp(
                  this.props.data.timestamp - moment().diff(this.props.startTime)
                );
              }, 100);

            noSleep.enable();
            break;

          case PLAY_STATE.PAUSE:
            stopAlarm();
            onChangePauseTime(moment());
            clearInterval(this._timer);

            noSleep.disable();
            break;

          case PLAY_STATE.IDLE:
            stopAlarm();
            onChangeStartTime(null);
            onChangePauseTime(null);
            onChangeCurrnetTimestamp(data.timestamp);
            clearInterval(this._timer);

            noSleep.disable();
            break;
        }
      }

      if(nextProps.alarmState !== alarmState) {
        switch(nextProps.alarmState) {
          case ALARM_STATE.OFF:
          case ALARM_STATE.ON:
            Sounds.stop();
            break;
          case ALARM_STATE.RING:
            Sounds.play();
            break;
        }
      }

      if(nextProps.currentTimestamp !== currentTimestamp) {
        if(nextProps.currentTimestamp < 0 && currentTimestamp >= 0) {
          ringAlarm();
        }
      }

      if(nextProps.index !== index) {
        stopAlarm();
        onChangeStartTime(moment());
        onChangePauseTime();
        onChangeCurrnetTimestamp(nextProps.data.timestamp);
      }

      return true;
    },
    componentWillUnmount () {
      if(this._timer) {
        clearInterval(this._timer);
      }
    },
  })
)(TimerView);

export default Timer;

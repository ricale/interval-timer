import React from 'react';
import moment from 'moment';
import NoSleep from 'nosleep.js';

import {compose, withState, withProps, lifecycle} from 'lib/recompose';
import Sounds from 'lib/Sounds';
import {
  Button,
  FullScreenContainer,
  Icon,
} from 'components';
import {PLAY_STATE, ALARM_STATE} from 'constants';

import TimerDisplay from './_display';

import './index.less';
import './shake.less';

const noSleep = new NoSleep();

const TimerView = ({
  data,
  currentTimestamp,
  isRunning,
  isPlaying,
  isRinging,
  isNegative,
  disabled,
  config,
  fullScreenContainerRef,
  onStart,
  onStop,
  onPause,
  onResume,
  onDone,
  stopAlarm,
}) => (
  <FullScreenContainer
      ref={fullScreenContainerRef}
      className={`it-timer${isPlaying ? ' it-active' : ''}${isNegative ? ' it-negative' : ''}${config.filled ? ' it-filled' : ''}`}>
    <TimerDisplay
        name={data.name}
        isPlaying={isPlaying}
        isNegative={isNegative}
        timestamp={isRunning ? currentTimestamp : data.timestamp}

        digitsClassName={isNegative ? 'it-anim-shake' : ''}
        />
    <div className='it-timer-controller'>
      <div className='it-timer-controller__row'>
        <Button onClick={() => onStart()} disabled={disabled || isPlaying}>
          <Icon name='play' />
        </Button>
        <Button onClick={() => onPause()} disabled={disabled || !isPlaying}>
          <Icon name='pause' />
        </Button>
        <Button onClick={() => onStop()} disabled={disabled || !isRunning}>
          <Icon name='stop' />
        </Button>
        <Button onClick={() => onDone()} disabled={disabled}>
          <Icon name='forward' />
        </Button>
        <Button onClick={() => stopAlarm()} disabled={disabled || !isRinging}>
          <Icon name='bell-slash' />
        </Button>
      </div>
    </div>
    {disabled &&
      <div className='it-timer-message-overlay'>
        Add Interval first.
      </div>
    }
  </FullScreenContainer>
);

const Timer = compose(
  withState('startTime', 'onChangeStartTime', null),
  withState('pauseTime', 'onChangePauseTime', null),
  withState('currentTimestamp', 'onChangeCurrnetTimestamp', (props) => (props.data || {}).timestamp),
  withProps(({data, currentTimestamp, playState, alarmState, showMilliseconds}) => ({
    data: data || {},
    isRunning: playState !== PLAY_STATE.IDLE,
    isPlaying: playState !== PLAY_STATE.IDLE && playState !== PLAY_STATE.PAUSE,
    isRinging: alarmState === ALARM_STATE.RING,
    isNegative: showMilliseconds ? currentTimestamp < 0 : Math.ceil(currentTimestamp / 1000) <= 0,
  })),
  lifecycle({
    ringAlarmIfPossible () {
      if(this.props.config.ringable) {
        this.props.ringAlarm();
      }
    },
    stopAlarmIfPossible () {
      if(this.props.isRinging) {
        this.props.ringAlarm();
      }
    },
    shouldComponentUpdate (nextProps, nextState) {
      const {
        onChangeStartTime,
        onChangePauseTime,
        onChangeCurrnetTimestamp,

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
            this.stopAlarmIfPossible();
            onChangePauseTime(moment());
            clearInterval(this._timer);

            noSleep.disable();
            break;

          case PLAY_STATE.IDLE:
            this.stopAlarmIfPossible();
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
            Sounds.stop();
            break;
          case ALARM_STATE.RING:
            Sounds.play();
            break;
        }
      }

      if(nextProps.playState === PLAY_STATE.PLAYING) {
        if(nextProps.currentTimestamp !== currentTimestamp) {
          if(nextProps.currentTimestamp < 0 && currentTimestamp >= 0) {
            this.ringAlarmIfPossible();
          }
        }
      }

      if(nextProps.index !== index) {
        this.stopAlarmIfPossible();
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

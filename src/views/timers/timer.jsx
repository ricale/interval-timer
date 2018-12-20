import React from 'react';
import moment from 'moment';

import {compose, withState, withProps, lifecycle} from 'lib/recompose';
import {fillWithZero} from 'lib';
import Sounds from 'lib/Sounds';
import {Button} from 'components';
import {PLAY_STATE, ALARM_STATE} from 'constants';

import './timer.less';

const TimerDisplayView = ({
  name,
  hours,
  minutes,
  seconds,
  milliseconds,
  showHours = true,
  showMilliseconds,
  isNegative,
}) => (
  <div className='it-timer-display'>
    <div className='it-timer-display__name'>{name}</div>
    <div className={`it-timer-display__digits ${isNegative ? 'it-negative' : ''}`}>
      <span className='it-timer-display__sign'>-</span>
      {showHours &&
        <span className='it-timer-display__hours'>{fillWithZero(hours)}</span>
      }
      {showHours &&
        <span className='it-timer-display__divider'>:</span>
      }
      <span className='it-timer-display__minutes'>{fillWithZero(minutes)}</span>
      <span className='it-timer-display__divider'>:</span>
      <span className='it-timer-display__seconds'>{fillWithZero(seconds)}</span>
      {showMilliseconds &&
        <span className='it-timer-display__divider'>:</span>
      }
      {showMilliseconds &&
        <span className='it-timer-display__milliseconds'>
          {parseInt(milliseconds / 100)}
        </span>
      }
    </div>
  </div>
);

const TimerDisplay = compose(
  withProps(({timestamp, showMilliseconds}) => {
    const totalSeconds = (
      showMilliseconds ?
        parseInt(timestamp / 1000, 10) :
        Math.ceil(timestamp / 1000)
    );

    const isNegative = showMilliseconds ? timestamp < 0 : totalSeconds < 0;

    const absSeconds = Math.abs(totalSeconds);

    return {
      hours:        parseInt(absSeconds / 3600, 10)      || 0,
      minutes:      parseInt(absSeconds % 3600 / 60, 10) || 0,
      seconds:      parseInt(absSeconds % 60, 10)        || 0,
      milliseconds: Math.abs(timestamp) % 1000 || 0,
      isNegative,
    };
  }),

)(TimerDisplayView);

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
  <div>
    <TimerDisplay
        name={data.name}
        timestamp={isRunning ? currentTimestamp : data.timestamp}
        />
    <div className='it-timer-controller'>
      <div className='it-timer-controller__row'>
        <Button onClick={() => onStart()} disabled={isPlaying}>Start</Button>
        <Button onClick={() => onPause()} disabled={!isPlaying}>Pause</Button>
        <Button onClick={() => onStop()} disabled={!isRunning}>Stop</Button>
        <Button onClick={() => onDone()}>Done</Button>
      </div>
      <div className='it-timer-controller__row'>
        <Button onClick={() => stopAlarm()} disabled={!isRinging}>stop alarm</Button>
      </div>
    </div>
  </div>
);

const Timer = compose(
  withState('startTime', 'onChangeStartTime', null),
  withState('pauseTime', 'onChangePauseTime', null),
  withState('currentTimestamp', 'onChangeCurrnetTimestamp', (props) => props.data.timestamp),
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
            break;

          case PLAY_STATE.PAUSE:
            stopAlarm();
            onChangePauseTime(moment());
            clearInterval(this._timer);
            break;

          case PLAY_STATE.IDLE:
            stopAlarm();
            onChangeStartTime(null);
            onChangePauseTime(null);
            onChangeCurrnetTimestamp(data.timestamp);
            clearInterval(this._timer);
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

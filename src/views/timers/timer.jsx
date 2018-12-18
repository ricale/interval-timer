import React, {Component} from 'react';
import moment from 'moment';

import {compose, withState, mapProps, lifecycle} from 'lib/recompose';
import {Button} from 'components';
import {PLAY_STATE} from 'constants';
import {fillWithZero} from 'lib';

import './timer.less';

const TimerDisplayView = ({
  name,
  hours,
  minutes,
  seconds,
  milliseconds,
  showHours = true,
  showMilliseconds = false,
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

const TimerDisplay = mapProps(({name, timestamp, showMilliseconds}) => {
  const isNegative = timestamp < -1;
  const totalMilliseconds = isNegative ? timestamp * -1 : timestamp;
  const totalSeconds = totalMilliseconds / 1000;

  return {
    hours:        parseInt(totalSeconds / 3600, 10)      || 0,
    minutes:      parseInt(totalSeconds % 3600 / 60, 10) || 0,
    seconds:      parseInt(totalSeconds % 60, 10)        || 0,
    milliseconds: totalMilliseconds % 1000 || 0,
    name:         name,
    isNegative,
  };
})(TimerDisplayView);

const TimerView = ({
  data,
  timestamp,
  isRunning,
  isPlaying,
  startTime,
  onStart,
  onStop,
  onPause,
  onResume,
  onDone
}) => (
  <div>
    <TimerDisplay
        name={data.name}
        timestamp={isRunning ? (data.timestamp - moment().diff(startTime)) : 0}
        />
    <div className='it-timer-controller'>
      <Button onClick={() => onStart()} disabled={isPlaying}>Start</Button>      
      <Button onClick={() => onPause()} disabled={!isPlaying}>Pause</Button>
      <Button onClick={() => onStop()} disabled={!isRunning}>Stop</Button>
      <Button onClick={() => onDone()}>Done</Button>
    </div>
  </div>
);

const Timer = compose(
  withState('startTime', 'onChangeStartTime', null),
  withState('pauseTime', 'onChangePauseTime', null),
  mapProps(({data, playState, ...args}) => ({
    data: data || {},
    isRunning: playState !== PLAY_STATE.IDLE,
    isPlaying: playState !== PLAY_STATE.IDLE && playState !== PLAY_STATE.PAUSE,
    playState,
    ...args,
  })),
  lifecycle({
    componentDidMount() {
      const {playState, passed} = this.props;
      if(playState === PLAY_STATE.PLAYING) {
        this.props.onChangeStartTime(moment());
        this._timer = setInterval(() => {
          this.forceUpdate();
        }, 100);
      }
    },
    shouldComponentUpdate(nextProps, nextState) {
      const {
        playState,
        startTime,
        pauseTime,
        data,
      } = this.props;

      if(nextProps.playState !== playState) {
        switch(nextProps.playState) {
          case PLAY_STATE.PLAYING:
            if(pauseTime) {
              this.props.onChangeStartTime(
                startTime.add(moment().diff(pauseTime))
              );
              this.props.onChangePauseTime(null);

            } else {
              this.props.onChangeStartTime(moment());
            }
            this._timer = setInterval(() => {
              this.forceUpdate();
            }, 100);
            break;

          case PLAY_STATE.PAUSE:
            this.props.onChangePauseTime(moment());
            clearInterval(this._timer);
            break;

          case PLAY_STATE.IDLE:
            this.props.onChangeStartTime(null);
            this.props.onChangePauseTime(null);
            clearInterval(this._timer);
            break;
        }
      }

      if(nextProps.data.id !== data.id) {
        this.props.onChangeStartTime(moment());
        this.props.onChangePauseTime();
      }
      return true;
    },
    componentWillUnmount() {
      if(this._timer) {
        clearInterval(this._timer);
      }
    }
  })
)(TimerView);

export default Timer;

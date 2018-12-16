import React, {Component} from 'react';
import moment from 'moment';

import {compose, withState, mapProps, lifecycle} from 'lib/recompose';
import {PLAY_STATE} from 'constants';

const TimerDisplayView = ({hours, minutes, seconds, milliseconds}) => (
  <div className='it-timer-display'>
    <span className='it-timer-display__hours'>{hours}</span>
    <span className='it-timer-display__divider'>:</span>
    <span className='it-timer-display__minutes'>{minutes < 10 ? `0${minutes}` : minutes}</span>
    <span className='it-timer-display__divider'>:</span>
    <span className='it-timer-display__seconds'>{seconds < 10 ? `0${seconds}` : seconds}</span>
    <span className='it-timer-display__divider'>:</span>
    <span className='it-timer-display__milliseconds'>{milliseconds}</span>
  </div>
);

const TimerDisplay = mapProps(({timestamp}) => ({
  hours:        parseInt(timestamp / 1000 / 3600, 10)      || 0,
  minutes:      parseInt(timestamp / 1000 % 3600 / 60, 10) || 0,
  seconds:      parseInt(timestamp / 1000 % 60, 10)        || 0,
  milliseconds: timestamp % 1000 || 0
}))(TimerDisplayView);

const TimerView = ({
  data,
  timestamp,
  playState,
  startTime,
  pauseTime,
  onStart,
  onStop,
  onPause,
  onResume,
  onDone
}) => (
  <div>
    <div>data: {JSON.stringify(data)}</div>
    <div>startTime: {startTime && startTime.format()}</div>
    <div>pauseTime: {pauseTime && pauseTime.format()}</div>
    <TimerDisplay timestamp={data.timestamp - moment().diff(startTime)} />
    <div>playState: {playState}</div>
    <button onClick={() => onStart()}>Start</button>
    <button onClick={() => onPause()}>Pause</button>
    <button onClick={() => onStop()}>Stop</button>
    <button onClick={() => onDone()}>Done</button>
  </div>
);

const Timer = compose(
  withState('startTime', 'onChangeStartTime', null),
  withState('pauseTime', 'onChangePauseTime', null),
  mapProps(({data, ...args}) => ({
    data: data || {},
    ...args
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

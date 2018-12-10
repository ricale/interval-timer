import React, {Component} from 'react';
import moment from 'moment';

import {compose, withState, mapProps, lifecycle} from 'lib/recompose';
import {PLAY_STATE} from 'constants';

const getRemainingTime = (timestamp) => {
  const seconds = timestamp / 1000;
  const milliseconds = timestamp % 1000 || 0;
  const ss = parseInt(seconds % 60, 10) || 0;
  const mm = parseInt(seconds % 3600 / 60, 10) || 0;
  const hh = parseInt(seconds / 3600, 10) || 0;
  return `${hh} ${mm} ${ss} ${milliseconds}`;
}

const TimerView = ({
  data,
  milliseconds,
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
    <div>passed: {getRemainingTime(milliseconds - moment().diff(startTime))}</div>
    <div>playState: {playState}</div>
    <button onClick={() => onStart()}>Start</button>
    <button onClick={() => onStop()}>Stop</button>
    <button onClick={() => onPause()}>Pause</button>
    <button onClick={() => onResume()}>Resume</button>
    <button onClick={() => onDone()}>Done</button>
  </div>
);

const Timer = compose(
  withState('startTime', 'onChangeStartTime', null),
  withState('pauseTime', 'onChangePauseTime', null),
  mapProps(({data = {}, ...args}) => {
    const milliseconds = (data.hours*60*60 + data.minutes*60 + data.seconds) * 1000;
    return {
      milliseconds,
      data,
      ...args,
    }
  }),
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

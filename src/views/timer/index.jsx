import React from 'react';
import moment from 'moment';
import NoSleep from 'nosleep.js';
import {factoryBemClass} from 'factory-bem-class';

import {compose, withStateHandlers, withProps, lifecycle} from 'lib/recompose';
import {
  Button,
  FullScreenContainer,
  Icon,
} from 'components';
import {PLAY_STATE} from 'constants';

import TimerDisplay from './_display';

import './index.less';

const cn = factoryBemClass('it-timer');

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
      className={cn({active: isPlaying, negative: isNegative, filled: config.filled})}>
    <TimerDisplay
        name={data.name}
        timestamp={isRunning ? currentTimestamp : data.timestamp}
        isPlaying={isPlaying}
        isNegative={isNegative}
        shake={config.animatable && isNegative}
        />
    <div className={cn('controller')}>
      <Button onClick={onStart} disabled={disabled || isPlaying}>
        <Icon name='play' />
      </Button>
      <Button onClick={onPause} disabled={disabled || !isPlaying}>
        <Icon name='pause' />
      </Button>
      <Button onClick={onStop} disabled={disabled || !isRunning}>
        <Icon name='stop' />
      </Button>
      <Button onClick={onDone} disabled={disabled}>
        <Icon name='forward' />
      </Button>
      <Button onClick={stopAlarm} disabled={disabled || !isRinging}>
        <Icon name='bell-slash' />
      </Button>
    </div>
    {disabled &&
      <div className={cn('message-overlay')}>
        Add Interval first.
      </div>
    }
  </FullScreenContainer>
);

const initialState = {startTime: null, pauseTime: null};

const Timer = compose(
  withStateHandlers(
    (props) => ({
      ...initialState,
      currentTimestamp: (props.data || {}).timestamp,
    }),
    {
      onChangePauseTime:        (state, props) => v => ({pauseTime: v}),
      onChangeCurrnetTimestamp: (state, props) => v => ({currentTimestamp: v}),
      onChange:                 (state, props) => d => ({...state, ...d}),
    }
  ),
  withProps(({data, currentTimestamp, playState, alarming, showMilliseconds}) => ({
    data: data || {},
    isRunning: playState !== PLAY_STATE.IDLE,
    isPlaying: playState !== PLAY_STATE.IDLE && playState !== PLAY_STATE.PAUSE,
    isRinging: alarming,
    isNegative: showMilliseconds ? currentTimestamp < 0 : Math.ceil(currentTimestamp / 1000) <= 0,
  })),
  lifecycle({
    ringAlarmIfNeeded (nextProps) {
      if(nextProps.playState === PLAY_STATE.PLAYING) {
        if(nextProps.currentTimestamp !== this.props.currentTimestamp) {
          if(nextProps.currentTimestamp < 0 && this.props.currentTimestamp >= 0) {
            if(nextProps.config.ringable) {
              this.props.ringAlarm();
            }
          }
        }
      }
    },
    shouldComponentUpdate (nextProps, nextState) {
      const {
        onChangePauseTime,
        onChangeCurrnetTimestamp,
        onChange,

        playState,
        startTime,
        pauseTime,
        index,
        data,
      } = this.props;

      if(nextProps.playState !== playState) {
        switch(nextProps.playState) {
          case PLAY_STATE.PLAYING:
            if(pauseTime) {
              onChange({
                startTime: startTime.add(moment().diff(pauseTime)),
                pauseTime: null,
              });

            } else {
              onChange({
                startTime: moment(),
                currentTimestamp: data.timestamp,
              });
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
            onChangePauseTime(moment());
            clearInterval(this._timer);

            noSleep.disable();
            break;

          case PLAY_STATE.IDLE:
            onChange({
              startTime: null,
              pauseTime: null,
              currentTimestamp: data.timestamp,
            });
            clearInterval(this._timer);

            noSleep.disable();
            break;
        }
      }

      this.ringAlarmIfNeeded(nextProps);

      if(nextProps.index !== index) {
        onChange({
          startTime: moment(),
          pauseTime: null,
          currentTimestamp: nextProps.data.timestamp,
        });
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

import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import NoSleep from 'nosleep.js';
import styled, {css} from 'styled-components';

import {
  compose,
  withStateHandlers,
  withProps,
  lifecycle,
  getMapDispatchToProps,
} from 'lib';
import {
  Button,
  FullScreenContainer,
  Icon,
} from 'components';
import {PLAY_STATE} from 'constants';
import timerActions from 'actions/timer';

import TimerDisplay from './_display';

const noSleep = new NoSleep();

const Container = styled(FullScreenContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0;
  margin: 0;
`;

const ControlPanel = styled.div`
  margin-top: 10px;
`;

const PanelButton = styled(Button)`
  font-size: 1em;
  ${props => props.full && css`
    @media (min-width: 768px) {
      font-size: 2.4em;
      padding: 20px 25px;
    }
    @media (max-width: 768px) {
      font-size: 1.5em;
    }
  `}
`;

const MessageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  background-color: rgba(0,0,0,0.7);
  color: #FFF;
  font-weight: bold;
`;

const TimerView = ({
  data,
  currentTimestamp,
  isRunning,
  isPlaying,
  isRinging,
  isNegative,
  disabled,
  config,
  full,
  onChangeFull,
  fullScreenContainerRef,

  start,
  stop,
  pause,
  goToNext,
  stopAlarm,
}) => (
  <Container
      ref={fullScreenContainerRef}
      onChange={onChangeFull}
      full={full}
      active={isPlaying}
      negative={isNegative}>
    <TimerDisplay
        name={data.name}
        timestamp={isRunning ? currentTimestamp : data.timestamp}
        isPlaying={isPlaying}
        isNegative={isNegative}
        shake={config.animatable && isNegative}
        full={full}
        />
    <ControlPanel>
      <PanelButton full={full} onClick={start} disabled={disabled || isPlaying}>
        <Icon name='play' />
      </PanelButton>
      <PanelButton full={full} onClick={pause} disabled={disabled || !isPlaying}>
        <Icon name='pause' />
      </PanelButton>
      <PanelButton full={full} onClick={stop} disabled={disabled || !isRunning}>
        <Icon name='stop' />
      </PanelButton>
      <PanelButton full={full} onClick={goToNext} disabled={disabled}>
        <Icon name='forward' />
      </PanelButton>
      <PanelButton full={full} onClick={stopAlarm} disabled={disabled || !isRinging}>
        <Icon name='bell-slash' />
      </PanelButton>
    </ControlPanel>
    {disabled &&
      <MessageOverlay>
        Add Interval first.
      </MessageOverlay>
    }
  </Container>
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
            this.props.ringAlarm();
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

export default connect(null, getMapDispatchToProps({...timerActions}))(Timer);

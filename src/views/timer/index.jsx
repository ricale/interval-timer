import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import NoSleep from 'nosleep.js';
import styled, {css} from 'styled-components';

import {
  compose,
  getMapDispatchToProps,
  withStateHandlers,
  withProps,
  lifecycle,
} from 'lib';
import {
  Button,
  Icon,
} from 'components';
import {PLAY_STATE} from 'constants';
import timerActions from 'actions/timer';

import TimerDisplay from './_display';

const noSleep = new NoSleep();

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0;
  margin: 0;
  height: 100%;

  ${p => p.full && css`
    width: 100%;
  `}

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Display = styled(TimerDisplay)`
  ${p => p.full && css`
    width: 100%;
    height: 100%;
    border: 0;
  `}
`;

const ControlPanel = styled.div`
  ${p => p.full && css`
    position: absolute;
    bottom: 5px;
  `}
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

  start,
  stop,
  pause,
  goToNext,
  stopAlarm,
}) => (
  <Container full={full}>
    <Display
        name={data.name}
        set={data.timestamp}
        timestamp={isRunning ? currentTimestamp : data.timestamp}
        isPlaying={isPlaying}
        isNegative={isNegative}
        shake={config.animatable && isNegative}
        full={full}
        />
    <ControlPanel full={full}>
      {!isPlaying &&
        <PanelButton full={full} onClick={start} disabled={disabled || isPlaying}>
          <Icon name='play' />
        </PanelButton>
      }
      {isPlaying &&
        <PanelButton full={full} onClick={pause} disabled={disabled || !isPlaying}>
          <Icon name='pause' />
        </PanelButton>
      }
      <PanelButton full={full} onClick={stop} disabled={disabled || !isRunning}>
        <Icon name='stop' />
      </PanelButton>
      <PanelButton full={full} onClick={goToNext} disabled={disabled}>
        <Icon name='forward' />
      </PanelButton>
      {isRinging &&
        <PanelButton full={full} onClick={stopAlarm} disabled={disabled || !isRinging}>
          <Icon name='bell-slash' />
        </PanelButton>
      }
    </ControlPanel>
    {disabled &&
      <MessageOverlay>
        Add Interval first.
      </MessageOverlay>
    }
  </Container>
);

function changeCurrentTimestamp ({
  onChangeCurrnetTimestamp,
  data,
  startTime,
}) {
  onChangeCurrnetTimestamp(
    data.timestamp - moment().diff(startTime)
  );
}

const Timer = compose(
  withProps(({list, timer}) => ({
    data: list[timer.current % list.length],
    index: timer.current,
    disabled: list.length === 0,
    ...timer,
  })),
  withStateHandlers(
    (props) => ({
      currentTimestamp: (props.data || {}).timestamp,
    }),
    {
      onChangeCurrnetTimestamp: (state, props) => v => ({currentTimestamp: v}),
    }
  ),
  withProps(({data, currentTimestamp, playState, alarming, showMilliseconds, config}) => ({
    data: data || {},
    isRunning: playState !== PLAY_STATE.IDLE,
    isPlaying: playState !== PLAY_STATE.IDLE && playState !== PLAY_STATE.PAUSE,
    isRinging: config.ringable && alarming,
    isNegative: showMilliseconds ? currentTimestamp < 0 : Math.ceil(currentTimestamp / 1000) <= 0,
  })),
  lifecycle({
    componentDidMount () {
      if(this.props.playState === PLAY_STATE.PLAYING) {
        changeCurrentTimestamp(this.props);
        this._timer = setInterval(() => {
          changeCurrentTimestamp(this.props);
        }, 100);
      }
    },
    shouldComponentUpdate (nextProps, nextState) {
      const {
        onChangeCurrnetTimestamp,

        playState,
        pauseTime,
        index,
        data,
      } = this.props;

      if(nextProps.playState !== playState) {
        switch(nextProps.playState) {
          case PLAY_STATE.PLAYING:
            if(!pauseTime) {
              onChangeCurrnetTimestamp(data.timestamp);
            }
            this._timer = setInterval(() => {
              changeCurrentTimestamp(this.props);
            }, 100);

            noSleep.enable();
            break;

          case PLAY_STATE.PAUSE:
            clearInterval(this._timer);
            noSleep.disable();
            break;

          case PLAY_STATE.IDLE:
            onChangeCurrnetTimestamp(data.timestamp);
            clearInterval(this._timer);
            noSleep.disable();
            break;
        }
      }

      if(nextProps.playState === PLAY_STATE.PLAYING) {
        if(nextProps.currentTimestamp !== this.props.currentTimestamp) {
          if(nextProps.currentTimestamp < 0 && this.props.currentTimestamp >= 0) {
            this.props.ringAlarm();
          }
        }
      }

      if(nextProps.index !== index) {
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

const mapStateToProps = (state, ownProps) => ({
  list: state.intervals.list,
  timer: state.timer,
  config: state.config,
});

const mapDispatchToProps = getMapDispatchToProps({
  ...timerActions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

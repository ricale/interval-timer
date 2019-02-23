import React, {Fragment} from 'react';
import moment from 'moment';
import styled, {css} from 'styled-components';

import {withProps, getDuringTime} from 'lib';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  ${props => props.reverse && css`
    flex-direction: column-reverse;
  `}
`;

const Header = styled.div``;

const StartTime = styled.div`
  font-size: 0.8em;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 5px;
  flex: 1;

  background-color: #FFF;

  ${props => props.state === 'pause' && css`
    background-color: #EFEFEF;
  `}

  ${props => props.state === 'stop' && css`
    background-color: #EFEFEF;
  `}

  ${props => props.state === 'quit' && css`
    margin: 15px 0;
    padding: 0;
    border-bottom: 1px dashed #000;
    background-color: transparent;
  `}
`;

const IntervalName = styled.div``;

const During = styled.div`
  font-family: monospace;
  text-align: right;
`;

const HistoryItemView = ({timestamp, during, intervalName, playState, reverse}) => (
  <Container reverse={reverse}>
    <Header>
      {playState !== 'quit' &&
        <StartTime>
          {moment(timestamp).format('MM-DD HH:mm:ss')}
        </StartTime>
      }
    </Header>
    <Body state={playState}>
      {playState === 'playing' &&
        <Fragment>
          <IntervalName>{intervalName}</IntervalName>
          <During>{during}</During>
        </Fragment>
      }
      {playState === 'pause' &&
        <Fragment>
          <IntervalName>Paused</IntervalName>
          <During>{during}</During>
        </Fragment>
      }
      {playState === 'stop' &&
        <IntervalName>Stopped</IntervalName>
      }
    </Body>
  </Container>
);

const getTitle = (type) => (
  {
    'TIMER/START': 'Begin',
    'TIMER/GO_TO_NEXT': 'Next',
    'TIMER/PAUSE': 'Pause',
    'TIMER/STOP': 'Stop',
  }[type] || ''
);

const getPlayState = (type) => (
  {
    'TIMER/START': 'playing',
    'TIMER/GO_TO_NEXT': 'playing',
    'TIMER/PAUSE': 'pause',
    'TIMER/STOP': 'stop',
    'TIMER/QUIT': 'quit',
  }[type] || ''
);

const HistoryItem = withProps(({type, timestamp, nextTimestamp, interval}) => {
  const during = (
    nextTimestamp ?
      getDuringTime(nextTimestamp - timestamp, {toString: true}) :
      ''
  );

  return {
    title: getTitle(type),
    timestamp,
    during,
    intervalName: interval && interval.name,
    playState: getPlayState(type),
  };
})(HistoryItemView);

export default HistoryItem;

import React from 'react';
import moment from 'moment';
import styled, {css} from 'styled-components';

import {withProps, getDuringTime} from 'lib';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #DDD;
`;

const Header = styled.div``;

const StartTime = styled.div`
  font-family: monospace;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding: 5px;
  flex: 1;

  background-color: #FFF;

  ${props => props.state === 'pause' && css`
    
  `}

  ${props => props.state === 'stop' && css`
    
  `}

  ${props => props.state === 'quit' && css`
    margin: 5px 0;
    padding: 0;
    /*border-bottom: 1px dashed #000;*/
    background-color: transparent;
  `}
`;

const IntervalName = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const During = styled.div`
  width: 70px;
  text-align: right;
  font-family: monospace;
  /*text-align: right;*/
`;

const HistoryItemView = ({timestamp, during, intervalName, playState, reverse}) => (
  <Container reverse={reverse}>
    <Header>
      {playState !== 'quit' &&
        <StartTime>
          {moment(timestamp).format('MM/DD HH:mm:ss')}
        </StartTime>
      }
    </Header>
    <Body state={playState}>
      {playState === 'playing' &&
        <>
          <IntervalName>{intervalName}</IntervalName>
          <During>{during}</During>
        </>
      }
      {playState === 'pause' &&
        <>
          <IntervalName>Paused</IntervalName>
          <During>{during}</During>
        </>
      }
      {playState === 'stop' &&
        <>
          <IntervalName>Stopped</IntervalName>
          <During></During>
        </>
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

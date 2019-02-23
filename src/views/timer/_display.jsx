import React from 'react';
import styled, {css, keyframes} from 'styled-components';

import {fillWithZero} from 'lib';
import {compose, withProps, lifecycle} from 'lib';

const shakeAnimation = keyframes`
   0% {transform: translate( 1px, 0);}
  10% {transform: translate(-1px, 0);}
  20% {transform: translate( 2px, 0);}
  30% {transform: translate(-2px, 0);}
  40% {transform: translate( 1px, 0);}
  50% {transform: translate(-1px, 0);}
  60% {transform: translate( 2px, 0);}
  70% {transform: translate(-2px, 0);}
  80% {transform: translate( 1px, 0);}
  90% {transform: translate(-1px, 0);}
`;

const Container = styled.div`
  display: inline-block;
  padding: 20px 30px;
  margin: 0;

  font-family: monospace;
  color: #333;
  background-color: #DDD

  ${props => props.active && css`
    background-color: #AFDFF3;
  `}

  ${props => props.negative && css `
    background-color: #EAA6A6;
  `}
`;

const Name = styled.div`
  font-size: ${props => props.big ? 2.4 : 1.2}em;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const Digits = styled.div`
  font-size: ${props => props.big ? 10 : 3.5}em;
  line-height: 100%;

  ${props => props.shake && css`
    animation-name: ${shakeAnimation};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  `}

  @media (max-width: 768px) {
    font-size: 3.5em;
  }
`;

const Number = styled.span``;
const Divider = styled.span`
  ::before {
    content: ":";
  }
`;

const TimerDisplayView = ({
  name,
  hours,
  minutes,
  seconds,
  milliseconds,
  full,
  showHours = true,
  showMilliseconds,
  isNegative,
  isPlaying,
  shake,
}) => (
  <Container active={isPlaying} negative={isNegative} shake={shake}>
    <Name big={full}>{name}</Name>
    <Digits big={full} shake={shake}>
      {showHours &&
        <>
          <Number>{fillWithZero(hours)}</Number>
          <Divider />
        </>
      }
      <Number>{fillWithZero(minutes)}</Number>
      <Divider />
      <Number>{fillWithZero(seconds)}</Number>
      {showMilliseconds &&
        <>
          <Divider />
          <Number>{parseInt(milliseconds / 100)}</Number>
        </>
      }
    </Digits>
  </Container>
);

const TimerDisplay = compose(
  withProps(({timestamp, showMilliseconds}) => {
    const totalSeconds = (
      showMilliseconds ?
        parseInt(timestamp / 1000, 10) :
        Math.ceil(timestamp / 1000)
    );

    const absSeconds = Math.abs(totalSeconds);

    return {
      hours:        parseInt(absSeconds / 3600, 10)      || 0,
      minutes:      parseInt(absSeconds % 3600 / 60, 10) || 0,
      seconds:      parseInt(absSeconds % 60, 10)        || 0,
      milliseconds: Math.abs(timestamp) % 1000 || 0,
    };
  }),
  lifecycle({
    shouldComponentUpdate (nextProps, nextState) {
      const attrNames = [
        'name',
        'hours',
        'minutes',
        'seconds',
        'full',
        'isNegative',
        'isPlaying',
      ];

      if(nextProps.showMilliseconds) {
        attrNames.push('milliseconds');
      }

      return attrNames.filter(attr =>
        this.props[attr] !== nextProps[attr]
      ).length > 0;
    },
  }),

)(TimerDisplayView);

export default TimerDisplay;

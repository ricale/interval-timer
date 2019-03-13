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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*padding: 20px 30px;*/
  width: 302px;
  height: 302px;
  margin: 0;

  font-family: monospace;
  color: #333;
  border: 1px solid ${p => p.theme.inactiveColor};

  ${p => p.active && css`
    border-color: ${p => p.theme.activeColor};
  `}

  ${p => p.negative && css `
    border-color: ${p => p.theme.negativeColor};
  `}
`;

const Name = styled.div`
  position: relative;
  font-size: ${p => p.big ? 2.4 : 1.2}em;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const Digits = styled.div`
  position: relative;
  font-size: ${p => p.big ? 10 : 3.5}em;
  line-height: 100%;

  ${p => p.shake && css`
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

const Sand = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  transition: height 0.5s linear;

  ${p => p.active && css`
    background-color: #AFDFF3;
  `}

  ${p => p.negative && css `
    /*background-color: #AFDFF3;*/
    background-color: #EAA6A6;
  `}
`;

const TimerDisplayView = ({
  name,
  hours,
  minutes,
  seconds,
  milliseconds,
  totalSeconds,
  halfseconds,
  timestamp,
  full,
  showHours = true,
  showMilliseconds,
  isNegative,
  isPlaying,
  shake,
  rate,
  set,
}) => (
  <Container
      active={isPlaying}
      negative={isNegative}
      shake={shake}>
    <Sand
        active={isPlaying}
        negative={isNegative}
        style={{height: (Math.floor(rate * 300))}}
        />
        {halfseconds}
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
  withProps(({timestamp, showMilliseconds, set, isPlaying}) => {
    const totalSeconds = (
      showMilliseconds ?
        Math.floor(timestamp / 1000) :
        Math.ceil(timestamp / 1000)
    );

    const absSeconds = Math.abs(totalSeconds);

    const rate = (set - timestamp) / (set - 500);

    return {
      hours:        Math.floor(absSeconds / 3600)      || 0,
      minutes:      Math.floor(absSeconds % 3600 / 60) || 0,
      seconds:      Math.floor(absSeconds % 60)        || 0,
      milliseconds: Math.abs(timestamp) % 1000 || 0,
      // halfseconds:  Math.abs(timestamp) % 1000 || 0,
      totalSeconds,
      rate:         rate > 1 ? 1 : rate,
    };
  }),
  lifecycle({
    shouldComponentUpdate (nextProps, nextState) {
      const attrNames = [
        'name',
        'hours',
        'minutes',
        'seconds',
        'halfseconds',
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

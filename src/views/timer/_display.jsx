import React from 'react';
import styled, {css, keyframes} from 'styled-components';

import {fillWithZero} from 'lib';
import {compose, withProps, lifecycle} from 'lib';

import Sand from './_sand';

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

  margin: 0;

  font-family: monospace;
  color: #333;

  @media (min-width: 768px) {
    width: 302px;
    height: 302px;
  }
`;

const Name = styled.div`
  position: relative;
  padding: 0 5px;
  text-align: center;
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
  rate,
  set,
  ...props
}) => (
  <Container
      active={isPlaying}
      negative={isNegative}
      {...props}>
    <Sand
        active={isPlaying}
        negative={isNegative}
        init={rate}
        // duration={restSeconds}
        />
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

    const rate = Math.floor((set - (totalSeconds * 1000)) / set * 10000) / 100;

    return {
      hours:        Math.floor(absSeconds / 3600)      || 0,
      minutes:      Math.floor(absSeconds % 3600 / 60) || 0,
      seconds:      Math.floor(absSeconds % 60)        || 0,
      milliseconds: Math.abs(timestamp) % 1000 || 0,
      rate,
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

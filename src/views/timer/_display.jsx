import React from 'react';
import {factoryBemClass} from 'factory-bem-class';

import {fillWithZero} from 'lib';
import {compose, withProps, lifecycle} from 'lib/recompose';

import './_display.less';

const cn = factoryBemClass('it-timer-display');

const TimerDisplayView = ({
  name,
  hours,
  minutes,
  seconds,
  milliseconds,
  showHours = true,
  showMilliseconds,
  isNegative,
  isPlaying,

  digitsClassName,
}) => (
  <div className={`${cn({mods: {active: isPlaying, negative: isNegative}})}`}>
    <div className={cn('name')}>{name}</div>
    <div className={`${cn('digits')} ${digitsClassName || ''}`}>
      {showHours &&
        <span className={cn('hours')}>{fillWithZero(hours)}</span>
      }
      {showHours &&
        <span className={cn('divider')}>:</span>
      }
      <span className={cn('minutes')}>{fillWithZero(minutes)}</span>
      <span className={cn('divider')}>:</span>
      <span className={cn('seconds')}>{fillWithZero(seconds)}</span>
      {showMilliseconds &&
        <span className={cn('divider')}>:</span>
      }
      {showMilliseconds &&
        <span className={cn('milliseconds')}>
          {parseInt(milliseconds / 100)}
        </span>
      }
    </div>
  </div>
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

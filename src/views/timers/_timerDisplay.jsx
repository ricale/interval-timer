import React from 'react';

import {fillWithZero} from 'lib';
import {compose, withProps, lifecycle} from 'lib/recompose';

const TimerDisplayView = ({
  name,
  hours,
  minutes,
  seconds,
  milliseconds,
  showHours = true,
  showMilliseconds,
  isNegative,
}) => (
  <div className='it-timer-display'>
    <div className='it-timer-display__name'>{name}</div>
    <div className={`it-timer-display__digits ${isNegative ? 'it-negative' : ''}`}>
      <span className='it-timer-display__sign'>-</span>
      {showHours &&
        <span className='it-timer-display__hours'>{fillWithZero(hours)}</span>
      }
      {showHours &&
        <span className='it-timer-display__divider'>:</span>
      }
      <span className='it-timer-display__minutes'>{fillWithZero(minutes)}</span>
      <span className='it-timer-display__divider'>:</span>
      <span className='it-timer-display__seconds'>{fillWithZero(seconds)}</span>
      {showMilliseconds &&
        <span className='it-timer-display__divider'>:</span>
      }
      {showMilliseconds &&
        <span className='it-timer-display__milliseconds'>
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

    const isNegative = showMilliseconds ? timestamp < 0 : totalSeconds < 0;

    const absSeconds = Math.abs(totalSeconds);

    return {
      hours:        parseInt(absSeconds / 3600, 10)      || 0,
      minutes:      parseInt(absSeconds % 3600 / 60, 10) || 0,
      seconds:      parseInt(absSeconds % 60, 10)        || 0,
      milliseconds: Math.abs(timestamp) % 1000 || 0,
      isNegative,
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
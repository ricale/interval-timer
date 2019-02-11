import React, {Fragment} from 'react';
import moment from 'moment';
import {factoryBemClass} from 'factory-bem-class';

import {withProps, getDuringTime} from 'lib';

import './_item.less';

const cn = factoryBemClass('it-history-item');

const HistoryItemView = ({timestamp, during, intervalName, playState, reverse}) => (
  <div className={cn({[playState]: true, reverse})}>
    <div className={cn('header')}>
      {playState !== 'quit' &&
        <div className={cn('start-time')}>
          {moment(timestamp).format('MM-DD HH:mm:ss')}
        </div>
      }
    </div>
    <div className={cn('body')}>
      {playState === 'playing' &&
        <Fragment>
          <div className={cn('interval')}>{intervalName}</div>
          <div className={cn('during')}>{during}</div>
        </Fragment>
      }
      {playState === 'pause' &&
        <Fragment>
          <div className={cn('interval')}>Paused</div>
          <div className={cn('during')}>{during}</div>
        </Fragment>
      }
      {playState === 'stop' &&
        <div>Stopped</div>
      }
      {playState === 'quit' &&
        <div></div>
      }
    </div>
  </div>
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

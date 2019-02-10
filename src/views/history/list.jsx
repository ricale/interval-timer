import React from 'react';
import moment from 'moment';
import {factoryBemClass} from 'factory-bem-class';

import {withProps, getDuringTimeFromTimestamp} from 'lib';

import './list.less';

const cn = factoryBemClass('it-history-list');

const HistoryItemView = ({timestamp, during, intervalName, playState}) => (
  <div className={cn('item', playState)}>
    <div className={cn('item-header')}>
      <div className={cn('item-start-time')}>
        {moment(timestamp).format('MM-DD HH:mm:ss')}
      </div>
    </div>
    {playState !== 'stop' &&
      <div className={cn('item-body')}>
        <div className={cn('item-interval')}>{intervalName}</div>
        <div className={cn('item-during')}>{during}</div>
      </div>
    }
    {playState === 'stop' &&
      <div className={cn('item-body')}>
        <div>Stopped</div>
      </div>
    }
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
  }[type] || ''
);

const HistoryItem = withProps(({type, timestamp, nextTimestamp, interval}) => {
  const duringTime = nextTimestamp ? getDuringTimeFromTimestamp(nextTimestamp - timestamp) : {};
  let during = '';
  if(duringTime.hours) {
    during = `${duringTime.hours}h ${duringTime.minutes}m ${duringTime.seconds}s`;
  } else if(duringTime.minutes) {
    during = `${duringTime.minutes}m ${duringTime.seconds}s`;
  } else {
    during = `${duringTime.seconds}s`;
  }

  return {
    title: getTitle(type),
    timestamp,
    during,
    intervalName: interval.name,
    playState: getPlayState(type),
  };
})(HistoryItemView);

const HistoryList = ({data}) => (
  <div className={cn()}>
    {data.map((d,i) =>
      <HistoryItem key={i} {...d} nextTimestamp={(data[i+1] || {}).timestamp} />
    )}
  </div>
);

export default HistoryList;

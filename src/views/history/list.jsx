import React from 'react';
import {factoryBemClass} from 'factory-bem-class';

import HistoryItem from './_item';

import './list.less';

const cn = factoryBemClass('it-history-list');

const HistoryList = ({data, reverse = true}) => (
  <div className={cn({reverse})}>
    {data.map((d,i) =>
      <HistoryItem
          key={i}
          {...d}
          nextTimestamp={(data[i+1] || {}).timestamp}
          reverse={reverse}
          />
    )}
    {data.length === 0 &&
      <p className={cn('message')}>No history.</p>
    }
  </div>
);

export default HistoryList;

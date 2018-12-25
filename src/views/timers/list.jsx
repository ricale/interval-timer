import React from 'react';

import {fillWithZero} from 'lib';

import './list.less';

const TimerList = ({data = [], onDelete, onDeleteAll}) => (
  <div className='it-timer-list'>
    {data.map((d,i) =>
      <div key={i} className='it-timer-list__item'>
        <div className='it-timer-item__header'>
          <span className='it-timer-item__name'>{d.name}</span>
          <button onClick={() => onDelete(d)}>삭제</button>
        </div>
        <div className='it-timer-item__digits'>
          <span className='it-timer-item__hours'>
            {fillWithZero(d.hours)}
          </span>
          <span className='it-timer-item__divider'>:</span>
          <span className='it-timer-item__minutes'>
            {fillWithZero(d.minutes)}
          </span>
          <span className='it-timer-item__divider'>:</span>
          <span className='it-timer-item__seconds'>
            {fillWithZero(d.seconds)}
          </span>
        </div>
      </div>
    )}

    <button onClick={onDeleteAll}>
      모두 삭제
    </button>
  </div>
);

export default TimerList;

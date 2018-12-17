import React from 'react';

import './list.less';

const TimerList = ({data = [], onDelete}) => (
  <div className='it-timer-list'>
    {data.map((d,i) =>
      <div key={i} className='it-timer-list__item'>
        <div className='it-timer-item__header'>
          <span className='it-timer-item__name'>{d.name}</span>
          <button onClick={() => onDelete(d)}>삭제</button>
        </div>
        <div className='it-timer-item__digits'>
          <span className='it-timer-item__hours'>
            {d.hours < 10 ? `0${d.hours}` : d.hours}
          </span>
          <span className='it-timer-item__divider'>:</span>
          <span className='it-timer-item__minutes'>
            {d.minutes < 10 ? `0${d.minutes}` : d.minutes}
          </span>
          <span className='it-timer-item__divider'>:</span>
          <span className='it-timer-item__seconds'>
            {d.seconds < 10 ? `0${d.seconds}` : d.seconds}
          </span>
        </div>
      </div>
    )}
  </div>
);

export default TimerList;

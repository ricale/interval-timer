import React from 'react';

import {fillWithZero} from 'lib';
import {Button, Icon} from 'components';

import './list.less';

const TimerList = ({data = [], onDelete, onDeleteAll}) => (
  <div className='it-timer-list'>
    {data.map((d,i) =>
      <div key={i} className='it-timer-list__item'>
        <div className='it-timer-item__header'>
          <span className='it-timer-item__name'>{d.name}</span>
          <div className='it-timer-item__menu'>
            <Button onClick={() => onDelete(d)} small={true}>
              <Icon name='times' />
            </Button>
          </div>
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

    {data.length > 0 &&
      <Button onClick={onDeleteAll} warning={true} bordered={true}>
        <Icon name='trash-alt'/>
      </Button>
    }
  </div>
);

export default TimerList;

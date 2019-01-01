import React from 'react';

import {fillWithZero} from 'lib';
import {Button, Icon} from 'components';

import './list.less';

const TimerItem = ({
  id,
  name,
  hours,
  minutes,
  seconds,
  isEditing,
  onDelete,
  onEdit,
}) => (
  <div className={`it-timer-list__item${isEditing ? ' it-editing' : ''}`}>
    <div className='it-timer-item__header'>
      <span className='it-timer-item__name'>{name}</span>
      <div className='it-timer-item__menu'>
        <Button onClick={() => onEdit(id)} small={true}>
          <Icon name='edit' />
        </Button>
        <Button onClick={() => onDelete(id)} small={true}>
          <Icon name='times' />
        </Button>
      </div>
    </div>

    <div className='it-timer-item__digits'>
      <span className='it-timer-item__hours'>
        {fillWithZero(hours)}
      </span>
      <span className='it-timer-item__divider'>:</span>
      <span className='it-timer-item__minutes'>
        {fillWithZero(minutes)}
      </span>
      <span className='it-timer-item__divider'>:</span>
      <span className='it-timer-item__seconds'>
        {fillWithZero(seconds)}
      </span>
    </div>

    {isEditing &&
      <div className='it-itmer-item__cover'>
        <Icon name='pencil-alt' />
      </div>
    }
  </div>
);

const TimerList = ({data = [], editing, onEdit, onDelete, onDeleteAll}) => (
  <div className='it-timer-list'>
    {data.map(d =>
      <TimerItem
          key={d.id}
          isEditing={editing && editing.id === d.id}
          onEdit={onEdit}
          onDelete={onDelete}
          {...d}
          />
    )}

    {data.length > 0 &&
      <Button onClick={onDeleteAll} warning={true} bordered={true}>
        <Icon name='trash-alt'/>
      </Button>
    }
  </div>
);

export default TimerList;

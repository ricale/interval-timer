import React from 'react';

import {fillWithZero} from 'lib';
import {Button, Icon} from 'components';

import TimerForm from './form';

import './list.less';

const TimerItem = ({
  id,
  name,
  hours,
  minutes,
  seconds,
  isEditing,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
}) => (
  <div className={`it-timer-list__item${isEditing ? ' it-editing' : ''}`}>
    {!isEditing &&
      <div className='it-timer-item__header'>
        <span className='it-timer-item__name'>{name}</span>
        <div className='it-timer-item__menu'>
          <Button onClick={() => onEdit(id)} small={true} bordered={true}>
            <Icon name='edit' />
          </Button>
          <Button onClick={() => onDelete(id)} small={true} bordered={true}>
            <Icon name='trash-alt' />
          </Button>
        </div>
      </div>
    }

    {!isEditing &&
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
    }

    {isEditing &&
      <TimerForm
          editing={{id, name, hours, minutes, seconds}}
          onSubmit={onUpdate}
          onCancel={onCancelEdit}
          />
    }
  </div>
);

const TimerList = ({
  data = [],
  editing,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  onDeleteAll,
}) => (
  <div className='it-timer-list'>
    {data.map(d =>
      <TimerItem
          key={d.id}
          isEditing={editing && editing.id === d.id}
          onEdit={onEdit}
          onCancelEdit={onCancelEdit}
          onUpdate={onUpdate}
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

import React from 'react';

import {fillWithZero} from 'lib';
import {Button, Icon} from 'components';

import IntervalForm from './form';

import './list.less';

const IntervalItem = ({
  id,
  name,
  hours,
  minutes,
  seconds,

  isEditing,
  canEdit,

  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
}) => (
  <div className={`it-interval-list__item${isEditing ? ' it-editing' : ''}`}>
    {!isEditing &&
      <div className='it-interval-item__header'>
        <span className='it-interval-item__name'>{name}</span>
        <div className='it-interval-item__menu'>
          <Button onClick={() => onEdit(id)} small={true} bordered={true} disabled={!canEdit}>
            <Icon name='edit' />
          </Button>
          <Button onClick={() => onDelete(id)} small={true} bordered={true} disabled={!canEdit}>
            <Icon name='trash-alt' />
          </Button>
        </div>
      </div>
    }

    {!isEditing &&
      <div className='it-interval-item__digits'>
        <span className='it-interval-item__hours'>
          {fillWithZero(hours)}
        </span>
        <span className='it-interval-item__divider'>:</span>
        <span className='it-interval-item__minutes'>
          {fillWithZero(minutes)}
        </span>
        <span className='it-interval-item__divider'>:</span>
        <span className='it-interval-item__seconds'>
          {fillWithZero(seconds)}
        </span>
      </div>
    }

    {isEditing &&
      <IntervalForm
          editing={{id, name, hours, minutes, seconds}}
          onSubmit={onUpdate}
          onCancel={onCancelEdit}
          />
    }
  </div>
);

const IntervalList = ({
  data = [],
  editing,
  canEdit,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  onDeleteAll,
}) => (
  <div className='it-interval-list'>
    {data.map(d =>
      <IntervalItem
          key={d.id}
          isEditing={editing && editing.id === d.id}
          canEdit={canEdit}
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

export default IntervalList;

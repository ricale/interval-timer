import React from 'react';
import {factoryBemClass} from 'factory-bem-class';

import {Button, Icon} from 'components';
import {fillWithZero} from 'lib';

import IntervalForm from './form';

import './_item.less';

const cn = factoryBemClass('it-interval');

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
  <div className={cn({mods: {editing: isEditing}})}>
    {!isEditing &&
      <div className={cn('header')}>
        <span className={cn('name')}>{name}</span>
        <div className={cn('menu')}>
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
      <div className={cn('digits')}>
        <span className={cn('hours')}>
          {fillWithZero(hours)}
        </span>
        <span className={cn('divider')}>:</span>
        <span className={cn('minutes')}>
          {fillWithZero(minutes)}
        </span>
        <span className={cn('divider')}>:</span>
        <span className={cn('seconds')}>
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

export default IntervalItem;

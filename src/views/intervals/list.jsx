import React from 'react';

import {Button, Icon} from 'components';

import IntervalItem from './_item';

import './list.less';

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
          canEdit={!editing && canEdit}
          onEdit={onEdit}
          onCancelEdit={onCancelEdit}
          onUpdate={onUpdate}
          onDelete={onDelete}
          {...d}
          />
    )}

    {data.length > 0 &&
      <Button
          onClick={onDeleteAll}
          warning={true}
          bordered={true}
          tooltip={{text: 'Remove all intervals'}}>
        <Icon name='trash-alt'/>
      </Button>
    }
  </div>
);

export default IntervalList;

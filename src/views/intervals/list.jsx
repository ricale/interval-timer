import React from 'react';
import styled from 'styled-components' ;

import {Button, Icon, Tooltip} from 'components';

import IntervalItem from './_item';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-bottom: 10px;
`;

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
  <Container>
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
          as={Tooltip}
          tooltip={{text: 'Remove all intervals'}}>
        <Icon name='trash-alt'/>
      </Button>
    }
  </Container>
);

export default IntervalList;

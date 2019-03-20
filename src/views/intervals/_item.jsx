import React from 'react';
import styled, {css} from 'styled-components';

import {Button, Icon} from 'components';
import {fillWithZero} from 'lib';

import IntervalForm from './_form';

const Container = styled.div`
  position: relative;
  width: 200px;
  padding: 15px 20px;
  margin-bottom: 5px;

  background-color: #DDD;

  ${props => props.editing && css`
    border: 1px solid #DDD;
    padding: 0;
    background-color: #FFF;
  `}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: monospace;
`;

const Menu = styled.div`
  opacity: 0.5;
`;

const Name = styled.span``;

const Digits = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: monospace;
  font-size: 2em;
  line-height: 100%;
`;

const Number = styled.span``;
const Divider = styled.span`
  ::before {
    content: ":";
  }
`;

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
  <Container editing={isEditing}>
    {!isEditing &&
      <Header>
        <Name>{name}</Name>
        <Menu>
          <Button onClick={() => onEdit(id)} small={true} bordered={true} disabled={!canEdit}>
            <Icon name='edit' />
          </Button>
          <Button onClick={() => onDelete(id)} small={true} bordered={true} disabled={!canEdit}>
            <Icon name='trash-alt' />
          </Button>
        </Menu>
      </Header>
    }

    {!isEditing &&
      <Digits>
        <Number>{fillWithZero(hours)}</Number>
        <Divider />
        <Number>{fillWithZero(minutes)}</Number>
        <Divider />
        <Number>{fillWithZero(seconds)}</Number>
      </Digits>
    }

    {isEditing &&
      <IntervalForm
          editing={{id, name, hours, minutes, seconds}}
          onSubmit={onUpdate}
          onCancel={onCancelEdit}
          />
    }
  </Container>
);

export default IntervalItem;

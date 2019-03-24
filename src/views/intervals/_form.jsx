import React from 'react';
import styled from 'styled-components';

import {
  compose,
  withStateHandlers,
  withHandlers,
  withProps,
  lifecycle,
} from 'lib';
import {Button, Icon, NumberInput as NInput} from 'components';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  padding: 10px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Input = styled.input`
  flex-grow: 1;
  width: 1px;
  font-size: 1em;
`;

const NumberInput = styled(NInput)`
  flex-grow: 1;
  width: 1px;
  padding-left: 0;
  padding-right: 0;

  font-size: 2em;
  font-family: monospace;
  text-align: center;
`;

const Divider = styled.span`
  font-size: 2em;
  font-family: monospace;
  color: #DDD;

  ::before {
    content: ':';
  };
`;

const IntervalFormView = ({
  name,
  hours,
  minutes,
  seconds,
  isEdit,
  isValid,
  defaultName,
  onChangeName,
  onChangeHours,
  onChangeMinutes,
  onChangeSeconds,
  onKeyPress,
  onSubmit,
  onCancel,
}) => (
  <Container>
    <Row>
      <Input
          value={name}
          onChange={e => onChangeName(e.target.value)}
          placeholder={defaultName}
          onKeyPress={onKeyPress}
          />
    </Row>
    <Row>
      <NumberInput
          type='number'
          max={99}
          min={0}
          value={hours}
          onChange={e => onChangeHours(e.target.value)}
          onKeyPress={onKeyPress}
          />
      <Divider />
      <NumberInput
          type='number'
          min={0}
          max={59}
          value={minutes}
          onChange={e => onChangeMinutes(e.target.value)}
          onKeyPress={onKeyPress}
          />
      <Divider />
      <NumberInput
          type='number'
          min={0}
          max={59}
          value={seconds}
          onChange={e => onChangeSeconds(e.target.value)}
          onKeyPress={onKeyPress}
          />
    </Row>
    <Row>
      <Button
          onClick={onSubmit}
          primary={true}
          small={true}
          bordered={true}>
        <Icon name={isEdit ? 'save' : 'plus'} />
      </Button>
      {isEdit &&
        <Button
            onClick={onCancel}
            small={true}
            bordered={true}>
          <Icon name='times' />
        </Button>
      }
    </Row>
  </Container>
);

const initialState = {id: null, name: '', hours: 0, minutes: 0, seconds: 0};

const IntervalForm = compose(
  withStateHandlers(
    (props) => ({
      ...initialState,
      ...(props.editing || {}),
    }),
    {
      onChangeName:    (state, props) => name    => ({name}),
      onChangeHours:   (state, props) => hours   => ({hours}),
      onChangeMinutes: (state, props) => minutes => ({minutes}),
      onChangeSeconds: (state, props) => seconds => ({seconds}),
      onChange:        (state, props) => data    => ({...state, ...data}),
    }
  ),
  withHandlers({
    onKeyPress: props => (e) => {
      const keyCode = e.keyCode || e.which;
      if(keyCode == '13'/* enter key */) {
        // FIXME: duplicated with onSubmit
        const data = {
          id: props.id,
          name: props.name,
          hours: props.hours,
          minutes: props.minutes,
          seconds: props.seconds,
        };
        if(!props.isValid || props.isValid(data)) {
          props.onSubmit(data);
          props.onChange(initialState);
        }
      }
    },
    onSubmit: props => () => {
      // FIXME: duplicated with onKeyPress
      const data = {
        id: props.id,
        name: props.name,
        hours: props.hours,
        minutes: props.minutes,
        seconds: props.seconds,
      };
      if(!props.isValid || props.isValid(data)) {
        props.onSubmit(data);
        props.onChange(initialState);
      }
    },
    onCancel: props => () => {
      props.onCancel();
    },
  }),
  withProps(({id}) => ({
    isEdit: id !== undefined && id !== null,
  })),
  lifecycle({
    shouldComponentUpdate (nextProps) {
      if(this.props.editing !== nextProps.editing) {
        this.props.onChange(
          nextProps.editing ?
            {...nextProps.editing} :
            {...initialState}
        );
      }
      return true;
    },
  }),
)(IntervalFormView);

export default IntervalForm;

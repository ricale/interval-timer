import React from 'react';

import {
  compose,
  withStateHandlers,
  withHandlers,
  withProps,
  lifecycle,
} from 'lib/recompose';
import {Button, Icon, NumberInput} from 'components';

import './form.less';

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
  <div className={`it-interval-form${isEdit ? ' it-editing' : ''}`}>
    <div className='it-interval-form__row'>
      <input
          className='it-interval-form__str'
          value={name}
          onChange={e => onChangeName(e.target.value)}
          placeholder={defaultName}
          onKeyPress={onKeyPress}
          />
    </div>
    <div className='it-interval-form__row'>
      <NumberInput
          className='it-interval-form__number'
          type='number'
          max={99}
          min={0}
          value={hours}
          onChange={e => onChangeHours(e.target.value)}
          onKeyPress={onKeyPress}
          />
      <span className='it-interval-form__divider'>:</span>
      <NumberInput
          className='it-interval-form__number'
          type='number'
          min={0}
          max={59}
          value={minutes}
          onChange={e => onChangeMinutes(e.target.value)}
          onKeyPress={onKeyPress}
          />
      <span className='it-interval-form__divider'>:</span>
      <NumberInput
          className='it-interval-form__number'
          type='number'
          min={0}
          max={59}
          value={seconds}
          onChange={e => onChangeSeconds(e.target.value)}
          onKeyPress={onKeyPress}
          />
    </div>
    <div className='it-interval-form__row'>
      <Button
          onClick={onSubmit}
          primary={!isEdit}
          success={!!isEdit}
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
    </div>
  </div>
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

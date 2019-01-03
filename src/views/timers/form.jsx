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

const TimerFormView = ({
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
  onSubmit,
  onCancel,
}) => (
  <div className={`it-timer-form${isEdit ? ' it-editing' : ''}`}>
    <div className='it-timer-form__row'>
      <input
          className='it-timer-form__str'
          value={name}
          onChange={e => onChangeName(e.target.value)}
          placeholder={defaultName}
          />
    </div>
    <div className='it-timer-form__row'>
      <NumberInput
          className='it-timer-form__number'
          type='number'
          max={99}
          min={0}
          value={hours}
          onChange={e => onChangeHours(e.target.value)}
          />
      <span className='it-timer-form__divider'>:</span>
      <NumberInput
          className='it-timer-form__number'
          type='number'
          min={0}
          max={59}
          value={minutes}
          onChange={e => onChangeMinutes(e.target.value)}
          />
      <span className='it-timer-form__divider'>:</span>
      <NumberInput
          className='it-timer-form__number'
          type='number'
          min={0}
          max={59}
          value={seconds}
          onChange={e => onChangeSeconds(e.target.value)}
          />
    </div>
    <div className='it-timer-form__row'>
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

const TimerForm = compose(
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
    onSubmit: props => () => {
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
)(TimerFormView);

export default TimerForm;

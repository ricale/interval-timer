import React from 'react';

import {compose, withState} from 'lib/recompose';
import {Button, Icon, NumberInput} from 'components';

import './form.less';

const TimerFormView = ({
  name,
  hours,
  minutes,
  seconds,
  isValid,
  onChangeName,
  onChangeHours,
  onChangeMinutes,
  onChangeSeconds,
  onSubmit,
}) => (
  <div className='it-timer-form'>
    <div>
      <label>이름</label>
      <input className='it-timer-form__str' value={name} onChange={e => onChangeName(e.target.value)}/>
    </div>
    <div>
      <label>시간</label>
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
    <Button
        onClick={() => {
          if(!isValid || isValid({name, hours, minutes, seconds})) {
            onSubmit({name, hours, minutes, seconds});
          }
        }}>
      <Icon name='save'/>
    </Button>
  </div>
);

const TimerForm = compose(
  withState('name',    'onChangeName',    ''),
  withState('hours',   'onChangeHours',   0),
  withState('minutes', 'onChangeMinutes', 0),
  withState('seconds', 'onChangeSeconds', 0),
)(TimerFormView);

export default TimerForm;

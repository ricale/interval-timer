import React from 'react';

import {compose, withState} from '../../lib/recompose';

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
  <div>
    <div>
      <label>이름</label>
      <input value={name} onChange={e => onChangeName(e.target.value)}/>
    </div>
    <div>
      <label>시간</label>
      <input value={hours} onChange={e => onChangeHours(e.target.value)} /><label>시간</label>
      <input value={minutes} onChange={e => onChangeMinutes(e.target.value)} /><label>분</label>
      <input value={seconds} onChange={e => onChangeSeconds(e.target.value)} /><label>초</label>
    </div>
    <button onClick={() => {
      if(!isValid || isValid({name, hours, minutes, seconds})) {
        onSubmit({name, hours, minutes, seconds})
      }
    }}>저장</button>
  </div>
);

const TimerForm = compose(
  withState('name',    'onChangeName',    ''),
  withState('hours',   'onChangeHours',   0),
  withState('minutes', 'onChangeMinutes', 0),
  withState('seconds', 'onChangeSeconds', 0)
)(TimerFormView);

export default TimerForm;

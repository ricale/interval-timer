import React from 'react';

const TimerList = ({data = [], onDelete}) => (
  <div>
    {data.map((d,i) =>
      <div key={i}>
        <span>{d.name}</span>
        <span>{d.hours}</span>
        <span>{d.minutes}</span>
        <span>{d.seconds}</span>
        <button onClick={() => onDelete(d)}>삭제</button>
      </div>
    )}
  </div>
);

export default TimerList;

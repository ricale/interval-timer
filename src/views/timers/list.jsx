import React from 'react';

const TimerList = ({data = []}) => (
  <div>
    {data.map((d,i) =>
      <div key={i}>
        <span>{d.name}</span>
        <span>{d.hours}</span>
        <span>{d.minutes}</span>
        <span>{d.seconds}</span>
      </div>
    )}
  </div>
);

export default TimerList;

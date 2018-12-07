import React, {Component} from 'react';

import {PLAY_STATE} from 'constants';

const TimerView = ({
  data,
  playState,
  onStart,
  onStop,
  onPause,
  onResume,
  onDone
}) => (
  <div>
    <div>data: {JSON.stringify(data)}</div>
    <div>playState: {playState}</div>
    <button onClick={() => onStart()}>Start</button>
    <button onClick={() => onStop()}>Stop</button>
    <button onClick={() => onPause()}>Pause</button>
    <button onClick={() => onResume()}>Resume</button>
    <button onClick={() => onDone()}>Done</button>
  </div>
);

const Timer = TimerView;

export default Timer;

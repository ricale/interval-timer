import { useSetRecoilState } from "recoil";

import { PLAY_STATE, timerState } from "./atom";

function getStartTime(oldStartTime: null | number, oldPauseTime: null | number) {
  const now = new Date().getTime();
  if(!oldPauseTime) {
    return now;
  }
  return (oldStartTime ?? 0) + (now - oldPauseTime);
}

export default function useSetTimerState() {
  const setState = useSetRecoilState(timerState);

  const start = () => setState((old) => {
    if(old.playState === PLAY_STATE.PLAYING) {
      return old;
    }
    return {
      ...old,
      playState: PLAY_STATE.PLAYING,
      startTime: getStartTime(old.startTime, old.pauseTime),
      pauseTime: null,
    }
  });

  const stop = () => setState((old) => {
    if(old.playState === PLAY_STATE.IDLE) {
      return old;
    }
    return {
      ...old,
      playState: PLAY_STATE.IDLE,
      alarming: false,
      current: 0,
      startTime: null,
      pauseTime: null,
    };
  });

  const pause = () => setState((old) => {
    if(old.playState !== PLAY_STATE.PLAYING) {
      return old;
    }
    return {
      ...old,
      playState: PLAY_STATE.PAUSE,
      alarming: false,
      pauseTime: new Date().getTime(),
    };
  })

  const ringAlarm = () => setState((old) => {
    return { ...old, alarming: true };
  });

  const stopAlarm = () => setState((old) => {
    return { ...old, alarming: false };
  });

  const goToNext = () => setState((old) => {
    return {
      ...old,
      currentIntervalIndex: old.currentIntervalIndex + 1,
      alarming: false,
      startTime: (
        old.playState === PLAY_STATE.PLAYING
          ? new Date().getTime()
          : null
      ),
      pauseTime: null,
    };
  });

  return {
    start,
    stop,
    pause,
    ringAlarm,
    stopAlarm,
    goToNext,
  };
}

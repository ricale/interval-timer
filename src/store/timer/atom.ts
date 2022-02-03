import { atom } from "recoil";

export type TimerState = {
  playState: 'IDLE' | 'PLAYING' | 'PAUSE'
  alarming: boolean
  currentIntervalIndex: number
  startTime: null | number
  pauseTime: null | number
}
export const PLAY_STATE: {
  IDLE: 'IDLE'
  PLAYING: 'PLAYING'
  PAUSE: 'PAUSE'
} = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  PAUSE: 'PAUSE',
}
export const timerState = atom<TimerState>({
  key: 'timer',
  default: {
    playState: PLAY_STATE.IDLE,
    alarming: false,
    currentIntervalIndex: 0,
    startTime: null,
    pauseTime: null,
  }
});

import { atom, AtomEffect } from "recoil";
import { v4 as uuidv4} from 'uuid';

import { getMilliseconds } from "utils";


export type Interval = {
  id: string
  name?: string
  hours: number
  minutes: number
  seconds: number
  ms: number
}
type IntervalsState = Interval[]

const localStorageEffect: (key: string) => AtomEffect<IntervalsState> = (key: string) =>
({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key);
  if(savedValue) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue))
  });
}

export const intervalsState = atom<IntervalsState>({
  key: 'intervals',
  default: [
    {
      id: uuidv4(),
      hours: 0,
      minutes: 25,
      seconds: 0,
      ms: getMilliseconds(0, 25),
    },
    {
      id: uuidv4(),
      hours: 0,
      minutes: 5,
      seconds: 0,
      ms: getMilliseconds(0, 5),
    }
  ],
  effects: [
    localStorageEffect('currentUser')
  ]
});

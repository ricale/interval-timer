import { atom } from "recoil";
import { getMilliseconds } from "utils";
import { v4 as uuidv4} from 'uuid';

export type Interval = {
  id: string
  name?: string
  hours: number
  minutes: number
  seconds: number
  ms: number
}
type IntervalsState = Interval[]

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
  ]
});

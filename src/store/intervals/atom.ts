import { atom } from "recoil";
import { getMilliseconds } from "utils";
import { v4 as uuidv4} from 'uuid';

export type Interval = {
  id: string
  name?: string
  ms: number
}
type IntervalsState = Interval[]

export const intervalsState = atom<IntervalsState>({
  key: 'intervals',
  default: [
    {
      id: uuidv4(),
      ms: getMilliseconds(0, 30),
    },
    {
      id: uuidv4(),
      ms: getMilliseconds(0, 5),
    }
  ]
});

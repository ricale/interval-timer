import { selector } from "recoil";
import { getHMS } from "utils";

import { Interval, intervalsState } from "./intervals/atom";
import { timerState } from "./timer/atom";

export type IntervalDetail = Interval & {
  index: number
}

export const timerAndIntervalsState = selector({
  key: 'timerAndIntervals',
  get: ({get}) => {
    const timer = get(timerState);
    const intervals = get(intervalsState);
    const intervalsWithIndex: IntervalDetail[] = intervals.map((interval, i) => ({
      ...interval,
      index: i,
    }));
    const index = timer.currentIntervalIndex % intervals.length;

    return {
      timer,
      intervals: intervalsWithIndex,
      index,
      currentInterval: intervals[index],
    }
  }
})

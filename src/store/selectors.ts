import { selector } from "recoil";
import { getHMS } from "utils";

import { Interval, intervalsState } from "./intervals/atom";
import { timerState } from "./timer/atom";

type IntervalDetail = Interval & {
  index: number
  hours: number
  minutes: number
  seconds: number
}

export const timerAndIntervalsState = selector({
  key: 'timerAndIntervals',
  get: ({get}) => {
    const timer = get(timerState);
    const intervals = get(intervalsState);
    const intervalsWithIndex: IntervalDetail[] = intervals.map((interval, i) => ({
      ...interval,
      index: i,
      ...getHMS(interval.ms)
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

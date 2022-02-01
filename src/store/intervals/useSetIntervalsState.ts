import { useSetRecoilState } from "recoil";

import { getHMS, getMilliseconds } from "utils";

import { Interval, intervalsState } from "./atom";

export default function useSetIntervalsState() {
  const setState = useSetRecoilState(intervalsState); 

  const createInterval = (interval: Interval) => {
    setState((old) => [ ...old, interval ]);
  };
  const updateInterval = (interval: Interval) => {
    setState((old) => old.map(item => {
      if(item.id !== interval.id) {
        return item;
      }

      const clockValueChanged = (
        item.hours !== interval.hours
        || item.minutes !== interval.minutes
        || item.seconds !== interval.seconds
      );
      const msChanged = item.ms !== interval.ms;

      if(msChanged) {
        return { ...interval, ...getHMS(interval.ms) };
      }

      if(clockValueChanged && !msChanged) {
        return {
          ...interval,
          ms: getMilliseconds(
            interval.hours,
            interval.minutes,
            interval.seconds
          )
        };
      }

      return interval;
    }));
  };
  const deleteInterval = (id: string) => {
    setState((old) =>
      old.filter(item => item.id !== id)
    );
  };

  return {
    createInterval,
    updateInterval,
    deleteInterval,
  }
}
import { useSetRecoilState } from "recoil";

import { Interval, intervalsState } from "./atom";

export default function useSetIntervalState() {
  const setState = useSetRecoilState(intervalsState); 

  const createInterval = (interval: Interval) => {
    setState((old) =>
      [ ...old, interval ]
    );
  };
  const updateInterval = (interval: Interval) => {
    setState((old) =>
      old.map(item => item.id === interval.id ? interval : item)
    );
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
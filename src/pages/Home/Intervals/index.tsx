import { useRecoilValue } from "recoil";

import { Row } from 'components';
import { PLAY_STATE, timerAndIntervalsState, useSetIntervalsState } from "store";

import IntervalItem from "./IntervalItem";

function Intervals() {
  const {
    timer: { playState },
    index,
    intervals,
  } = useRecoilValue(timerAndIntervalsState);
  const actions = useSetIntervalsState();
  const list = [...intervals.slice(index), ...intervals.slice(0, index)];

  return (
    <Row gap={1} justifyContent='flex-start'>
      {list.map(item =>
        <IntervalItem
          key={item.id}
          item={item}
          editable={playState === PLAY_STATE.IDLE}
          onChange={changed => actions.updateInterval(changed)}
          />
      )}
    </Row>
  )
}

export default Intervals;

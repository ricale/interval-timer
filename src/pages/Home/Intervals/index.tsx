import { useRecoilValue } from "recoil";

import { Box } from 'components';
import { PLAY_STATE, timerAndIntervalsState, useSetIntervalsState } from "store";

import IntervalItem from "./IntervalItem";

type IntervalsProps = {
  vertical?: boolean
}
function Intervals({
  vertical,
}: IntervalsProps) {
  const {
    timer: { playState },
    index,
    intervals,
  } = useRecoilValue(timerAndIntervalsState);
  const actions = useSetIntervalsState();
  // const list = [...intervals.slice(index), ...intervals.slice(0, index)];
  const list = intervals;

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        justifyContent: vertical ? 'flex-start' : 'center',
        gap: 1,
        paddingBottom: 1,
      }}>
      {list.map((item, i) =>
        <IntervalItem
          key={item.id}
          item={item}
          active={playState !== PLAY_STATE.IDLE && index === i}
          editable={playState === PLAY_STATE.IDLE}
          onChange={changed => actions.updateInterval(changed)}
          />
      )}
    </Box>
  )
}

export default Intervals;

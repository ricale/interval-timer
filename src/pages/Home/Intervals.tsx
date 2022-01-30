import { useRecoilValue } from "recoil";

import { Card, CardContent, CardHeader, Row, TextField } from 'components';
import { timerAndIntervalsState } from "store";
import { fillWithZero } from "utils";

function Intervals() {
  const { index, intervals } = useRecoilValue(timerAndIntervalsState);
  const list = [...intervals.slice(index), ...intervals.slice(0, index)];

  return (
    <Row gap={1}>
      {list.map(item =>
        <Card>
          <CardHeader
            subheader={`#${item.index + 1}`}
            />
          <CardContent>
            <Row gap={1} alignItems='center'>
              <TextField
                label=''
                variant='standard'
                value={fillWithZero(item.hours)}
                sx={{ '& input': {textAlign: 'center'}}}
                />
              <span>:</span>
              <TextField
                label=''
                variant='standard'
                value={fillWithZero(item.minutes)}
                sx={{ '& input': {textAlign: 'center'}}}
                />
              <span>:</span>
              <TextField
                label=''
                variant='standard'
                value={fillWithZero(item.seconds)}
                sx={{ '& input': {textAlign: 'center'}}}
                />
            </Row>
          </CardContent>
        </Card>
      )}
    </Row>
  )
}

export default Intervals;

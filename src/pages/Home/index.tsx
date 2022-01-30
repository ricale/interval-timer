import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Grid, ToggleButton, Icon, Collapse } from 'components';
import { PLAY_STATE, timerAndIntervalsState } from 'store';

import Controller from './Controller';
import Clock from './Clock';
import Intervals from './Intervals';

function HomePage() {
  const {
    timer,
    currentInterval: { ms },
    index,
  } = useRecoilValue(timerAndIntervalsState)
  const [timestamp, setTimestamp] = useState<number>();
  const [showIntervalList, setShowIntervalList] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if(timer.playState === PLAY_STATE.PLAYING) {
      intervalId = setInterval(() => {
        setTimestamp(new Date().getTime() - (timer.startTime ?? 0));
      }, 100);

    } else if(timer.playState === PLAY_STATE.IDLE) {
      setTimestamp(undefined);
    }
    return () => {
      if(intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [timer.playState, timer.currentIntervalIndex]);

  return (
    <Grid container justifyContent='center' sx={{height: '100%'}}>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Clock
          ms={ms - (timestamp ?? 0)}
          index={index}
          sx={{ height: '50%'}}
          />
        <Controller>
          <ToggleButton
            value='list'
            sx={{ border: 0 }}
            selected={showIntervalList}
            onClick={() => setShowIntervalList(it => !it)}>
            <Icon name='List' />
          </ToggleButton>
        </Controller>
        <Collapse in={showIntervalList}>
          <Intervals />
        </Collapse>
      </Grid>
    </Grid>
  )
}

export default HomePage;

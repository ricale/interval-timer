import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Grid, ToggleButton, Icon, Collapse } from 'components';
import { PLAY_STATE, timerAndIntervalsState, useSetTimerState } from 'store';
import { useAlarmNotification } from 'utils';

import Controller from './Controller';
import Clock from './Clock';
import Intervals from './Intervals';

function HomePage() {
  const {
    timer,
    currentInterval,
    index,
  } = useRecoilValue(timerAndIntervalsState)
  const [timestamp, setTimestamp] = useState(currentInterval.ms);
  const [showIntervalList, setShowIntervalList] = useState(true);
  const actions = useSetTimerState();

  useAlarmNotification();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if(timer.playState === PLAY_STATE.PLAYING) {
      let prevTimestamp = timestamp;
      intervalId = setInterval(() => {
        const newTimestamp = currentInterval.ms - (new Date().getTime() - (timer.startTime ?? 0));
        if((prevTimestamp ?? 0) > 0 && newTimestamp < 0) {
          actions.ringAlarm();
        }
        setTimestamp(newTimestamp);
        prevTimestamp = newTimestamp;
      }, 100);

    } else if(timer.playState === PLAY_STATE.IDLE) {
      setTimestamp(currentInterval.ms);
    }
    return () => {
      if(intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [timer.playState, currentInterval]);

  return (
    <Grid container justifyContent='center' sx={{height: '100%'}}>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Clock
          percent={(timestamp / currentInterval.ms) * 100}
          ms={timestamp}
          index={index}
          living={timer.playState !== PLAY_STATE.IDLE}
          sx={{ height: '50%', width: '100%' }}
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

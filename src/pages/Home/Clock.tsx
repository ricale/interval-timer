import { useEffect, useState } from 'react';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { useRecoilValue } from 'recoil';

import { Box, Paper, Typography } from 'components';
import { PLAY_STATE, timerAndIntervalsState, useSetTimerState } from 'store';
import { fillWithZero, getHMS } from 'utils';

type ClockProps = {
  sx?: SxProps<Theme>
}
function Clock({
  sx,
}: ClockProps) {
  const {
    timer,
    currentInterval,
    index,
  } = useRecoilValue(timerAndIntervalsState)
  const [timestamp, setTimestamp] = useState(currentInterval.ms);

  const actions = useSetTimerState();

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

  const { negative, hours, minutes, seconds } = getHMS(timestamp);
  const percent = (timestamp / currentInterval.ms) * 100;
  const living = timer.playState !== PLAY_STATE.IDLE;
  return (
    <Paper
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        border: living ? 2 : undefined,
        borderColor: 'primary.dark',
        ...sx
      }}>
      {living && 
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '100%',
            borderRadius: 0,
            backgroundColor: 'primary.dark',
          }}
          style={{
            top: `${Math.max(percent, 0).toFixed(1)}%`,
          }}
          />
      }
      <Typography
        variant='h3'
        component='p'
        sx={{
          position: 'relative',
          color: negative ? 'warning.main' : undefined,
        }}>
        {`${fillWithZero(hours)}:${fillWithZero(minutes)}:${fillWithZero(seconds)}`}
      </Typography>
      {index !== undefined &&
        <Typography
          variant='body1'
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 0.5,
            color: 'neutral.dark'
          }}>
          {`#${index + 1}`}
        </Typography>
      }
    </Paper>
  )
}

export default Clock;

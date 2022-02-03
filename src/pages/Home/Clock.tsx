import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { Box, Paper, Typography } from 'components';
import { fillWithZero, getHMS } from 'utils';

type ClockProps = {
  percent: number
  ms: number
  living: boolean
  index?: number
  sx?: SxProps<Theme>
}
function Clock({
  percent,
  ms,
  living,
  index,
  sx,
}: ClockProps) {
  const { negative, hours, minutes, seconds } = getHMS(ms);
  return (
    <Paper
      // elevation={3}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        overflow: 'hidden',
        border: living ? 4 : undefined,
        borderColor: 'primary.dark',
        ...sx
      }}>
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

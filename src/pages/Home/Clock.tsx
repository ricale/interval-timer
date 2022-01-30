import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { Paper, Typography } from 'components';
import { fillWithZero, getHMS } from 'utils';

type ClockProps = {
  ms: number
  index?: number
  sx?: SxProps<Theme>
}
function Clock({
  ms,
  index,
  sx,
}: ClockProps) {
  const { hours, minutes, seconds } = getHMS(ms);
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
        ...sx
      }}>
      <Typography variant='h3' component='p'>
        {`${fillWithZero(hours)}:${fillWithZero(minutes)}:${fillWithZero(seconds)}`}
      </Typography>
      {index !== undefined &&
        <Typography
          variant='body1'
          sx={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            margin: 0.5,
          }}>
          {`#${index + 1}`}
        </Typography>
      }
    </Paper>
  )
}

export default Clock;

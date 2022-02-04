import { useState } from 'react';

import { Grid, ToggleButton, Icon, Collapse, Box } from 'components';
import { useAlarmNotification } from 'utils';

import Controller from './Controller';
import Clock from './Clock';
import Intervals from './Intervals';

function HomePage() {
  const [showIntervalList, setShowIntervalList] = useState(false);

  useAlarmNotification();

  return (
    <Grid container sx={{height: '100%'}}>
      <Grid item xs={0} md={3} lg={4} />
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Box
          sx={{
            flex: 1,
            paddingTop: { md: 1 },
          }}>
          <Clock />
        </Box>
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

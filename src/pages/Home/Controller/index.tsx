import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

import { PLAY_STATE, timerState, useSetTimerState } from "store";
import { Box, Collapse } from 'components';

import ControllerButton from "./ControllerButton";

type ControllerProps = {
  children?: ReactNode
}
function Controller({
  children,
}: ControllerProps) {
  const { playState, alarming } = useRecoilValue(timerState);
  const actions = useSetTimerState();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0.5,
        marginBottom: 0.5,
        paddingTop: 0.5,
        paddingBottom: 0.5,
        gap: 0.5,
      }}>
      <ControllerButton
        iconName='PlayArrow'
        disabled={playState === PLAY_STATE.PLAYING}
        onClick={actions.start}
        />
      <ControllerButton
        iconName='Pause'
        disabled={playState !== PLAY_STATE.PLAYING}
        onClick={actions.pause}
        />
      <ControllerButton
        iconName='Stop'
        disabled={playState === PLAY_STATE.IDLE}
        onClick={actions.stop}
        />
      <ControllerButton
        iconName='SkipNext'
        onClick={actions.goToNext}
        />

      <Collapse
        in={alarming}
        collapsedSize={0}
        orientation='horizontal'>
        <ControllerButton
          iconName='NotificationsOff'
          onClick={actions.stopAlarm}
          />
      </Collapse>

      {children}
    </Box>
  )
}

export default Controller;

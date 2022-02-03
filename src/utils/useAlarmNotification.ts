import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { timerState } from "store";

import AlarmSound from "./AlarmSound";

const SOUND = new AlarmSound();
const NOTI_SENTENCE = 'Ring Ring Ring Ring';

function useAlarmNotification() {
  const { alarming } = useRecoilValue(timerState);

  useEffect(() => {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, [])

  useEffect(() => {
    if(alarming) {
      SOUND.play();
      if(Notification.permission === 'granted') {
        new Notification(NOTI_SENTENCE);
      }
    } else {
      SOUND.stop();
    }
  }, [alarming])
}

export default useAlarmNotification;

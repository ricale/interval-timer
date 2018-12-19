import alarmSound from 'public/sounds/alarm.mp3';

const audio = new Audio(alarmSound);
audio.loop = true;

export default {
  play: () => audio.play(),
  stop: () => audio.pause(),
};

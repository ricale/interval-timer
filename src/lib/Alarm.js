import alarmSound from 'public/sounds/alarm.mp3';

const NOTI_INTERVAL_DURATION = 10000;
const NOTI_SENTENCE = 'Ring Ring Ring Ring';

const m = {
  audio: new Audio(alarmSound),
  notiInterval: null,
  store: undefined,
  prevState: {},
};

function subscribeStore () {
  const state = getState();

  if(state.alarming !== m.prevState.alarming) {
    if(state.ringable) {
      state.alarming ? playSound() : stopSound();
    }

    if(state.alarming) {
      showNoti();
      m.notiInterval = setInterval(showNoti, NOTI_INTERVAL_DURATION);

    } else {
      m.notiInterval && clearInterval(m.notiInterval);
    }
  }

  m.prevState = state;
}

function init (store) {
  m.store = store;
  m.store.subscribe(subscribeStore);

  if (Notification.permission !== 'denied') {
    Notification.requestPermission();
  }
}

function getState () {
  const {config: {ringable}, timer: {alarming}} = m.store.getState();
  return {ringable, alarming};
}

function showNoti () {
  new Notification(NOTI_SENTENCE);
}

function playSound () {
  m.audio.play();
}

function stopSound () {
  m.audio.pause();
  if(m.audio.fastSeek) {
    m.audio.fastSeek();
  } else {
    m.audio.currentTime = 0;
  }
}

export default {init};

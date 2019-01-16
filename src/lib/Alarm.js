import alarmSound from 'public/sounds/alarm.mp3';

const m = {
  audio: new Audio(alarmSound),
  store: undefined,
  prevState: {},
};

function subscribeStore () {
  const state = getState();

  if(state.ringable) {
    if(state.alarming !== m.prevState.alarming) {
      state.alarming ? play() : stop();
    }
  }

  m.prevState = state;
}

function init (store) {
  m.store = store;
  m.store.subscribe(subscribeStore);
}

function getState () {
  const {config: {ringable}, timer: {alarming}} = m.store.getState();
  return {ringable, alarming};
}

function play () {
  m.audio.play();
}

function stop () {
  m.audio.pause();
  if(m.audio.fastSeek) {
    m.audio.fastSeek();
  } else {
    m.audio.currentTime = 0;
  }
}

const methods = {
  init,
  getState,
  play,
  stop,
};

export default methods;

class AlarmSound {
  private audio: HTMLAudioElement
  constructor() {
    this.audio = new Audio(`${process.env.PUBLIC_URL}/sounds/alarm.mp3`);
  }

  play() {
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    if(!!this.audio.fastSeek) {
      this.audio.fastSeek(0);
    } else {
      this.audio.currentTime = 0;
    }
  }
}

export default AlarmSound;

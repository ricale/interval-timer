export default function getHMS(ms: number) {
  // const absVal = Math.abs(ms);
  const totalSeconds = Math.ceil(ms / 1000);
  const milliseconds = ms % 1000;
  const seconds = Math.abs(totalSeconds % 3600 % 60);
  const minutes = parseInt(`${Math.abs(totalSeconds % 3600 / 60)}`, 10);
  const hours = parseInt(`${Math.abs(totalSeconds / 3600)}`, 10);
  return {
    negative: ms < 0,
    hours,
    minutes,
    seconds,
    milliseconds,
  }
}
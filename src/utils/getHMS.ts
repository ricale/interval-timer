export default function getHMS(ms: number) {
  const totalSeconds = parseInt(`${ms / 1000}`, 10);
  const hours = parseInt(`${totalSeconds / 3600}`, 10);
  const minutes = parseInt(`${totalSeconds % 3600 / 60}`, 10);
  const seconds = parseInt(`${totalSeconds % 3600 % 60}`, 10);
  return {
    hours,
    minutes,
    seconds,
  }
}
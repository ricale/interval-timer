export default function getDuringTimeFromTimestamp (timestamp, showMilliseconds = false) {
  const totalSeconds = (
    showMilliseconds ?
      parseInt(timestamp / 1000, 10) :
      Math.ceil(timestamp / 1000)
  );

  const absSeconds = Math.abs(totalSeconds);

  return {
    hours:        parseInt(absSeconds / 3600, 10)      || 0,
    minutes:      parseInt(absSeconds % 3600 / 60, 10) || 0,
    seconds:      parseInt(absSeconds % 60, 10)        || 0,
    milliseconds: Math.abs(timestamp) % 1000 || 0,
  };
}

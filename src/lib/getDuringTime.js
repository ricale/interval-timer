import fillWithZero from './fillWithZero';

function getDuringTimeString (data, o = {}) {
  const {showHour, showMilliseconds} = o;

  let result = `${fillWithZero(data.minutes)}:${fillWithZero(data.seconds)}`;
  if(showHour) {
    result = `${fillWithZero(data.hours)}:${result}`;
  }
  if(showMilliseconds) {
    result = `${result}:${fillWithZero(data.milliseconds, 3)}`;
  }
  return result;
}

export default function getDuringTime (timestamp, o = {}) {
  const {showMilliseconds, rounding, toString} = o;

  let totalSeconds;
  if(rounding === 'roundUp') {
    totalSeconds = Math.ceil(timestamp / 1000);
  } else if(rounding === 'roundDown') {
    totalSeconds = Math.floor(timestamp / 1000);
  } else {
    totalSeconds = Math.round(timestamp / 1000);
  }

  const absSeconds = Math.abs(totalSeconds);

  const result = {
    hours:        parseInt(absSeconds / 3600, 10)      || 0,
    minutes:      parseInt(absSeconds % 3600 / 60, 10) || 0,
    seconds:      parseInt(absSeconds % 60, 10)        || 0,
    milliseconds: Math.abs(timestamp) % 1000 || 0,
  };

  if(!toString) {
    return result;
  }

  return getDuringTimeString(result, {
    showHour: absSeconds >= 60 * 60,
    showMilliseconds,
  });
}

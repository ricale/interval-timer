// NOTE: 두 자리 수만 염두에 둔다.
function getFieldValue(field: 'hours' | 'minutes' | 'seconds', value: string) {
  const sliced = value.slice(-2);
  const val = isNaN(+sliced) ? 0 : +sliced;
  const min = 0;
  const max = field === 'hours' ? 99 : 59;

  if(max < val) {
    return Math.floor(max / 10) * 10 + val % 10;
  }
  return Math.max(val, min);
}

export default getFieldValue;

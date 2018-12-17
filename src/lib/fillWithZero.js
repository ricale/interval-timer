export default function fillWithZero (number, digit = 2) {
  const tens = Math.pow(10, digit - 1);

  let result = `${number}`;
  while(result.length < `${tens}`.length) {
    result = `0${result}`
  }

  return result;
}

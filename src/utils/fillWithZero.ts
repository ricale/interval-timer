export default function fillWithZero(n: number, digit = 2) {
  const str = `${n}`;
  if(str.length >= digit) {
    return str;
  }
  return `${'0'.repeat(digit - str.length)}${str}`
}

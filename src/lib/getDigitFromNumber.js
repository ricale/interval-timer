export default function getDigitFromNumber (n) {
  let digit = 1;
  while(n >= 10) {
    n /= 10;
    digit += 1;
  }
  return digit;
}

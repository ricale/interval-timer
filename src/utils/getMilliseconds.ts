export default function getMilliseconds(
  hours: number,
  minutes?: number,
  seconds?: number,
) {
  return (
    hours * 60 * 60 * 1000
    + (minutes ?? 0) * 60 * 1000
    + (seconds ?? 0) * 1000
  );
}
/**
 *
 * @param max - the maximum number
 * @param min - the minimum number
 * @example
 * calPercentDiff(10,20) => 50
 */
export const calPercentDiff = (max: number, min: number) =>
  (Math.abs(max - min) / min) * 100;

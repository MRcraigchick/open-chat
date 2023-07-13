import { convertTimeStringToMilliseconds } from './time-util';

/**
 * A runtime loop for running tasks at certain intervals.
 *
 * @param {Function} cb - The callback function to be executed on every turn of the loop
 *
 * @param {string} timeString - Time string representing the interval between every loop
 * - ms = milliseconds
 * - s = seconds
 * - m = minutes
 * - h = hours
 * - D = days
 * - M = months
 * - Y = years
 *
 * @throws {Error} If the time string format is invalid or the time unit is invalid.
 */

export default function runtimeLoop(cb, timeString) {
  return setInterval(cb, convertTimeStringToMilliseconds(timeString));
}

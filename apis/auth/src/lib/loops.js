import { convertTimeStringToMilliseconds } from './time-util';

export default function runTimeLoop(cb, timeString) {
  return setInterval(cb, convertTimeStringToMilliseconds(timeString));
}

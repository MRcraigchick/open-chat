export function convertTimeStringToMilliseconds(timeString) {
  const regex = /^(\d+)(ms|s|m|h|D|M|Y)$/;

  const match = timeString.match(regex);
  if (!match) {
    throw new Error(
      'Invalid time string format. Please use a valid format, e.g., "5s" for 5 seconds.'
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 'ms':
      return value;
    case 's':
      return value * 1000;
    case 'm':
      return value * 1000 * 60;
    case 'h':
      return value * 1000 * 60 * 60;
    case 'D':
      return value * 1000 * 60 * 60 * 24;
    case 'M':
      return value * 1000 * 60 * 60 * 24 * 30; // Approximation for 30 days
    case 'Y':
      return value * 1000 * 60 * 60 * 24 * 365; // Approximation for 365 days
    default:
      throw new Error(
        'Invalid time unit. Please use a valid unit, e.g., "ms", "s", "m", "h", "D", "M", or "Y".'
      );
  }
}

export function dollarsToCents(dollars?: number | string): number {
  return !dollars ? 0 : Number((Number(dollars) * 100).toFixed());
}

export function centsToDollars(cents?: number | string): number {
  return !cents ? 0 : Number((Number(cents) / 100).toFixed(2));
}

export function metersToMiles(meters?: number): number | undefined {
  if (meters === undefined) return;

  const milesPerMeter = 0.000621371;
  return meters * milesPerMeter;
}

export function formatDistance(val?: number | string): string {
  const num = Number(Number(val).toFixed(1));
  if (isNaN(num)) return '';

  if (num < 0.1) {
    return '.1';
  } else if (num > 0 && num < 1) {
    return String(num).substring(1);
  } else {
    return String(num);
  }
}

export function formatAppVersionToNumber(ver: string): number {
  const [major = 0, minor = 0, patch = 0] = ver.split('.').map(item => Number(item) || 0);

  return major * 1000000 + minor * 10000 + patch * 100;
}

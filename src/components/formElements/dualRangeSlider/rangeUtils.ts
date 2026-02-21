export const clampNumberToRange = (
  value: number,
  lowerBound: number,
  upperBound: number,
) => Math.min(upperBound, Math.max(lowerBound, value));

export const parseFiniteNumberOrNull = (rawValue: string) => {
  if (rawValue.trim() === '') {
    return null;
  }

  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

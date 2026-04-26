import { useEffect, useState } from 'react';

interface UseDebouncedValueOptions {
  delay?: number;
}

export const useDebouncedValue = <T>(
  value: T,
  { delay = 500 }: UseDebouncedValueOptions = {},
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};

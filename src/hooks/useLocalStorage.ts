import { useEffect, useState } from 'react';

const useLocalStorage = <T>(storageKey: string, fallbackState: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(storageKey);
      return storedValue ? (JSON.parse(storedValue) as T) : fallbackState;
    } catch {
      return fallbackState;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue] as const;
};

export default useLocalStorage;

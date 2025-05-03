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

export const localStorageKeys = {
  lang: 'lang',
  currency: 'currency',
  currencyApiError: 'currency_api_error',
  tableCellPadding: 'padding',
  menuCollapsed: 'menuCollapsed',
};

export default useLocalStorage;

import { ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { localStorageKeys } from '../../hooks/useLocalStorage';
import { setRates } from './currencySlice';
import { useGetExchangeRatesQuery } from './exchangeRatesApiSlice';

const oneDay = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  // Check if an error was previously stored
  const [shouldFetch, setShouldFetch] = useState(
    () => !localStorage.getItem(localStorageKeys.currencyApiError), // If error exists, don't fetch
  );

  const {
    data: currency,
    isLoading,
    error,
  } = useGetExchangeRatesQuery(undefined, {
    pollingInterval: shouldFetch ? oneDay : undefined,
    skip: !shouldFetch, // Stop fetching when shouldFetch is false
    skipPollingIfUnfocused: true,
  });

  // Effect to store exchange rates when data is available
  useEffect(() => {
    if (currency?.data) {
      const rates = Object.fromEntries(
        Object.entries(currency.data).map(([currency, value]) => [
          currency,
          (value as { value: number }).value,
        ]),
      );

      dispatch(setRates(rates));
      localStorage.removeItem(localStorageKeys.currencyApiError); // Reset error state if successful
    }
  }, [currency, dispatch]);

  // Effect to stop fetching & store error in localStorage
  useEffect(() => {
    if (error) {
      dispatch(setRates({ DKK: 1 })); // Fallback to DKK
      localStorage.setItem(localStorageKeys.currencyApiError, 'true'); // Store error flag
      setShouldFetch(false); // Stop future requests
    }
  }, [error, dispatch]);

  if (isLoading) {
    return <p>Loading exchange rates...</p>;
  }

  return children;
};

export default CurrencyProvider;

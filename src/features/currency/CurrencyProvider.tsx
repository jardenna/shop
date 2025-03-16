import { FC, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setRates } from './currencySlice';
import { useGetExchangeRatesQuery } from './exchangeRatesApiSlice';

interface CurrencyProviderProps {
  children: ReactNode;
}

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
const ERROR_STORAGE_KEY = 'currency_api_error'; // Key for localStorage

const CurrencyProvider: FC<CurrencyProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  // Check if an error was previously stored
  const [shouldFetch, setShouldFetch] = useState(
    () => !localStorage.getItem(ERROR_STORAGE_KEY), // If error exists, don't fetch
  );

  const {
    data: currency,
    isLoading,
    error,
  } = useGetExchangeRatesQuery(undefined, {
    pollingInterval: shouldFetch ? TWENTY_FOUR_HOURS : undefined,
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
      localStorage.removeItem(ERROR_STORAGE_KEY); // Reset error state if successful
    }
  }, [currency, dispatch]);

  // Effect to stop fetching & store error in localStorage
  useEffect(() => {
    if (error) {
      dispatch(setRates({ DKK: 1 })); // Fallback to DKK
      localStorage.setItem(ERROR_STORAGE_KEY, 'true'); // Store error flag
      setShouldFetch(false); // Stop future requests
    }
  }, [error, dispatch]);

  if (isLoading) {
    return <p>Loading exchange rates...</p>;
  }

  return children;
};

export default CurrencyProvider;

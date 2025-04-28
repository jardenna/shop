import { ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import SkeletonList from '../../components/skeleton/SkeletonList';
import { localStorageKeys } from '../../hooks/useLocalStorage';
import { currencyCacheKey, oneDay } from '../../utils/utils';
import { setRates } from './currencySlice';
import { useGetExchangeRatesQuery } from './exchangeRatesApiSlice';

const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  const [shouldFetch, setShouldFetch] = useState(() => {
    const cached = localStorage.getItem(currencyCacheKey);
    const error = localStorage.getItem(localStorageKeys.currencyApiError);

    if (error) {
      return false;
    }
    if (cached) {
      const { timestamp, rates } = JSON.parse(cached);
      const isFresh = Date.now() - timestamp < oneDay;
      if (isFresh) {
        dispatch(setRates(rates));
        return false; // skip fetching
      }
    }
    return true; // fetch if no valid cache
  });

  const {
    data: currency,
    isLoading,
    error,
  } = useGetExchangeRatesQuery(undefined, {
    pollingInterval: shouldFetch ? oneDay : undefined,
    skip: !shouldFetch,
    skipPollingIfUnfocused: true,
  });

  useEffect(() => {
    if (currency?.data) {
      const rates = Object.fromEntries(
        Object.entries(currency.data).map(([currency, value]) => [
          currency,
          (value as { value: number }).value,
        ]),
      );

      dispatch(setRates(rates));
      localStorage.setItem(
        currencyCacheKey,
        JSON.stringify({ timestamp: Date.now(), rates }),
      );
      localStorage.removeItem(localStorageKeys.currencyApiError);
    }
  }, [currency, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setRates({ DKK: 1 }));
      localStorage.setItem(localStorageKeys.currencyApiError, 'true');
      setShouldFetch(false);
    }
  }, [error, dispatch]);

  if (isLoading) {
    return <SkeletonList />;
  }

  return children;
};

export default CurrencyProvider;

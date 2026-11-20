import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { localStorageKeys } from '../../hooks/useLocalStorage';
import { currencyCacheKey, oneDay } from '../../utils/utils';
import { setRates } from './currencySlice';
import { useGetExchangeRatesQuery } from './exchangeRatesApiSlice';

const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  const [cache] = useState(() => {
    const cached = localStorage.getItem(currencyCacheKey);
    const error = localStorage.getItem(localStorageKeys.currencyApiError);

    if (error) {
      return { shouldFetch: false, rates: null };
    }

    if (cached) {
      const { timestamp, rates } = JSON.parse(cached);
      const isFresh = Date.now() - timestamp < oneDay;

      if (isFresh) {
        return { shouldFetch: false, rates };
      }
    }

    return { shouldFetch: true, rates: null };
  });

  const { data: currency, error } = useGetExchangeRatesQuery(undefined, {
    pollingInterval: cache.shouldFetch ? oneDay : undefined,
    skip: !cache.shouldFetch,
    skipPollingIfUnfocused: true,
  });

  useEffect(() => {
    if (cache.rates) {
      dispatch(setRates(cache.rates));
    }
  }, [cache.rates, dispatch]);

  useEffect(() => {
    if (currency?.data) {
      const rates = Object.fromEntries(
        Object.entries(currency.data).map(([currency, value]) => [
          currency,
          value.value,
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
    }
  }, [error, dispatch]);

  return children;
};

export default CurrencyProvider;

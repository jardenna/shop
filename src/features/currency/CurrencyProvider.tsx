import { FC, ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setRates } from './currencySlice';
import { useGetExchangeRatesQuery } from './exchangeRatesApiSlice';

interface CurrencyProviderProps {
  children: ReactNode;
}

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

const CurrencyProvider: FC<CurrencyProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const {
    data: currency,
    isLoading,
    error,
  } = useGetExchangeRatesQuery(undefined, {
    // The exchange rate updates every 24 hours so we need to poll the currency updates
    pollingInterval: TWENTY_FOUR_HOURS,
    // The polling is stopped when the user has left the window  such as switching the focused tab to another tab
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
    }
  }, [currency, dispatch]);

  if (isLoading) {
    return <p>Loading exchange rates...</p>;
  }
  if (error) {
    return <p>Error loading exchange rates.</p>;
  }

  return children;
};

export default CurrencyProvider;

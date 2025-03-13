import { FC, ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setRates } from './currencySlice';
import { useGetExchangeRatesQuery } from './exchangeRatesApiSlice';

interface CurrencyProviderProps {
  children: ReactNode;
}

const CurrencyProvider: FC<CurrencyProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data: currency, isLoading, error } = useGetExchangeRatesQuery();

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

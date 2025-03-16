import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useLocalStorage, { localStorageKeys } from '../../hooks/useLocalStorage';
import { CurrencyCode, getFormattedPrice } from './currencyConverterUtil';
import { selectCurrency, setCurrency } from './currencySlice';

const useCurrency = (price?: number) => {
  const dispatch = useAppDispatch();
  const { rates, selectedCurrency } = useAppSelector(selectCurrency);
  const [exchangeRate, setExchangeRate] = useLocalStorage(
    localStorageKeys.currency,
    selectedCurrency,
  );
  const currencyOptions = Object.keys(rates).map((currency) => ({
    label: currency,
    value: currency,
  }));

  const handleChangePrice = (exchangeRate: CurrencyCode) => {
    setExchangeRate(exchangeRate);
  };

  const convertedPrice = getFormattedPrice(price ?? 0, selectedCurrency, rates);

  useEffect(() => {
    dispatch(setCurrency(exchangeRate));
  }, [exchangeRate]);

  return {
    currencyOptions,
    convertedPrice,
    onChangePrice: handleChangePrice,
    exchangeRate,
  };
};

export default useCurrency;

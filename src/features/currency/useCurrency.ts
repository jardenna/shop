import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CurrencyCode, getFormattedPrice } from './currencyConverterUtil';
import { selectCurrency, setCurrency } from './currencySlice';

const useCurrency = (price?: number) => {
  const dispatch = useAppDispatch();
  const { rates, selectedCurrency } = useAppSelector(selectCurrency);
  const [lang, setLang] = useLocalStorage('cur', selectedCurrency);
  const currencyOptions = Object.keys(rates).map((currency) => ({
    label: currency,
    value: currency,
  }));

  const handleChangePrice = (lang: CurrencyCode) => {
    setLang(lang);
  };

  const convertedPrice = getFormattedPrice(price ?? 0, selectedCurrency, rates);

  useEffect(() => {
    dispatch(setCurrency(lang));
  }, [lang]);

  return {
    currencyOptions,
    convertedPrice,
    onChangePrice: handleChangePrice,
    lang,
  };
};

export default useCurrency;

import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { OptionType } from '../../../components/selectBox/SelectBox';

import { selectCurrency, setCurrency } from '../currencySlice';

const CurrencySwitcher = () => {
  const dispatch = useAppDispatch();
  const { selectedCurrency, rates } = useAppSelector(selectCurrency);

  // Convert rates into SelectBox options
  const currencyOptions: OptionType[] = Object.keys(rates).map((currency) => ({
    label: currency,
    value: currency,
  }));

  const handleChange = (selected: OptionType | null) => {
    if (selected) {
      dispatch(setCurrency(selected.value));
    }
  };

  return (
    <Select
      id="currency"
      name="currency"
      options={currencyOptions}
      value={
        currencyOptions.find((opt) => opt.value === selectedCurrency) || null
      }
      onChange={handleChange}
    />
  );
};

export default CurrencySwitcher;

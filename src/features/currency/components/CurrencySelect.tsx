import { FC } from 'react';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { OptionType } from '../../../components/selectBox/SelectBox';
import { selectCurrency, setCurrency } from '../currencySlice';

const CurrencySelect: FC = () => {
  const dispatch = useAppDispatch();
  const { rates } = useAppSelector(selectCurrency);

  // Convert rates into SelectBox options
  const currencyOptions = Object.keys(rates).map((currency) => ({
    label: currency,
    value: currency,
  }));

  const handleOption = (selections: OptionType | null) => {
    if (selections) {
      dispatch(setCurrency(selections.value));
    }
  };

  return (
    <section>
      <Select
        classNamePrefix="select-box"
        defaultValue={{
          label: 'DKK',
          value: 'DKK',
        }}
        options={currencyOptions}
        onChange={handleOption}
      />
    </section>
  );
};

export default CurrencySelect;

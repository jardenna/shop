import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import NewSelectBox from '../../../components/selectBox/NewSelectBox';
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
      <NewSelectBox
        id="currency"
        defaultValue={{
          label: 'DKK',
          value: 'DKK',
        }}
        options={currencyOptions}
        onChange={handleOption}
        name="currency"
        labelText="Select currency"
      />
    </section>
  );
};

export default CurrencySelect;

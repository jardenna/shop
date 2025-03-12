import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrency, setCurrency } from '../currencySlice ';

const CurrencySwitcher = () => {
  const dispatch = useDispatch();
  const { selectedCurrency, rates } = useAppSelector(selectCurrency);

  const availableCurrencies = Object.keys(rates);

  return (
    <div>
      <label htmlFor="currency">Currency: </label>
      <select
        id="currency"
        value={selectedCurrency}
        onChange={(e) => dispatch(setCurrency(e.target.value))}
      >
        {availableCurrencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySwitcher;

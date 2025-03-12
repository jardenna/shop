// components/CurrencySwitcher.tsx

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { setCurrency } from '../currencySlice ';

function CurrencySwitcher() {
  const dispatch = useDispatch();
  const { selectedCurrency, rates } = useSelector(
    (state: RootState) => state.currency,
  );

  const availableCurrencies = Object.keys(rates);

  return (
    <div>
      <label htmlFor="currency">Currency: </label>
      <select
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
}

export default CurrencySwitcher;

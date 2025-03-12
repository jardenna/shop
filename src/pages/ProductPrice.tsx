// components/ProductPrice.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import convertPrice from '../features/currency/currencyConverterUtil';

export default function ProductPrice({ priceDKK }: { priceDKK: number }) {
  const { selectedCurrency, rates } = useSelector(
    (state: RootState) => state.currency,
  );

  return (
    <p>
      Price: {convertPrice(priceDKK, selectedCurrency, rates)}{' '}
      {selectedCurrency}
    </p>
  );
}

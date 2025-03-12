// components/ProductPrice.tsx
import { useAppSelector } from '../app/hooks';
import convertPrice from '../features/currency/currencyConverterUtil';
import { selectCurrency } from '../features/currency/currencySlice ';

export default function ProductPrice({ priceDKK }: { priceDKK: number }) {
  const { selectedCurrency, rates } = useAppSelector(selectCurrency);

  return (
    <p>
      Price: {convertPrice(priceDKK, selectedCurrency, rates)}{' '}
      {selectedCurrency}
    </p>
  );
}

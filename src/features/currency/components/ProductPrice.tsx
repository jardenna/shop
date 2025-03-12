import { useAppSelector } from '../../../app/hooks';
import { getFormattedPrice } from '../currencyConverterUtil';
import { selectCurrency } from '../currencySlice';

export default function ProductPrice({ priceDKK }: { priceDKK: number }) {
  const { selectedCurrency, rates } = useAppSelector(selectCurrency);

  return <p>Price: {getFormattedPrice(priceDKK, selectedCurrency, rates)}</p>;
}

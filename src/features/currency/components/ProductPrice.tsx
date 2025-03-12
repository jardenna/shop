import { useAppSelector } from '../../../app/hooks';
import { convertPrice, formatCurrency } from '../currencyConverterUtil';
import { selectCurrency } from '../currencySlice ';

export default function ProductPrice({ priceDKK }: { priceDKK: number }) {
  const { selectedCurrency, rates } = useAppSelector(selectCurrency);
  const convertedPrice = convertPrice(priceDKK, selectedCurrency, rates);

  return (
    <p>Price: {formatCurrency(Number(convertedPrice), selectedCurrency)}</p>
  );
}

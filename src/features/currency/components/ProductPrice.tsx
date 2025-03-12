import { useAppSelector } from '../../../app/hooks';
import { formatCurrency } from '../currencyConverterUtil';
import { selectCurrency } from '../currencySlice ';

const ProductPrice = ({ priceDKK }: { priceDKK: number }) => {
  const { selectedCurrency } = useAppSelector(selectCurrency);

  return <p>Price: {formatCurrency(priceDKK, selectedCurrency)}</p>;
};

export default ProductPrice;

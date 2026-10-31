import { useCurrency } from '../../currency/useCurrency';

interface ConvertedPriceProps {
  price: number;
}

const ConvertedPrice = ({ price }: ConvertedPriceProps) => {
  const { convertedPrice } = useCurrency(price);
  return <span>{convertedPrice}</span>;
};

export default ConvertedPrice;

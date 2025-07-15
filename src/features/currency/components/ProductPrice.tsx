import useCurrency from '../useCurrency';

type ProductPriceProps = {
  price: number;
  className?: string;
};

const ProductPrice = ({ price, className = '' }: ProductPriceProps) => {
  const { convertedPrice } = useCurrency(price);

  return <span className={className}>{convertedPrice}</span>;
};

export default ProductPrice;

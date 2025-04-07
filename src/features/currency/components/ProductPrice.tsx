import { FC } from 'react';
import useCurrency from '../useCurrency';

interface ProductPriceProps {
  price: number;
}

const ProductPrice: FC<ProductPriceProps> = ({ price }) => {
  const { convertedPrice } = useCurrency(price);

  return <p>{convertedPrice}</p>;
};

export default ProductPrice;

import useCurrency from '../../features/currency/useCurrency';
import './_product-price.scss';

type ProductPriceProps = {
  discount: number;
  price: number;
};

const ProductPrice = ({ price, discount }: ProductPriceProps) => {
  const { convertedPrice } = useCurrency(price);

  return (
    <span className={discount ? 'product-price has-discount' : 'product-price'}>
      {!!discount && <span>{convertedPrice} / </span>}
      <span className={discount ? 'text-line-through' : undefined}>
        {convertedPrice}
      </span>
    </span>
  );
};

export default ProductPrice;

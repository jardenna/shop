import useCurrency from '../../features/currency/useCurrency';
import './_product-price.scss';

type ProductPriceProps = {
  discount: number | null;
  price: number;
};

const ProductPrice = ({ price, discount }: ProductPriceProps) => {
  const { convertedPrice } = useCurrency(price);

  return (
    <span className="product-price">
      {!!discount && (
        <>
          <span>{convertedPrice}</span>
          <span> / </span>
        </>
      )}
      <span className={discount ? 'text-line-through' : 'product-price'}>
        {convertedPrice}
      </span>
    </span>
  );
};

export default ProductPrice;

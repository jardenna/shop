import ProductPrice from '../../features/currency/components/ProductPrice';
import { discountCalculation } from '../../utils/utils';

type ProductDiscountPriceProps = {
  discount: number;
  price: number;
};

const ProductDiscountPrice = ({
  price,
  discount,
}: ProductDiscountPriceProps) => {
  const productHasDiscount = discount && discount > 0;
  return (
    <span>
      <ProductPrice
        price={price}
        className={productHasDiscount ? 'text-line-through' : ''}
      />
      {productHasDiscount ? (
        <span>
          {' '}
          / <ProductPrice price={discountCalculation(price, discount)} />
        </span>
      ) : (
        ''
      )}
    </span>
  );
};

export default ProductDiscountPrice;

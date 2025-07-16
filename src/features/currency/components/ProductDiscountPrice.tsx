import { discountCalculation } from '../../../utils/utils';
import ProductPrice from './ProductPrice';
import './_product-price.scss';

type ProductDiscountPriceProps = {
  discount: number;
  price: number;
};

const ProductDiscountPrice = ({
  price,
  discount,
}: ProductDiscountPriceProps) => (
  <span className="product-discont-price">
    {!!discount && (
      <>
        <ProductPrice
          price={discountCalculation(price, discount)}
          className="has-discount"
        />
        <span className="price-seperator">/</span>
      </>
    )}
    <ProductPrice
      price={price}
      className={discount ? 'text-line-through' : undefined}
    />
  </span>
);

export default ProductDiscountPrice;

import { discountCalculation } from '../../../utils/utils';
import ProductPrice from '../../currency/components/ProductPrice';

type ProductDiscountPriceProps = {
  discount: number | null;
  price: number;
};

const ProductDiscountPrice = ({
  price,
  discount,
}: ProductDiscountPriceProps) => (
  <span className="product-discont-price">
    {!!discount && (
      <span>
        <ProductPrice price={discountCalculation(price, discount)} />
      </span>
    )}
    <ProductPrice
      price={price}
      className={discount ? 'text-line-through' : 'product-price'}
    />
  </span>
);

export default ProductDiscountPrice;

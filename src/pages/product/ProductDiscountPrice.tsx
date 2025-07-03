import ProductPrice from '../../features/currency/components/ProductPrice';
import { discountCalculation } from '../../utils/utils';

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
      <>
        <ProductPrice price={discountCalculation(price, discount)} />
        <span> / </span>
      </>
    )}
    <ProductPrice
      price={price}
      className={discount ? 'text-line-through' : 'product-price'}
    />
  </span>
);

export default ProductDiscountPrice;

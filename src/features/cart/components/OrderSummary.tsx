import { CartListSummary } from '../../../app/api/apiTypes/cartApiTypes';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';

interface OrderSummaryProps {
  language: Record<string, string>;
  summary: CartListSummary;
}

const OrderSummary = ({ summary, language }: OrderSummaryProps) => (
  <section>
    <div>
      <span>{language.subtotal}</span>
      <span>
        <ProductPrice price={summary.subTotal} />
      </span>
    </div>
    <div>
      <span>{language.discount}</span>
      <span>
        <ProductPrice price={summary.discountPrice} />
      </span>
    </div>
    <div>
      <span>{language.estimatedShipping}</span>
      <span>
        <ProductPrice price={summary.shippingPrice} />
      </span>
    </div>
    <div>
      <span>{language.totalPrice}</span>
      <span>
        <ProductPrice price={summary.totalPrice} />
      </span>
    </div>
  </section>
);

export default OrderSummary;

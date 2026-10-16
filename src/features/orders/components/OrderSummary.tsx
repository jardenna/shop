import { OrderResponse } from '../../../app/api/apiTypes/orderApiTypes';
import PaymentSummaryList from '../../cart/components/paymentSummery/PaymentSummaryList';
import OrderList from './orderList/OrderList';
import OrderHeading from './sectionHeading/SectionHeading';

interface OrderSummaryProps {
  language: Record<string, string>;
  order: OrderResponse;
}

const OrderSummary = ({ language, order }: OrderSummaryProps) => (
  <section className="order-summary">
    <article>
      <OrderHeading heading={language.orderedItems} />
      <OrderList orders={order.orderItems} language={language} />
    </article>
    <article>
      <OrderHeading heading={language.priceOverview} />
      <div className="payment-summary">
        <PaymentSummaryList
          language={language}
          summary={order.summary}
          promoDiscount={order.discount}
          cancelled={order.delivery.status === 'cancelled'}
        />
      </div>
    </article>
  </section>
);

export default OrderSummary;

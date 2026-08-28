import { OrderResponse } from '../../../app/api/apiTypes/orderApiTypes';
import PaymentSummaryList from '../../cart/components/paymentSummery/PaymentSummaryList';
import OrderHeading from './orderHeading/OrderHeading';
import OrderList from './OrderList';

interface PaymentSummaryProps {
  language: Record<string, string>;
  order: OrderResponse;
}

const PaymentSummary = ({ language, order }: PaymentSummaryProps) => (
  <section className="order-summary">
    <article>
      <OrderHeading heading={language.orderedItems} />
      <OrderList orders={order.orderItems} language={language} />
    </article>
    <article>
      <OrderHeading heading={language.priceOverview} />
      <PaymentSummaryList
        language={language}
        summary={order.summary}
        promoDiscount={order.discount}
        cancelled={order.delivery.status === 'cancelled'}
      />
    </article>
  </section>
);

export default PaymentSummary;

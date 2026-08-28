import { OrderResponse } from '../../../../app/api/apiTypes/orderApiTypes';
import OrderHeading from '../../../orders/components/orderHeading/OrderHeading';
import OrderList from '../../../orders/components/OrderList';
import PaymentSummaryList from './PaymentSummaryList';

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

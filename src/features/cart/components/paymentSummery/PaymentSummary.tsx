import { OrderResponse } from '../../../../app/api/apiTypes/orderApiTypes';
import OrderHeading from '../../../orders/components/orderHeading/OrderHeading';
import OrderList from '../../../orders/components/orders/OrderList';
import SummaryList from './SummaryList';

interface PaymentSummaryProps {
  language: Record<string, string>;
  order: OrderResponse;
}

const PaymentSummary = ({ language, order }: PaymentSummaryProps) => (
  <section className="confirmation-summary">
    <article className="summary-items">
      <OrderHeading heading={language.orderedItems} />
      <OrderList orders={order.orderItems} language={language} />
    </article>

    <article>
      <OrderHeading heading={language.priceOverview} />
      <div className="summary-payment">
        <SummaryList
          language={language}
          summary={order.summary}
          promoDiscount={order.discount}
          cancelled={order.delivery.status === 'cancelled'}
        />
      </div>
    </article>
  </section>
);

export default PaymentSummary;

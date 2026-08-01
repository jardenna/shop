import { useParams } from 'react-router';
import Button from '../components/Button';
import StatusTracker from '../components/statusTracker/StatusTracker';
import OrderItemList from '../features/cart/components/orderItemCard/OrderItemList';
import SummaryList from '../features/cart/components/SummaryList';
import { useLanguage } from '../features/language/useLanguage';
import OrderAddressList from '../features/orders/components/OrderAddressList';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';
import { createOrderAddressList } from '../features/orders/utils/createOrderAddressList';
import { orderTrackingList } from '../features/orders/utils/createTrackingList';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const { data: order, refetch } = useGetOrderByIdQuery(id ?? '');
  const status = {
    status: 'processing',
  };

  const addressList = order
    ? createOrderAddressList({
        billingAddress: order.billingAddress,
        shippingAddress: order.shippingAddress,
      })
    : [];

  return (
    <div className="container">
      <h2>{language.orderConfirmationTitle}</h2>
      <p>{language.orderConfirmationDescription}</p>
      <p>{language.orderConfirmationProcessing}</p>
      <StatusTracker steps={orderTrackingList} status={status} />
      {order && (
        <SummaryList
          language={language}
          summary={order.summary}
          promoDiscount={order.discount}
        />
      )}
      {order && <OrderItemList orders={order.orderItems} language={language} />}
      <Button>{language.trackYourOrder}</Button>
      <p>{language.orderNumber}</p>
      <p>{language.orderSummary}</p>
      <p>{language.paymentMethod}</p>
      <OrderAddressList addresses={addressList} refetch={refetch} />
    </div>
  );
};

export default OrderConfirmationPage;

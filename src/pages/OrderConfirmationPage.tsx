import { useParams } from 'react-router';
import DateDisplay from '../components/datePicker/DateDisplay';
import StatusTracker from '../components/statusTracker/StatusTracker';
import OrderItemList from '../features/cart/components/orderItemCard/OrderItemList';
import SummaryList from '../features/cart/components/SummaryList';
import { useLanguage } from '../features/language/useLanguage';
import OrderAddressList from '../features/orders/components/OrderAddressList';
import OrderConfirmationSubHeader from '../features/orders/components/OrderConfirmationSubHeader';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';
import { createOrderAddressList } from '../features/orders/utils/createOrderAddressList';
import { orderTrackingList } from '../features/orders/utils/createTrackingList';
import MainPageContainer from './pageContainer/MainPageContainer';

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
    <MainPageContainer
      hideBreadCrumbs
      variant="medium"
      heading={`${order && order.user.username}, ${language.orderConfirmationTitle}`}
    >
      <OrderConfirmationSubHeader />

      <StatusTracker steps={orderTrackingList} status={status} />

      {order && (
        <div>
          <div className="order-confirmation-summary">
            <OrderItemList orders={order.orderItems} language={language} />
            <SummaryList
              language={language}
              summary={order.summary}
              promoDiscount={order.discount}
            />
          </div>
          <section>
            <h2>{language.orderSummary}</h2>
            <div>
              <p>{language.orderNumber}</p>
              <p># {order.id}</p>
            </div>
            <div>
              <p>{language.orderPlaced}</p>
              <DateDisplay date={order.createdAt} />
            </div>
            <div>
              <p>{language.paymentMethod}</p>
              <p>{order.payment.method}</p>
            </div>
          </section>
          <OrderAddressList addresses={addressList} refetch={refetch} />
        </div>
      )}
    </MainPageContainer>
  );
};

export default OrderConfirmationPage;

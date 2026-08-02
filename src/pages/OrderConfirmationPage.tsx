import { useParams } from 'react-router';
import StatusTracker from '../components/statusTracker/StatusTracker';
import OrderItemList from '../features/cart/components/orderItemCard/OrderItemList';
import SummaryList from '../features/cart/components/SummaryList';
import { useLanguage } from '../features/language/useLanguage';
import OrderAddressList from '../features/orders/components/OrderAddressList';
import OrderConfirmationDetails from '../features/orders/components/OrderConfirmationDetails';
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
          <OrderConfirmationDetails
            createdAt={order.createdAt}
            id={order.id}
            method={order.payment.method}
          />

          <OrderAddressList addresses={addressList} refetch={refetch} />
        </div>
      )}
    </MainPageContainer>
  );
};

export default OrderConfirmationPage;

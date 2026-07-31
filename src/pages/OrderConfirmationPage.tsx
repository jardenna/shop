import { useParams } from 'react-router';
import Button from '../components/Button';
import OrderItemList from '../features/cart/components/orderItemCard/OrderItemList';
import { useLanguage } from '../features/language/useLanguage';
import OrderAddressList from '../features/orders/components/OrderAddressList';
import OrderTracking from '../features/orders/components/OrderTracking';
import { createOrderAddressList } from '../features/orders/createOrderAddressList';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';
import MainPageContainer from './pageContainer/MainPageContainer';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const { data: order, refetch } = useGetOrderByIdQuery(id ?? '');

  const addressList = order
    ? createOrderAddressList({
        billingAddress: order.billingAddress,
        shippingAddress: order.shippingAddress,
      })
    : [];

  return (
    <MainPageContainer heading={language.order}>
      <h2>{language.orderConfirmationTitle}</h2>
      <p>{language.orderConfirmationDescription}</p>
      <p>{language.orderConfirmationProcessing}</p>

      {order && <OrderItemList orders={order.orderItems} language={language} />}
      <OrderTracking language={language} />
      <Button>{language.trackYourOrder}</Button>
      <p>{language.orderNumber}</p>
      <p>{language.orderSummary}</p>
      <p>{language.paymentMethod}</p>
      <OrderAddressList addresses={addressList} refetch={refetch} />
    </MainPageContainer>
  );
};

export default OrderConfirmationPage;

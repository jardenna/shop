import { useParams } from 'react-router';
import Button from '../components/Button';
import Icon from '../components/icons/Icon';
import OrderItemList from '../features/cart/components/orderItemCard/OrderItemList';
import { useLanguage } from '../features/language/useLanguage';
import OrderAddressList from '../features/orders/components/OrderAddressList';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';
import { createOrderAddressList } from '../features/utils/createOrderAddressList';
import { IconName } from '../types/enums';
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

      <Button>{language.trackYourOrder}</Button>
      <p>{language.orderNumber}</p>
      <p>{language.orderSummary}</p>
      <p>{language.paymentMethod}</p>
      <OrderAddressList addresses={addressList} refetch={refetch} />
      <div>
        <div>
          <p>{language.orderCreated}</p>
          <Icon iconName={IconName.Basket} />
        </div>
        <div>
          <p>{language.orderInProgress}</p>
          <Icon iconName={IconName.PackageOpen} />
        </div>
        <div>
          <p>{language.orderShipped}</p>
          <Icon iconName={IconName.Deliver} />
        </div>
        <div>
          <p>{language.orderDelivered}</p>
          <Icon iconName={IconName.Home} />
        </div>
      </div>
    </MainPageContainer>
  );
};

export default OrderConfirmationPage;

import { useParams } from 'react-router';
import Button from '../components/Button';
import { useLanguage } from '../features/language/useLanguage';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';
import MainPageContainer from './pageContainer/MainPageContainer';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const { data: order } = useGetOrderByIdQuery(id ?? '');
  console.log(order);

  return (
    <MainPageContainer heading={language.order}>
      <h2>{language.orderConfirmationTitle}</h2>
      <p>{language.orderConfirmationDescription}</p>
      <p>{language.orderConfirmationProcessing}</p>

      <Button>{language.trackYourOrder}</Button>
      <p>{language.orderNumber}</p>
      <p>{language.orderSummary}</p>
      <p>{language.paymentMethod}</p>

      <div>
        <p>{language.orderCreated}</p>
        <p>{language.orderInProgress}</p>
        <p>{language.orderShipped}</p>
        <p>{language.orderDelivered}</p>
      </div>
    </MainPageContainer>
  );
};

export default OrderConfirmationPage;

import { useParams } from 'react-router';
import Button from '../components/Button';
import { useLanguage } from '../features/language/useLanguage';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';
import MainPageContainer from './pageContainer/MainPageContainer';

const OrderConfirmation = () => {
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
    </MainPageContainer>
  );
};

export default OrderConfirmation;

import { useParams } from 'react-router';
import { useLanguage } from '../features/language/useLanguage';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';
import MainPageContainer from './pageContainer/MainPageContainer';

const OrderConfirmation = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const { data: order } = useGetOrderByIdQuery(id ?? '');
  console.log(order);

  return (
    <MainPageContainer heading={language.checkout}>
      {language.order}
    </MainPageContainer>
  );
};

export default OrderConfirmation;

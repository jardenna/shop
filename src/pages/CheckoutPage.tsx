import { useGetUserOrderQuery } from '../features/orders/orderApiSlice';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const { data: orders } = useGetUserOrderQuery();
  console.log(orders);

  return (
    <MainPageContainer heading="checkout">
      <section>CheckoutPage</section>
    </MainPageContainer>
  );
};

export default CheckoutPage;

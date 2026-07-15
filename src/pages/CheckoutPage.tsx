import { useGetCartQuery } from '../features/cart/cartApiSlice';
import OrderSummaryList from '../features/orders/components/OrderSummaryList';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const { data: cartList, isLoading } = useGetCartQuery();

  return (
    <MainPageContainer heading="checkout">
      <section>
        <OrderSummaryList orderItems={cartList ?? null} isLoading={isLoading} />
      </section>
    </MainPageContainer>
  );
};

export default CheckoutPage;

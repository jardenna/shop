import { useGetCartQuery } from '../features/cart/cartApiSlice';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderSummaryList from '../features/orders/components/OrderSummaryList';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const { language } = useLanguage();
  const { data: cartList, isLoading } = useGetCartQuery();
  const { deleteCartItem } = useDeleteCartItem();

  return (
    <MainPageContainer heading="checkout">
      <section>
        <OrderSummaryList
          orderItems={cartList ?? null}
          isLoading={isLoading}
          language={language}
          deleteCartItem={deleteCartItem}
        />
      </section>
    </MainPageContainer>
  );
};

export default CheckoutPage;

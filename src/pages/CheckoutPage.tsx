import { useGetCartQuery } from '../features/cart/cartApiSlice';
import CartSummary from '../features/cart/components/CartSummary';
import { useGetCheckoutQuery } from '../features/checkout/checkoutApiSlice';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderSummaryList from '../features/orders/components/OrderSummaryList';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const { language } = useLanguage();
  const { data: cartList, isLoading } = useGetCartQuery();
  const { deleteCartItem } = useDeleteCartItem();
  const { data: checkout } = useGetCheckoutQuery();

  console.log({ checkout, cartList });

  return (
    <MainPageContainer heading="checkout">
      <section>
        <OrderSummaryList
          orderItems={cartList ?? null}
          isLoading={isLoading}
          language={language}
          deleteCartItem={deleteCartItem}
        />
        {cartList && (
          <CartSummary summary={cartList.summary} language={language} />
        )}
      </section>
    </MainPageContainer>
  );
};

export default CheckoutPage;

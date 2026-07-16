import CartSummary from '../features/cart/components/CartSummary';
import { useGetCheckoutQuery } from '../features/checkout/checkoutApiSlice';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderSummaryList from '../features/orders/components/OrderSummaryList';
import AddressList from './account/AddressList';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const { language } = useLanguage();
  const { deleteCartItem } = useDeleteCartItem();
  const { data: checkoutList, isLoading, refetch } = useGetCheckoutQuery();
  console.log(checkoutList?.addresses);

  return (
    <MainPageContainer heading="checkout">
      <section>
        <OrderSummaryList
          orderItems={checkoutList ?? null}
          isLoading={isLoading}
          language={language}
          deleteCartItem={deleteCartItem}
        />
        {checkoutList && (
          <CartSummary summary={checkoutList.summary} language={language} />
        )}

        {checkoutList && (
          <AddressList
            addresses={checkoutList.addresses}
            language={language}
            username="checkoutList.username"
            refetch={refetch}
          />
        )}
      </section>
    </MainPageContainer>
  );
};

export default CheckoutPage;

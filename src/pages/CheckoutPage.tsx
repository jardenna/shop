import { useAuth } from '../features/auth/hooks/useAuth';
import CartSummary from '../features/cart/components/CartSummary';
import { useGetCheckoutQuery } from '../features/checkout/checkoutApiSlice';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderSummaryList from '../features/orders/components/OrderSummaryList';
import AddressList from './account/AddressList';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { deleteCartItem } = useDeleteCartItem();

  const { data: checkoutList, isLoading, refetch } = useGetCheckoutQuery();

  return (
    <MainPageContainer heading="checkout">
      <section>
        {checkoutList && (
          <>
            <aside className="order-summary">
              <OrderSummaryList
                orderItems={checkoutList}
                isLoading={isLoading}
                language={language}
                deleteCartItem={deleteCartItem}
              />

              <CartSummary summary={checkoutList.summary} language={language} />
            </aside>
            <AddressList
              addresses={checkoutList.addresses}
              language={language}
              username={currentUser?.username ?? ''}
              refetch={refetch}
            />
          </>
        )}
      </section>
    </MainPageContainer>
  );
};

export default CheckoutPage;

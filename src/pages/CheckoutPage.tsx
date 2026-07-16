import { useAuth } from '../features/auth/hooks/useAuth';
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
  const {
    data: checkoutList,
    isLoading,
    refetch,
  } = useGetCheckoutQuery('SUMMER15');

  return (
    <MainPageContainer heading="checkout">
      <section>
        {checkoutList && (
          <>
            <OrderSummaryList
              orderItems={checkoutList}
              isLoading={isLoading}
              language={language}
              deleteCartItem={deleteCartItem}
              summary={checkoutList.summary}
            />
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

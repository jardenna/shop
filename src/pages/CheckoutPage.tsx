import { useState } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import CartSummary from '../features/cart/components/CartSummary';
import PromoCodeForm from '../features/cart/components/PromoCodeForm';
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

  const [promo, setPromo] = useState('');

  const handleSubmit = (promoCode: string) => {
    setPromo(promoCode);
  };

  const {
    data: checkoutList,
    isLoading,
    refetch,
  } = useGetCheckoutQuery(promo.toUpperCase());

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
              {currentUser?.role === 'User' && (
                <PromoCodeForm
                  onSubmitPromoCode={handleSubmit}
                  isLoading={isLoading}
                />
              )}
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

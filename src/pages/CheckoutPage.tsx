import { useAuth } from '../features/auth/hooks/useAuth';
import CartSummary from '../features/cart/components/CartSummary';
import { useGetCheckoutQuery } from '../features/checkout/checkoutApiSlice';
import Payment from '../features/checkout/components/Payment';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderSummaryList from '../features/orders/components/OrderSummaryList';
import AddressList from './account/AddressList';
import './CheckoutPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { deleteCartItem } = useDeleteCartItem();

  const { data: checkout, isLoading, refetch } = useGetCheckoutQuery();

  return (
    <MainPageContainer heading="checkout">
      <div className="checkout-page">
        {checkout && (
          <div className="checkout-container">
            <div>
              <Payment paymentMethod={checkout.paymentMethod} />
              <section className="address-list">
                <h2 className="checkout-title">{language.addresses}</h2>
                <AddressList
                  addresses={checkout.addresses}
                  language={language}
                  username={currentUser?.username ?? ''}
                  refetch={refetch}
                />
              </section>
            </div>
            <aside className="order-summary">
              <OrderSummaryList
                orderItems={checkout}
                isLoading={isLoading}
                language={language}
                deleteCartItem={deleteCartItem}
              />
              <CartSummary
                summary={checkout.summary}
                language={language}
                promoDiscount={checkout.discount}
              />
            </aside>
          </div>
        )}
      </div>
    </MainPageContainer>
  );
};

export default CheckoutPage;

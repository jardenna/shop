import { useAuth } from '../features/auth/hooks/useAuth';
import CartSummary from '../features/cart/components/CartSummary';
import { useGetCheckoutQuery } from '../features/checkout/checkoutApiSlice';
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

  const { data: checkoutList, isLoading, refetch } = useGetCheckoutQuery();

  return (
    <MainPageContainer heading="checkout">
      <div className="checkout-page">
        {checkoutList && (
          <div className="checkout-container">
            <div>
              <section>
                <h2 className="checkout-title">Payment</h2>
                <div>
                  <div>h</div>
                  <div>c</div>
                  <div>j</div>
                  <div>f</div>
                  <div>f</div>
                </div>
              </section>
              <section className="address-list">
                <h2 className="checkout-title">{language.addresses}</h2>
                <AddressList
                  addresses={checkoutList.addresses}
                  language={language}
                  username={currentUser?.username ?? ''}
                  refetch={refetch}
                />
              </section>
            </div>
            <aside className="order-summary">
              <OrderSummaryList
                orderItems={checkoutList}
                isLoading={isLoading}
                language={language}
                deleteCartItem={deleteCartItem}
              />
              <CartSummary
                summary={checkoutList.summary}
                language={language}
                promoDiscount={checkoutList.discount}
              />
            </aside>
          </div>
        )}
      </div>
    </MainPageContainer>
  );
};

export default CheckoutPage;

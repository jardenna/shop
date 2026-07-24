import ErrorInfoIcon from '../components/errorInfoIcon/ErrorInfoIcon';
import { useAuth } from '../features/auth/hooks/useAuth';
import CartSummary from '../features/cart/components/CartSummary';
import { useGetCheckoutQuery } from '../features/checkout/checkoutApiSlice';
import Payment from '../features/checkout/components/Payment';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderSummaryList from '../features/orders/components/OrderSummaryList';
import { useFormValidation } from '../hooks/useFormValidation';
import AddressList from './account/AddressList';
import './CheckoutPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { deleteCartItem } = useDeleteCartItem();
  const { data: checkout, isLoading, refetch } = useGetCheckoutQuery();

  const initialState = {
    paymentMethod: 'visa',
  };

  const { values, onChange } = useFormValidation({
    initialState,
  });

  return (
    <MainPageContainer heading="checkout">
      <div className="checkout-page order-flow">
        {checkout && (
          <>
            <section className="order-flow-list">
              <header className="order-flow-header">
                <h2 className="order-flow-title">{language.addresses}</h2>
                <ErrorInfoIcon />
                <span className="error-message">
                  {language.addressRequiredToPlaceOrder}
                </span>
              </header>

              <AddressList
                addresses={checkout.addresses}
                language={language}
                username={currentUser?.username ?? ''}
                refetch={refetch}
                className="checkout-address-list"
              />
              <Payment
                paymentMethod={checkout.paymentMethods}
                values={values}
                onChange={onChange}
                name="paymentMethod"
                language={language}
                checkout={checkout}
                addressLength={checkout.addresses.length}
              />
            </section>
            <aside className="order-flow-aside">
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
          </>
        )}
      </div>
    </MainPageContainer>
  );
};

export default CheckoutPage;

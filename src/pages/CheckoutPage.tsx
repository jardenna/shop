import { useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import SkeletonCheckoutPage from '../components/skeleton/checkoutpage/SkeletonCheckoutPage';
import { useAuth } from '../features/auth/hooks/useAuth';
import PaymentSummaryList from '../features/cart/components/paymentSummery/PaymentSummaryList';
import { useGetCheckoutQuery } from '../features/checkout/checkoutApiSlice';
import Payment from '../features/checkout/components/Payment';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderHeading from '../features/orders/components/orderHeading/OrderHeading';
import OrderSummaryList from '../features/orders/components/orderSummaryList/OrderSummaryList';
import { useFormValidation } from '../hooks/useFormValidation';
import { ShopPath } from '../layout/nav/enums';
import AddressList from './account/AddressList';
import './CheckoutPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  const addressSectionRef = useRef<HTMLDivElement | null>(null);
  const addAddressButtonRef = useRef<HTMLButtonElement>(null);

  const { deleteCartItem } = useDeleteCartItem();
  const { data: checkout, isLoading, refetch, isError } = useGetCheckoutQuery();

  const initialState = {
    paymentMethod: 'visa',
  };

  const { values, onChange } = useFormValidation({
    initialState,
  });

  useEffect(() => {
    if (checkout && checkout.cartItems.length === 0) {
      navigate(`/${ShopPath.ShoppingCart}`, { replace: true });
    }
  }, [checkout, navigate]);

  if (checkout && checkout.cartItems.length === 0) {
    return null;
  }

  return (
    <MainPageContainer heading={language.checkout}>
      {isError && <ErrorBoundaryFallback resetErrorBoundary={refetch} />}
      {isLoading && <SkeletonCheckoutPage />}
      <div className="checkout-page order-flow">
        {checkout && (
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch}
          >
            <section className="order-flow-list" ref={addressSectionRef}>
              <header className="order-flow-header">
                <OrderHeading heading={language.addresses} />
                {checkout.addresses.length === 0 && (
                  <span>({language.addressRequiredToPlaceOrder})</span>
                )}
              </header>
              <AddressList
                addresses={checkout.addresses}
                language={language}
                username={currentUser?.username ?? ''}
                refetch={refetch}
                className="checkout-address-list"
                addAddressButtonRef={addAddressButtonRef}
                triggerModalClassName={
                  checkout.addresses.length === 0 ? 'add-new-btn' : undefined
                }
              />
              <Payment
                paymentMethod={checkout.paymentMethods}
                values={values}
                onChange={onChange}
                name="paymentMethod"
                language={language}
                checkout={checkout}
                addressLength={checkout.addresses.length}
                addressSectionRef={addressSectionRef}
                addAddressButtonRef={addAddressButtonRef}
              />
            </section>
            <aside className="order-flow-aside">
              <OrderSummaryList
                orderItems={checkout}
                language={language}
                deleteCartItem={deleteCartItem}
              />
              <PaymentSummaryList
                summary={checkout.summary}
                language={language}
                promoDiscount={checkout.discount}
              />
            </aside>
          </ErrorBoundary>
        )}
      </div>
    </MainPageContainer>
  );
};

export default CheckoutPage;

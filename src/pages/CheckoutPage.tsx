import { useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { PaymentFormValues } from '../app/api/apiTypes/paymentApiTypes';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import SkeletonCheckoutPage from '../components/skeleton/checkoutpage/SkeletonCheckoutPage';
import { paymentMethodsList } from '../config/paymentConfig';
import { useAuth } from '../features/auth/hooks/useAuth';
import PaymentSummaryList from '../features/cart/components/paymentSummery/PaymentSummaryList';
import { useGetCheckoutQuery } from '../features/checkout/checkoutApiSlice';
import Payment from '../features/checkout/components/Payment';
import SelectPaymentMethod from '../features/checkout/components/SelectPaymentMethod';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderHeading from '../features/orders/components/orderHeading/OrderHeading';
import OrderSummaryList from '../features/orders/components/orderSummaryList/OrderSummaryList';
import TotalPrice from '../features/orders/components/TotalPrice';
import { useFormValidation } from '../hooks/useFormValidation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import LayoutElement from '../layout/LayoutElement';
import { ShopPath } from '../layout/nav/enums';
import AddressList from './account/AddressList';
import './checkoutPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { isMobileSize } = useMediaQuery();

  const addressSectionRef = useRef<HTMLDivElement | null>(null);
  const addAddressButtonRef = useRef<HTMLButtonElement>(null);

  const { deleteCartItem } = useDeleteCartItem();
  const { data: checkout, isLoading, refetch, isError } = useGetCheckoutQuery();

  const selectPaymentMethodState: Pick<PaymentFormValues, 'paymentMethod'> = {
    paymentMethod: 'visa',
  };

  const { values: paymentMethodValue, onChange: onChangePaymentMethod } =
    useFormValidation({
      initialState: selectPaymentMethodState,
    });

  useEffect(() => {
    if (checkout && checkout.cartItems.length === 0) {
      navigate(`/${ShopPath.ShoppingCart}`, { replace: true });
    }
  }, [checkout, navigate]);

  if (checkout && checkout.cartItems.length === 0) {
    return null;
  }
  const availablePaymentMethods = paymentMethodsList.filter((method) =>
    checkout?.paymentMethods.includes(method.id),
  );

  const paymentMethodList = availablePaymentMethods.map(({ id, label }) => ({
    label,
    value: id,
    id,
  }));

  return (
    <MainPageContainer heading={language.checkout} variant="large">
      {isError && <ErrorBoundaryFallback resetErrorBoundary={refetch} />}
      {isLoading && <SkeletonCheckoutPage />}
      <div className="checkout-page order-flow">
        {checkout && (
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch}
          >
            <section className="order-flow-list" ref={addressSectionRef}>
              <LayoutElement ariaLabel="address" className="order-flow-header">
                <OrderHeading heading={language.addresses} />
                {checkout.addresses.length === 0 && (
                  <span>({language.addressRequiredToPlaceOrder})</span>
                )}
              </LayoutElement>
              <AddressList
                addresses={checkout.addresses}
                language={language}
                username={currentUser?.username ?? ''}
                refetch={refetch}
                buttonRef={addAddressButtonRef}
              />
              <SelectPaymentMethod
                onChange={onChangePaymentMethod}
                value={paymentMethodValue.paymentMethod}
                paymentMethods={checkout.paymentMethods}
                paymentMethodList={paymentMethodList}
              />

              <Payment
                paymentMethod={checkout.paymentMethods}
                value={paymentMethodValue.paymentMethod}
                language={language}
                checkout={checkout}
                addressLength={checkout.addresses.length}
                addressSectionRef={addressSectionRef}
                addAddressButtonRef={addAddressButtonRef}
                additionalFooterInfo={
                  isMobileSize ? (
                    <TotalPrice price={checkout.summary.totalPrice} />
                  ) : undefined
                }
              />
            </section>
            <aside className="order-flow-aside">
              <OrderSummaryList
                orderItems={checkout}
                language={language}
                deleteCartItem={deleteCartItem}
                isLoading={isLoading}
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

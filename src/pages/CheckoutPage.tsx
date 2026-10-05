import { useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PaymentFormValues } from '../app/api/apiTypes/paymentApiTypes';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import SkeletonCheckoutPage from '../components/skeleton/checkoutpage/SkeletonCheckoutPage';
import { useToast } from '../components/toast/hooks/useToast';
import { paymentMethodsList } from '../config/paymentConfig';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useDeleteCartMutation } from '../features/cart/cartApiSlice';
import PaymentSummaryList from '../features/cart/components/paymentSummery/PaymentSummaryList';
import { useGetCheckoutQuery } from '../features/checkout/checkoutApiSlice';
import Payment from '../features/checkout/components/Payment';
import SelectPaymentMethod from '../features/checkout/components/SelectPaymentMethod';
import { useCurrency } from '../features/currency/useCurrency';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderHeading from '../features/orders/components/orderHeading/OrderHeading';
import OrderSummaryList from '../features/orders/components/orderSummaryList/OrderSummaryList';
import TotalPrice from '../features/orders/components/TotalPrice';
import {
  useCreateOrderMutation,
  usePayOrderMutation,
} from '../features/orders/orderApiSlice';
import { useFormValidation } from '../hooks/useFormValidation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import LayoutElement from '../layout/LayoutElement';
import { ShopPath } from '../layout/nav/enums';
import AddressList from './account/AddressList';
import './checkoutPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';
import { useNavigate } from 'react-router';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { isMobileSize } = useMediaQuery();
  const { selectedCurrency } = useCurrency();
  const { onAddToast } = useToast();

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

  const [createOrder, { isLoading: isCreateOrderLoading }] =
    useCreateOrderMutation();
  const [payOrder, { isLoading: isPayOrderLoading }] = usePayOrderMutation();
  const [deleteCart] = useDeleteCartMutation();

  const orderItems =
    checkout?.cartItems.map(({ productId, qty, color, size }) => ({
      productId,
      qty,
      color,
      size,
    })) ?? [];

  const shippingAddressId =
    checkout?.addresses.find((address) =>
      address.standardAddress.includes('addressDelivery'),
    )?.id ?? '';

  const billingAddressId =
    checkout?.addresses.find((address) =>
      address.standardAddress.includes('addressBilling'),
    )?.id ?? '';

  const handleSubmit = async (paymentValues: PaymentFormValues) => {
    if (!checkout) {
      return;
    }

    if (checkout.addresses.length === 0) {
      addressSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      const addAddressButton = addAddressButtonRef.current;

      if (addAddressButton) {
        addAddressButton.dataset.initialFocus = 'true';
        addAddressButton.focus();
      }

      return;
    }

    const order = await createOrder({
      orderItems,
      shippingAddressId,
      billingAddressId,
      payment: {
        method: paymentValues.paymentMethod,
      },
    }).unwrap();

    await payOrder({
      orderId: order.id,
      method: paymentValues.paymentMethod,
      currency: selectedCurrency,
      cardholderName: paymentValues.cardholderName,
      cardNumber: paymentValues.cardNumber,
      cvvCode: paymentValues.cvvCode,
      expiryDate: paymentValues.expiryDate,
      mobilePhoneNumber: paymentValues.mobilePhoneNumber,
      paypalEmail: paymentValues.paypalEmail,
      paypalPassword: paymentValues.paypalPassword,
    }).unwrap();

    await deleteCart().unwrap();
    navigate(`/${ShopPath.MyOrder}/${order.id}`);

    onAddToast({
      message: language.orderCreated,
    });
  };

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
            onReset={() => refetch()}
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
                key={paymentMethodValue.paymentMethod}
                paymentMethod={checkout.paymentMethods}
                value={paymentMethodValue.paymentMethod}
                language={language}
                onSubmit={handleSubmit}
                isLoading={isCreateOrderLoading || isPayOrderLoading}
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

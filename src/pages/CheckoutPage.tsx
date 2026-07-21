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

  const orderItems = checkout?.cartItems.map(
    ({ productId, qty, color, size }) => ({
      productId,
      qty,
      color,
      size,
    }),
  );

  const shippingAddressId = checkout?.addresses.find((address) =>
    address.standardAddress.includes('addressDelivery'),
  )?.id;

  const billingAddressId = checkout?.addresses.find((address) =>
    address.standardAddress.includes('addressBilling'),
  )?.id;

  const initialState = {
    paymentMethod: 'visa',
  };

  const { values, onChange } = useFormValidation({
    initialState,
  });

  const payload = {
    orderItems,
    shippingAddressId,
    billingAddressId,
    payment: {
      method: values.paymentMethod,
    },
  };
  console.log(payload);
  // justify-self: end;

  return (
    <MainPageContainer heading="checkout">
      <div className="checkout-page">
        {checkout && (
          <>
            <div>
              <section>
                <h2 className="checkout-title">{language.addresses}</h2>
                <AddressList
                  addresses={checkout.addresses}
                  language={language}
                  username={currentUser?.username ?? ''}
                  refetch={refetch}
                  className="checkout-address-list"
                />
              </section>
              <Payment
                paymentMethod={checkout.paymentMethod}
                values={values}
                onChange={onChange}
                name="paymentMethod"
                language={language}
              />
            </div>
            <aside>
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

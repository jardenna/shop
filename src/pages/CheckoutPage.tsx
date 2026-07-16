import { useState } from 'react';
import Form from '../components/form/Form';
import Input from '../components/formElements/Input';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useGetCheckoutQuery } from '../features/checkout/checkoutApiSlice';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderSummaryList from '../features/orders/components/OrderSummaryList';
import { useFormValidation } from '../hooks/useFormValidation';
import AddressList from './account/AddressList';
import MainPageContainer from './pageContainer/MainPageContainer';

const CheckoutPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { deleteCartItem } = useDeleteCartItem();
  const initialState = {
    promoCode: '',
  };

  const { values, onSubmit, onChange } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });
  const [promo, setPromo] = useState('');

  function handleSubmit() {
    setPromo(values.promoCode);
  }
  console.log(promo);

  const { data: checkoutList, isLoading, refetch } = useGetCheckoutQuery(promo); // SUMMER15

  return (
    <MainPageContainer heading="checkout">
      <section>
        {checkoutList && (
          <>
            <aside className="order-summary">
              SUMMER15
              <OrderSummaryList
                orderItems={checkoutList}
                isLoading={isLoading}
                language={language}
                deleteCartItem={deleteCartItem}
                summary={checkoutList.summary}
              />
              <Form
                onSubmit={onSubmit}
                submitBtnLabel={language.apply}
                isLoading={isLoading}
              >
                <Input
                  labelText={language.discountCode}
                  value={values.promoCode}
                  name="promoCode"
                  id="promoCode"
                  onChange={onChange}
                />
              </Form>
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

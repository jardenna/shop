import { skipToken } from '@reduxjs/toolkit/query';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import Button from '../components/Button';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useMessagePopup } from '../components/messagePopup/useMessagePopup';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  useApplyPromoCodeMutation,
  useGetGuestCartQuery,
  useUpdateQtyMutation,
} from '../features/cart/cartApiSlice';
import CartInfo from '../features/cart/components/CartInfo';
import CartList from '../features/cart/components/CartList';
import CartSummary from '../features/cart/components/CartSummary';
import PaymentMethodsList from '../features/cart/components/PaymentMethodsList';
import PromoCodeForm from '../features/cart/components/promoCodeForm/PromoCodeForm';
import { useActiveCart } from '../features/cart/useActiveCart';
import { deleteGuestCartItem, updateGuestCartQty } from '../features/cartSlice';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import { ShopPath } from '../layout/nav/enums';
import { handleApiError } from '../utils/handleApiError';
import MainPageContainer from './pageContainer/MainPageContainer';
import './ShoppingCartPage.styles.scss';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser, isAuthReady, isEmployee } = useAuth();
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { apiCartList, cartList } = useActiveCart({
    currentUser,
    isAuthReady,
  });

  const shouldFetchGuestCart = isAuthReady && !currentUser;

  const { data: guestCart, refetch } = useGetGuestCartQuery(
    shouldFetchGuestCart ? cartList : skipToken,
  );

  const [updateQty] = useUpdateQtyMutation();
  const [applyPromoCode, { isLoading: isPromoCodeLoading }] =
    useApplyPromoCodeMutation();
  const { deleteCartItem } = useDeleteCartItem();

  const handleApplyPromoCode = async (promoCode: string) => {
    try {
      await applyPromoCode(promoCode).unwrap();
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  const handleUpdateQty = async (cartItemId: string, qty: number) => {
    try {
      await updateQty({ cartItemId, qty });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  const handleUpdateQtyGuestCart = (cartItemId: string, qty: number) => {
    dispatch(updateGuestCartQty({ cartItemId, qty }));
  };

  const handleDeleteGuestCart = (cartItemId: string) => {
    dispatch(deleteGuestCartItem(cartItemId));
  };

  const cartItems = currentUser ? apiCartList?.cartItems : guestCart?.products;

  if (!cartItems) {
    return <SkeletonCard />;
  }

  if (cartItems.length === 0) {
    return (
      <EmptyState
        noProductText={language.shoppingBagEmpty}
        noProductTitle={language.shoppingBagEmptyTitle}
        src="/images/shoppingBags/shopping_bag_2"
        linkTo={`/${ShopPath.Collection}`}
        emtyStateCtaText={language.getInspired}
      />
    );
  }

  const handleCheckout = () => {
    navigate(`/${ShopPath.Checkout}`);
  };

  return (
    <MainPageContainer heading="bag">
      <div className="order-flow">
        <section>
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch}
          >
            <CartList
              cartList={cartItems}
              language={language}
              onDeleteCartItem={
                currentUser ? deleteCartItem : handleDeleteGuestCart
              }
              onUpdateQty={
                currentUser ? handleUpdateQty : handleUpdateQtyGuestCart
              }
            />
          </ErrorBoundary>
        </section>

        <aside>
          <h2 className="order-flow-title">{language.paymentSummary}</h2>
          {apiCartList && (
            <CartSummary
              summary={apiCartList.summary}
              language={language}
              promoDiscount={apiCartList.discount}
            />
          )}
          {apiCartList && !isEmployee && (
            <PromoCodeForm
              onSubmitPromoCode={handleApplyPromoCode}
              isLoading={isPromoCodeLoading}
              promoDiscount={apiCartList.discount}
            />
          )}

          <Button onClick={handleCheckout} className="shopping-cart-btn">
            {language.continueToCheckout}
          </Button>
          {apiCartList && (
            <PaymentMethodsList paymentMethods={apiCartList.paymentMethods} />
          )}

          <CartInfo language={language} />
        </aside>
      </div>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;

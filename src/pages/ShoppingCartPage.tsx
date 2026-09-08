import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import Button from '../components/Button';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import SkeletonCartPage from '../components/skeleton/SkeletonCartPage/SkeletonCartPage';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  useApplyPromoCodeMutation,
  useUpdateQtyMutation,
} from '../features/cart/cartApiSlice';
import CartInfo from '../features/cart/components/CartInfo';
import CartList from '../features/cart/components/CartList';
import PaymentMethodsList from '../features/cart/components/PaymentMethodsList';
import PaymentSummaryList from '../features/cart/components/paymentSummery/PaymentSummaryList';
import PromoCodeForm from '../features/cart/components/promoCodeForm/PromoCodeForm';
import { useActiveCart } from '../features/cart/useActiveCart';
import { deleteGuestCartItem, updateGuestCartQty } from '../features/cartSlice';
import { useDeleteCartItem } from '../features/hooks/useDeleteCartItem';
import { useLanguage } from '../features/language/useLanguage';
import OrderHeading from '../features/orders/components/orderHeading/OrderHeading';
import TotalPrice from '../features/orders/components/TotalPrice';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';
import './shoppingCartPage.styles.scss';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const dispatch = useAppDispatch();
  const { currentUser, isAuthReady, isEmployee } = useAuth();

  const { isMobileSize } = useMediaQuery();
  const pageHeading = language.bag;

  const { apiCartList, isCartError, refetchCart, cartData, isCartLoading } =
    useActiveCart({
      currentUser,
      isAuthReady,
    });

  const [updateQty, { isLoading: isUpdateQtyLoading }] = useUpdateQtyMutation();
  const [applyPromoCode, { isLoading: isPromoCodeLoading }] =
    useApplyPromoCodeMutation();
  const { deleteCartItem } = useDeleteCartItem();

  const handleApplyPromoCode = async (promoCode: string) => {
    await applyPromoCode(promoCode).unwrap();
  };

  const handleUpdateQty = async (cartItemId: string, qty: number) => {
    await updateQty({ cartItemId, qty }).unwrap();
  };

  const handleUpdateQtyGuestCart = (cartItemId: string, qty: number) => {
    dispatch(updateGuestCartQty({ cartItemId, qty }));
  };

  const handleDeleteGuestCart = (cartItemId: string) => {
    dispatch(deleteGuestCartItem(cartItemId));
  };

  if (isCartError) {
    return (
      <MainPageContainer heading={pageHeading}>
        <ErrorBoundaryFallback resetErrorBoundary={refetchCart} />
      </MainPageContainer>
    );
  }

  if (isCartLoading) {
    return (
      <MainPageContainer heading={pageHeading} variant="large">
        <SkeletonCartPage />
      </MainPageContainer>
    );
  }

  if (!cartData) {
    return null;
  }

  if (cartData.cartItems.length === 0) {
    return (
      <EmptyState
        emptyStateText={language.shoppingBagEmptyText}
        emptyStateTitle={language.shoppingBagEmptyTitle}
        src="/images/shoppingBags/cart_shopping_bag"
        linkTo={`/${ShopPath.Collection}`}
        emptyStateCtaText={language.getInspired}
        pageHeading={pageHeading}
      />
    );
  }

  const goToCheckoutPage = () => {
    navigate(`/${ShopPath.Checkout}`);
  };

  return (
    <MainPageContainer heading={pageHeading} variant="large">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetchCart}
      >
        <div className="order-flow">
          <section>
            <CartList
              cartList={cartData.cartItems}
              language={language}
              isLoading={isUpdateQtyLoading}
              onDeleteCartItem={
                currentUser ? deleteCartItem : handleDeleteGuestCart
              }
              onUpdateQty={
                currentUser ? handleUpdateQty : handleUpdateQtyGuestCart
              }
            />
          </section>

          <aside>
            <OrderHeading heading={language.paymentSummary} />

            <PaymentSummaryList
              summary={cartData.summary}
              language={language}
              promoDiscount={cartData.discount}
            />
            {!isEmployee && apiCartList && (
              <PromoCodeForm
                onSubmitPromoCode={handleApplyPromoCode}
                isLoading={isPromoCodeLoading}
                promoDiscount={cartData.discount}
              />
            )}
            <div className="fixed-bottom-container">
              {isMobileSize && (
                <TotalPrice price={cartData.summary.totalPrice} />
              )}
              <Button onClick={goToCheckoutPage} className="shopping-cart-btn">
                {language.continueToCheckout}
              </Button>
            </div>
            <div className="payment-info">
              <PaymentMethodsList paymentMethods={cartData.paymentMethods} />
              <CartInfo language={language} />
            </div>
          </aside>
        </div>
      </ErrorBoundary>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;

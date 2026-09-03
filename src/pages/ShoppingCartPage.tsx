import { skipToken } from '@reduxjs/toolkit/query';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import Button from '../components/Button';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import SkeletonCartPage from '../components/skeleton/SkeletonCartPage/SkeletonCartPage';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  useApplyPromoCodeMutation,
  useGetGuestCartQuery,
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
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';
import './shoppingCartPage.styles.scss';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser, isAuthReady, isEmployee } = useAuth();
  const { language } = useLanguage();
  const { apiCartList, cartList, refetchApiCartList, isCartError } =
    useActiveCart({
      currentUser,
    });

  const pageHeading = language.bag;
  const shouldFetchGuestCart = isAuthReady && !currentUser;

  const { data: guestCart, refetch } = useGetGuestCartQuery(
    shouldFetchGuestCart ? cartList : skipToken,
  );

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

  const cartItems = currentUser ? apiCartList?.cartItems : guestCart?.products;

  if (isCartError) {
    return (
      <MainPageContainer heading={pageHeading}>
        <ErrorBoundaryFallback resetErrorBoundary={refetchApiCartList} />
      </MainPageContainer>
    );
  }

  if (!cartItems) {
    return (
      <MainPageContainer heading={pageHeading}>
        <SkeletonCartPage />
      </MainPageContainer>
    );
  }

  if (cartItems.length === 0) {
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
    <MainPageContainer heading={pageHeading}>
      <div className="order-flow">
        <section>
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch}
          >
            <CartList
              cartList={cartItems}
              language={language}
              isLoading={isUpdateQtyLoading}
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
          <OrderHeading heading={language.paymentSummary} />
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetchApiCartList}
          >
            {apiCartList && (
              <>
                <PaymentSummaryList
                  summary={apiCartList.summary}
                  language={language}
                  promoDiscount={apiCartList.discount}
                />
                {!isEmployee && (
                  <PromoCodeForm
                    onSubmitPromoCode={handleApplyPromoCode}
                    isLoading={isPromoCodeLoading}
                    promoDiscount={apiCartList.discount}
                  />
                )}
                <div className="fixed-bottom-container">
                  <TotalPrice price={apiCartList.summary.totalPrice} />
                  <Button
                    onClick={goToCheckoutPage}
                    className="shopping-cart-btn"
                  >
                    {language.continueToCheckout}
                  </Button>
                </div>
                <div className="payment-info">
                  <PaymentMethodsList
                    paymentMethods={apiCartList.paymentMethods}
                  />
                  <CartInfo language={language} />
                </div>
              </>
            )}
          </ErrorBoundary>
        </aside>
      </div>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;

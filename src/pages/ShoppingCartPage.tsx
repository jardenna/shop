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
  useGetGuestCartQuery,
  useUpdateQtyMutation,
} from '../features/cart/cartApiSlice';
import CartList from '../features/cart/components/CartList';
import CartSummary from '../features/cart/components/CartSummary';
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
  const { currentUser, isAuthReady } = useAuth();
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

  const { deleteCartItem } = useDeleteCartItem();
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
      <div className="cart-page">
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

        <aside className="cart-page-aside">
          <h2>{language.orderSummary}</h2>
          {apiCartList && (
            <CartSummary
              summary={apiCartList.summary}
              language={language}
              promoDiscount={apiCartList.discount}
            />
          )}
          <Button onClick={handleCheckout}>
            {language.continueToCheckout}
          </Button>
        </aside>
      </div>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;

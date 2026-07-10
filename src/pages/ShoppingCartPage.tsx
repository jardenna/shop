import { skipToken } from '@reduxjs/toolkit/query';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppDispatch } from '../app/hooks';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useMessagePopup } from '../components/messagePopup/useMessagePopup';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  useDeleteCartMutation,
  useGetGuestCartQuery,
} from '../features/cart/cartApiSlice';
import CartItem from '../features/cart/components/CartItem';
import { useActiveCart } from '../features/cart/useActiveCart';
import { deleteGuestCartItem } from '../features/cartSlice';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import { ShopPath } from '../layout/nav/enums';
import { handleApiError } from '../utils/handleApiError';
import MainPageContainer from './pageContainer/MainPageContainer';
import './ShoppingCartPage.styles.scss';

const ShoppingCartPage = () => {
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

  const [deleteCartItem] = useDeleteCartMutation();

  const handleDeleteCartItem = async (cartItemId: string) => {
    try {
      const result = await deleteCartItem(cartItemId).unwrap();

      if (result.success) {
        onAddMessagePopup({
          message: result.message,
        });
      } else {
        onAddMessagePopup({
          messagePopupType: 'error',
          message: language.productNotFound,
          componentType: 'notification',
        });
      }
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
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

  return (
    <MainPageContainer heading="bag">
      <div className="cart-page">
        <section>
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch}
          >
            <CartItem
              cartList={cartItems}
              language={language}
              onDeleteCartItem={
                currentUser ? handleDeleteCartItem : handleDeleteGuestCart
              }
            />
          </ErrorBoundary>
        </section>
        <section>Card</section>
      </div>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;

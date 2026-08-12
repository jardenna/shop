import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppDispatch } from '../app/hooks';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useFavorites } from '../components/favorites/useFavorites';
import { useMessagePopup } from '../components/messagePopup/useMessagePopup';
import SkeletonCollection from '../components/skeleton/skeletonCollection/SkeletonCollection';
import Panel from '../components/togglePanel/Panel';
import { useTogglePanel } from '../components/togglePanel/useTogglePanel';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useAddToCartMutation } from '../features/cart/cartApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import { openMiniCart } from '../features/miniCartPopupSlice';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCart from '../features/shop/components/ProductCart';

import { ShopPath } from '../layout/nav/enums';
import { handleApiError } from '../utils/handleApiError';
import './FavoritesPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

import FavoritesPanelCart from '../features/favorites/components/FavoritesPanelCart';
import CartForm, {
  InitialShopValues,
} from '../features/shop/components/singleProduct/CartForm';

const FavoritePage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { onAddMessagePopup } = useMessagePopup();
  const dispatch = useAppDispatch();
  const { favorites, isLoading, onReset, isError } = useFavorites({});
  const sortedFavorites = favorites ? [...favorites].reverse() : [];
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } =
    useTogglePanel();
  const pageHeading = language.favorites;
  const [productId, setProductId] = useState<string | null>();

  const [addCartItemApi, { isLoading: isAddCartItemLoading }] =
    useAddToCartMutation();

  const handleOpenPanel = (id: string) => {
    setProductId(id);
    onTogglePanel();
  };

  async function handleSubmitCartItem(values: InitialShopValues) {
    const cartItem = {
      id: crypto.randomUUID(),
      productId: selectedProduct?.id ?? '',
      qty: values.qty,
      size: values.size,
      color: values.color,
    };

    try {
      await addCartItemApi(cartItem).unwrap();
      onTogglePanel();
      dispatch(openMiniCart());
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  const selectedProduct = favorites?.find(
    (favorite) => favorite.id === productId,
  );

  if (isError) {
    return (
      <MainPageContainer heading={pageHeading}>
        <ErrorBoundaryFallback resetErrorBoundary={onReset} />
      </MainPageContainer>
    );
  }

  if (!favorites) {
    return <SkeletonCollection showCtaBtn className="skeleton-favorites" />;
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        emptyStateTitle={language.noFavoritesYet}
        emptyStateText={language.noFavorites}
        src="/images/shoppingBags/shopping_bag_1"
        linkTo={`/${ShopPath.Collection}`}
        emptyStateCtaText={language.getInspired}
        pageHeading={pageHeading}
      />
    );
  }

  return (
    <MainPageContainer heading={pageHeading} className="favorite-page">
      {isLoading && (
        <SkeletonCollection showCtaBtn className="skeleton-favorites" />
      )}
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        <Panel
          isPanelShown={isPanelShown}
          panelRef={panelRef}
          onHidePanel={onHidePanel}
        >
          {selectedProduct && (
            <section className="favorite-panel">
              <FavoritesPanelCart product={selectedProduct} />
              <CartForm
                displaySizeList={selectedProduct.sizes}
                isLoading={isAddCartItemLoading}
                key={selectedProduct.id}
                handleSubmit={handleSubmitCartItem}
                productData={{
                  sizes: selectedProduct.sizes,
                  colors: selectedProduct.colors,
                  categoryName: selectedProduct.categoryName,
                }}
                currentProductQuantity={0}
              />
            </section>
          )}
        </Panel>
        <ul className="product-card-list">
          {sortedFavorites.map((product) => (
            <li key={product.id}>
              <ProductCart
                showSizeOverlay
                product={product}
                linkTo={`${ShopPath.AllProducts}/${product.id}`}
                onOpenPanel={handleOpenPanel}
                currentUser={currentUser}
                isOutOfStock={product.countInStock === 0}
              />
            </li>
          ))}
        </ul>
      </ErrorBoundary>
    </MainPageContainer>
  );
};

export default FavoritePage;

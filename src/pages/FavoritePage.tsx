import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppDispatch } from '../app/hooks';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useFavorites } from '../components/favorites/useFavorites';
import Panel from '../components/panel/Panel';
import { useTogglePanel } from '../components/panel/useTogglePanel';
import SkeletonProductInfo from '../components/skeleton/skeletonShopProducts/SkeletonProductInfo';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useAddToCartMutation } from '../features/cart/cartApiSlice';
import FavoritesPanelCart from '../features/favorites/components/FavoritesPanelCart';
import { useLanguage } from '../features/language/useLanguage';
import { openMiniCart } from '../features/miniCartPopupSlice';
import { getProductLink } from '../features/shop/cartUtils';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCartList from '../features/shop/components/ProductCartList';
import CartForm, {
  InitialShopValues,
} from '../features/shop/components/singleProduct/CartForm';
import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritePage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();
  const { favorites, isLoading, onReset, isError } = useFavorites({});
  const sortedFavorites = favorites ? [...favorites].reverse() : [];

  const { isPanelShown, onTogglePanel, onHidePanel } = useTogglePanel();

  const pageHeading = language.favorites;
  const [productId, setProductId] = useState<string | null>();

  const [addCartItemApi, { isLoading: isAddCartItemLoading }] =
    useAddToCartMutation();

  const handleOpenPanel = (id: string) => {
    setProductId(id);
    onTogglePanel();
  };

  const selectedProduct = favorites?.find(
    (favorite) => favorite.id === productId,
  );

  async function handleSubmitCartItem(values: InitialShopValues) {
    const cartItem = {
      id: crypto.randomUUID(),
      productId: selectedProduct?.id ?? '',
      qty: values.qty,
      size: values.size,
      color: values.color,
    };

    await addCartItemApi(cartItem).unwrap();
    onTogglePanel();
    dispatch(openMiniCart());
  }

  if (isError) {
    return (
      <MainPageContainer heading={pageHeading}>
        <ErrorBoundaryFallback resetErrorBoundary={onReset} />
      </MainPageContainer>
    );
  }

  if (!favorites) {
    return (
      <MainPageContainer
        heading={pageHeading}
        variant="large"
        className="favorite-page"
      >
        <SkeletonProductInfo showCtaBtn className="skeleton-favorites" />
      </MainPageContainer>
    );
  }

  if (favorites.length === 0) {
    return (
      <MainPageContainer heading={pageHeading}>
        <EmptyState
          emptyStateTitle={language.noFavoritesTitle}
          emptyStateText={language.noFavoritesText}
          src="/images/shoppingBags/favorites_shopping_bag"
          emptyStateCtaText={language.getInspired}
        />
      </MainPageContainer>
    );
  }

  return (
    <MainPageContainer
      heading={pageHeading}
      variant="large"
      className="favorite-page"
    >
      {isLoading && (
        <SkeletonProductInfo showCtaBtn className="skeleton-favorites" />
      )}

      <Panel
        isPanelShown={isPanelShown}
        onClosePanel={onHidePanel}
        portalId="favorites"
        heading={selectedProduct?.productName ?? ''}
      >
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={onReset}
        >
          {selectedProduct && (
            <div className="favorites-panel">
              <FavoritesPanelCart product={selectedProduct} />
              <CartForm
                className="favorites-form"
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
            </div>
          )}
        </ErrorBoundary>
      </Panel>
      <ProductCartList
        products={sortedFavorites}
        productView="grid"
        onOpenPanel={handleOpenPanel}
        currentUser={currentUser}
        showSizeOverlay
        getProductLink={getProductLink}
      />
    </MainPageContainer>
  );
};

export default FavoritePage;

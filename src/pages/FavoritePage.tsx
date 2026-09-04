import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppDispatch } from '../app/hooks';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useFavorites } from '../components/favorites/useFavorites';
import SkeletonCollection from '../components/skeleton/skeletonCollection/SkeletonCollection';
import Panel from '../components/togglePanel/Panel';
import { useTogglePanel } from '../components/togglePanel/useTogglePanel';
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
import { ShopPath } from '../layout/nav/enums';
import './favoritesPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritePage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
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
    return <SkeletonCollection showCtaBtn className="skeleton-favorites" />;
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        emptyStateTitle={language.noFavoritesTitle}
        emptyStateText={language.noFavoritesText}
        src="/images/shoppingBags/favorites_shopping_bag"
        linkTo={`/${ShopPath.Collection}`}
        emptyStateCtaText={language.getInspired}
        pageHeading={pageHeading}
      />
    );
  }

  return (
    <MainPageContainer
      heading={pageHeading}
      variant="large"
      className="favorite-page"
    >
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
        <ProductCartList
          products={sortedFavorites}
          productView="grid"
          onOpenPanel={handleOpenPanel}
          currentUser={currentUser}
          showSizeOverlay
          getProductLink={getProductLink}
        />
      </ErrorBoundary>
    </MainPageContainer>
  );
};

export default FavoritePage;

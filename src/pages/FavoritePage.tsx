import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useFavorites } from '../components/favorites/useFavorites';
import LabelValueGrid from '../components/labelValueGrid/LabelValueGrid.tsx';
import { useMessagePopup } from '../components/messagePopup/useMessagePopup';
import SkeletonCollection from '../components/skeleton/skeletonCollection/SkeletonCollection';
import Panel from '../components/togglePanel/Panel';
import { useTogglePanel } from '../components/togglePanel/useTogglePanel';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useAddToCartMutation } from '../features/cart/cartApiSlice';
import { useActiveCart } from '../features/cart/useActiveCart.ts';
import FavoriteCartItem from '../features/favorites/components/FavoriteCartItem.tsx';
import FavoriteItem from '../features/favorites/components/FavoriteItem.tsx';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCard from '../features/shop/components/ProductCard';
import CartForm, {
  InitialShopValues,
} from '../features/shop/components/singleProduct/CartForm.tsx';
import { ShopPath } from '../layout/nav/enums';
import { handleApiError } from '../utils/handleApiError';
import './FavoritesPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritePage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { favorites, isLoading, onReset, isError } = useFavorites({});
  const sortedFavorites = favorites ? [...favorites].reverse() : [];
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } =
    useTogglePanel();
  const pageHeading = language.favorites;
  const { onAddMessagePopup } = useMessagePopup();

  const [productId, setProductId] = useState<string | null>();
  const [openCartPopup, setOpenCartPopup] = useState(false);

  const [addCartItemApi, { isLoading: isAddCartItemLoading }] =
    useAddToCartMutation();

  const handleOpenPanel = (id: string) => {
    setProductId(id);
    onTogglePanel();
    setOpenCartPopup(true);
  };

  const { apiCartList } = useActiveCart({ currentUser });

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
        noProductText={language.noFavorites}
        noProductTitle={language.noFavoritesYet}
        src="/images/shoppingBags/shopping_bag_1"
        linkTo={`/${ShopPath.Collection}`}
        emtyStateCtaText={language.getInspired}
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
        {openCartPopup && apiCartList && (
          <ul className="favorite-list">
            {apiCartList.cartItems.map((order) => (
              <li key={order.id} className="favorite-list-item">
                <FavoriteCartItem order={order} language={language} />
              </li>
            ))}
            <p>Hvis du køber for 875, 45 kr. mere er levering gratis</p>

            <LabelValueGrid text="Pris i alt inkl. moms">
              300,00 kr.
            </LabelValueGrid>
          </ul>
        )}
        <Panel
          isPanelShown={isPanelShown}
          panelRef={panelRef}
          onHidePanel={onHidePanel}
        >
          {selectedProduct && (
            <section className="favorite-panel">
              <FavoriteItem product={selectedProduct} />
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
              <ProductCard
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

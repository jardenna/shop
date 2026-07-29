import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useFavorites } from '../components/favorites/useFavorites';
import Img from '../components/Img';
import LabelValueGrid from '../components/labelValueGrid/LabelValueGrid.tsx';
import { useMessagePopup } from '../components/messagePopup/useMessagePopup';
import SkeletonCollection from '../components/skeleton/skeletonCollection/SkeletonCollection';
import Panel from '../components/togglePanel/Panel';
import { useTogglePanel } from '../components/togglePanel/useTogglePanel';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useAddToCartMutation } from '../features/cart/cartApiSlice';
import { useActiveCart } from '../features/cart/useActiveCart.ts';
import FavoriteItem from '../features/favorites/components/FavoriteItem.tsx';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCard from '../features/shop/components/ProductCard';
import ProductPrice from '../features/shop/components/productPrice/ProductPrice';
import CartForm, {
  InitialShopValues,
} from '../features/shop/components/singleProduct/CartForm.tsx';
import { ShopPath } from '../layout/nav/enums';
import { handleApiError } from '../utils/handleApiError';
import { translateKey } from '../utils/utils.ts';
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
        {openCartPopup && (
          <ul>
            {apiCartList?.cartItems.map((item) => (
              <li key={item.id}>
                <article className="favorite-panel-product">
                  <Img src={item.image} alt="" className="panel-product-img" />
                  <div>
                    <h2 className="panel-product-title">{item.productName}</h2>
                    <ProductPrice price={item.price} discount={item.discount} />
                    <div>
                      <LabelValueGrid text={language.color}>
                        {translateKey(item.color, language)}
                      </LabelValueGrid>
                      <LabelValueGrid text={language.size}>
                        {item.size}
                      </LabelValueGrid>
                      <LabelValueGrid text={language.qty}>
                        {item.qty}
                      </LabelValueGrid>
                    </div>
                  </div>
                </article>
              </li>
            ))}
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

import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useFavorites } from '../components/favorites/useFavorites';
import Img from '../components/Img';
import SkeletonCollection from '../components/skeleton/skeletonCollection/SkeletonCollection';
import Panel from '../components/togglePanel/Panel';
import { useTogglePanel } from '../components/togglePanel/useTogglePanel';
import FavoritesForm from '../features/favorites/FavoritesForm';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCard from '../features/shop/components/ProductCard';
import ProductPrice from '../features/shop/components/productPrice/ProductPrice';
import { ShopPath } from '../layout/nav/enums';
import './FavoritesPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritePage = () => {
  const { language } = useLanguage();
  const { favorites, isLoading, onReset, isError } = useFavorites({});
  const sortedFavorites = favorites ? [...favorites].reverse() : [];
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } =
    useTogglePanel();

  const [productId, setProductId] = useState<string | null>();

  const handleAddToCart = (id: string) => {
    setProductId(id);
    onTogglePanel();
  };

  const selectedProduct = favorites?.find(
    (favorite) => favorite.id === productId,
  );

  if (isError) {
    return (
      <MainPageContainer heading="favorites">
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
      />
    );
  }

  return (
    <MainPageContainer heading="favorites" className="favorite-page">
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
              <article className="favorite-panel-product">
                <Img
                  src={selectedProduct.image}
                  alt=""
                  className="panel-product-img"
                />
                <div>
                  <h2 className="panel-product-title">
                    {selectedProduct.productName}
                  </h2>
                  <ProductPrice
                    price={selectedProduct.price}
                    discount={selectedProduct.discount}
                    discountedPrice={selectedProduct.discountedPrice}
                  />
                </div>
              </article>

              <FavoritesForm
                displaySizeList={selectedProduct.sizes}
                selectedProduct={selectedProduct}
                key={selectedProduct.id}
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
                onAddToCart={handleAddToCart}
              />
            </li>
          ))}
        </ul>
      </ErrorBoundary>
    </MainPageContainer>
  );
};

export default FavoritePage;

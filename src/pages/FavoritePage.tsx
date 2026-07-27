import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useFavorites } from '../components/favorites/useFavorites';
import Img from '../components/Img';
import SkeletonCollection from '../components/skeleton/skeletonCollection/SkeletonCollection';
import Panel from '../components/togglePanel/Panel';
import { useTogglePanel } from '../components/togglePanel/useTogglePanel';
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

  const panelOrder = favorites?.find((favorite) => favorite.id === productId);

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
  console.log(panelOrder);

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
          {panelOrder && (
            <article>
              <Img src={panelOrder.image} alt="" />
              <div>
                <div>
                  <h3>{panelOrder.productName}</h3>
                  <ProductPrice
                    price={panelOrder.price}
                    discount={panelOrder.discount}
                    discountedPrice={panelOrder.discountedPrice}
                  />
                  <p>
                    {panelOrder.sizes.length === 1
                      ? `Valgt størrelse${panelOrder.sizes[0]}`
                      : ''}
                  </p>
                </div>
              </div>
            </article>
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

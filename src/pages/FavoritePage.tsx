import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useFavorites } from '../components/favorites/useFavorites';
import SkeletonCollection from '../components/skeleton/skeletonCollection/SkeletonCollection';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCard from '../features/shop/components/ProductCard';
import { ShopPath } from '../layout/nav/enums';
import './FavoritesPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritePage = () => {
  const { language } = useLanguage();
  const { favorites, isLoading, onReset, isError } = useFavorites({});
  const sortedFavorites = favorites ? [...favorites].reverse() : [];

  const handleAddToCart = () => {
    console.log(123);
  };

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

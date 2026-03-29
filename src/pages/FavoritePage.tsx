import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useFavorites } from '../components/favorites/useFavorites';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCard from '../features/shop/components/ProductCard';
import { ShopPath } from '../layout/nav/enums';
import './FavoritesPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritePage = () => {
  const { language } = useLanguage();
  const { favorites, isLoading, onReset } = useFavorites({});

  return (
    <MainPageContainer heading="favorites" className="favorite-page">
      {isLoading && <SkeletonCardList count={4} className="large" />}
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        {favorites && favorites.length > 0 ? (
          <ul className="product-card-list">
            {favorites.map((product) => (
              <li key={product.id}>
                <ProductCard
                  showAdToCartBtn
                  showSizeOverlay
                  product={product}
                  linkTo={`${ShopPath.FavoritesProduct}/${product.id}`}
                />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            noProductText={language.noFavorites}
            noProductTitle={language.noFavoritesYet}
            src="/images/shoppingBags/shopping_bag_1"
            linkTo={`/${ShopPath.Collection}`}
            emtyStateCtaText={language.getInspired}
          />
        )}
      </ErrorBoundary>
    </MainPageContainer>
  );
};

export default FavoritePage;

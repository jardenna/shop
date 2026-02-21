import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import useFavorites from '../components/favorites/useFavorites';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';
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
      <ul className="product-card-list">
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={onReset}
        >
          {favorites && favorites.length > 0 ? (
            favorites.map((product) => (
              <li key={product.id}>
                <ProductCard
                  showAdToCartBtn
                  showSizeOverlay
                  product={product}
                  linkTo={`${ShopPath.FavoritesProduct}/${product.id}`}
                />
              </li>
            ))
          ) : (
            <div>
              <h2>{language.noFavoritesYet}</h2>
              <p>{language.noFavorites}</p>
            </div>
          )}
        </ErrorBoundary>
      </ul>
    </MainPageContainer>
  );
};

export default FavoritePage;

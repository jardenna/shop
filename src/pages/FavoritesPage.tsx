import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import useFavorites from '../components/favorites/useFavorites';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';

import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritesPage = () => {
  const { language } = useLanguage();
  const { favorites, isLoading, onReset } = useFavorites({});

  // const handleAddToBag = (id: string) => {
  //   console.log(id);
  // };

  return (
    <MainPageContainer heading="favorites">
      {isLoading && <SkeletonCardList count={4} />}
      <article className="product-card-list">
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={onReset}
        >
          {favorites && favorites.length > 0 ? (
            favorites.map((product) => (
              <div key={product.id}>{product.brand}</div>
            ))
          ) : (
            <div>
              <h2>{language.noFavoritesYet}</h2>
              <p>{language.noFavorites}</p>
            </div>
          )}
        </ErrorBoundary>
      </article>
    </MainPageContainer>
  );
};

export default FavoritesPage;

import useFavorites from '../components/favorites/useFavorites';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';

import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritesPage = () => {
  const { language } = useLanguage();
  const { favorites, isLoading } = useFavorites({});

  return (
    <MainPageContainer heading="favorites">
      {isLoading && <SkeletonCardList count={4} />}

      {/* {favorites && (
        <ProductCardList
          products={favorites}
          ariaLabelledby="ariaLabelledby"
          linkText={language.view}
          onReset={onReset}
        />
      )} */}
      <article className="product-card-list">
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
      </article>
    </MainPageContainer>
  );
};

export default FavoritesPage;

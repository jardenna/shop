import useFavorites from '../components/favorites/useFavorites';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';
import ProductCard from '../features/shop/components/ProductCard';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritesPage = () => {
  const { language } = useLanguage();
  const { favorites, isLoading } = useFavorites({});

  return (
    <MainPageContainer heading="favorites">
      {isLoading && <SkeletonCardList count={4} />}

      <ul className="product-card-list">
        {favorites && favorites.length > 0 ? (
          favorites.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                linkText=""
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
      </ul>
    </MainPageContainer>
  );
};

export default FavoritesPage;

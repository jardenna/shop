import useFavorites from '../components/favorites/useFavorites';
import IconBtn from '../components/IconBtn';

import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';
import ProductCard from '../features/shop/components/ProductCard';
import { ShopPath } from '../layout/nav/enums';
import { BtnVariant, IconName } from '../types/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritesPage = () => {
  const { language } = useLanguage();
  const { favorites, isLoading, onReset } = useFavorites({});

  return (
    <MainPageContainer heading="favorites">
      {isLoading && <SkeletonCardList count={4} />}

      <article className="product-card-list">
        {favorites && favorites.length > 0 ? (
          favorites.map((product) => (
            <>
              <ProductCard
                key={product.id}
                product={product}
                ariaLabelledby=""
                linkText=""
                linkTo={`${ShopPath.FavoritesProduct}/${product.id}`}
                onReset={onReset}
              />
              <div className="shopping-bag-container">
                <IconBtn
                  variant={BtnVariant.Primary}
                  onClick={() => {
                    console.log(product.id);
                  }}
                  iconName={IconName.ShoppingBag}
                  ariaLabel="ariaLabel"
                />
              </div>
            </>
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

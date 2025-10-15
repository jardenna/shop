import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import useFavorites from '../components/favorites/useFavorites';
import IconBtn from '../components/IconBtn';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';
import ProductCard from '../features/shop/components/ProductCard';
import ProductCardGridContent from '../features/shop/components/ProductCardGridContent';
import { ShopPath } from '../layout/nav/enums';
import { BtnVariant, IconName } from '../types/enums';

import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritesPage = () => {
  const { language } = useLanguage();
  const { favorites, isLoading, onReset } = useFavorites({});

  const handleAddToBag = (id: string) => {
    console.log(id);
  };

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
              <ProductCard
                key={product.id}
                product={product}
                linkTo={`${ShopPath.FavoritesProduct}/${product.id}`}
              >
                <div className="shopping-bag-container">
                  <IconBtn
                    variant={BtnVariant.Primary}
                    onClick={() => {
                      handleAddToBag(product.id);
                    }}
                    iconName={IconName.ShoppingBag}
                    title=""
                    ariaLabel={language.bag}
                  />
                </div>
                <ProductCardGridContent product={product} />
              </ProductCard>
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

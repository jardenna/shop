import useFavorites from '../components/favorites/useFavorites';
import useLanguage from '../features/language/useLanguage';
import ProductCard from '../features/shop/components/ProductCard';
import ProductCardGridContent from '../features/shop/components/ProductCardGridContent';

import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritesPage = () => {
  const { language } = useLanguage();
  const { favorites } = useFavorites({});

  return (
    <MainPageContainer heading={language.favorites}>
      <article className="product-card-list">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product}>
            <ProductCardGridContent product={product} />
          </ProductCard>
        ))}
      </article>
    </MainPageContainer>
  );
};

export default FavoritesPage;

import useFavorites from '../components/favorites/useFavorites';
import IconBtn from '../components/IconBtn';
import useLanguage from '../features/language/useLanguage';
import ProductCard from '../features/shop/components/ProductCard';
import ProductCardGridContent from '../features/shop/components/ProductCardGridContent';
import { BtnVariant, IconName } from '../types/enums';

import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritesPage = () => {
  const { language } = useLanguage();
  const { favorites } = useFavorites({});

  const handleAddToBag = (id: string) => {
    console.log(id);
  };

  return (
    <MainPageContainer heading={language.favorites}>
      <article className="product-card-list">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product}>
            <div className="shopping-bag-container">
              <IconBtn
                variant={BtnVariant.Primary}
                onClick={() => {
                  handleAddToBag(product.id);
                }}
                iconName={IconName.ShoppingBag}
                title="title"
                ariaLabel="ariaLabel"
              />
            </div>
            <ProductCardGridContent product={product} />
          </ProductCard>
        ))}
      </article>
    </MainPageContainer>
  );
};

export default FavoritesPage;

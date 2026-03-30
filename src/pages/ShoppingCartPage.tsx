import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const ShoppingCartPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading="shopCart">
      <section>
        <EmptyState
          noProductText={language.shoppingBagEmpty}
          noProductTitle={language.shoppingBagEmptyTitle}
          src="/images/shoppingBags/shopping_bag_2"
          linkTo={`/${ShopPath.Collection}`}
          emtyStateCtaText={language.getInspired}
        />
      </section>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;

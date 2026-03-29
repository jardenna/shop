import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import MainPageContainer from './pageContainer/MainPageContainer';

const ShoppingChartPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.shopCart}>
      <section>
        <EmptyState
          noProductText={language.noProductResult}
          noProductTitle={language.noProductResultTitle}
          src="/images/shoppingBags/shopping_bag_2.png"
        />
      </section>
    </MainPageContainer>
  );
};

export default ShoppingChartPage;

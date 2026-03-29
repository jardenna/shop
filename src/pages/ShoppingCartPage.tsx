import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import MainPageContainer from './pageContainer/MainPageContainer';

const ShoppingChartPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading="shopCart">
      <section>
        <EmptyState
          noProductText={language.shoppingBagEmpty}
          noProductTitle={language.shoppingBagEmptyTitle}
          src="/images/shoppingBags/shopping_bag_2"
          onClearAllFilters={() => {
            console.log(1);
          }}
          resetBtnText={language.getInspired}
        />
      </section>
    </MainPageContainer>
  );
};

export default ShoppingChartPage;

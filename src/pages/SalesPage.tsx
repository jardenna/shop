import DisplayControls from '../components/DisplayControls';
import SkeletonCollectionPage from '../components/skeleton/skeletonCollection/SkeletonCollectionPage';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCartList from '../features/shop/components/ProductCartList';
import { useGetSaleProductsQuery } from '../features/shop/shopApiSlice';
import { localStorageKeys, useLocalStorage } from '../hooks/useLocalStorage';
import { ShopPath } from '../layout/nav/enums';
import { productViewIconList } from '../utils/productViewIconList';
import MainPageContainer from './pageContainer/MainPageContainer';

const SalesPage = () => {
  const { language } = useLanguage();

  const [productView, setProductView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const {
    data: productsOnSale,
    // isLoading,
    // isError,
    // error,
    // refetch,
  } = useGetSaleProductsQuery();
  if (!productsOnSale) {
    return <SkeletonCollectionPage count={4} />;
  }

  if (productsOnSale.products.length > 0) {
    return (
      <EmptyState
        emptyStateTitle={language.noFavoritesYet}
        emptyStateText={language.noFavorites}
        src="/images/shoppingBags/sale_shopping_bag"
        linkTo={`/${ShopPath.Collection}`}
        emptyStateCtaText={language.getInspired}
        pageHeading={language.sale}
      />
    );
  }

  return (
    <MainPageContainer heading={language.sale}>
      <DisplayControls
        onSetDisplay={setProductView}
        displayControlList={productViewIconList}
        activeDisplay={productView}
      />
      <ProductCartList
        products={productsOnSale.products}
        productView={productView}
        showSizeOverlay={productView !== 'list'}
      />
    </MainPageContainer>
  );
};

export default SalesPage;

import { ErrorBoundary } from 'react-error-boundary';
import DisplayControls from '../components/DisplayControls';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import NotFoundError from '../components/NotFoundError';
import SkeletonCollectionPage from '../components/skeleton/skeletonCollection/SkeletonCollectionPage';
import { useLanguage } from '../features/language/useLanguage';
import { getProductLink } from '../features/shop/cartUtils';
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
    data: products,
    // isLoading,
    isError,
    error,
    refetch,
  } = useGetSaleProductsQuery();

  if (!products) {
    return <SkeletonCollectionPage count={4} />;
  }

  if (isError) {
    return (
      <MainPageContainer heading="collection">
        <NotFoundError error={error} />
      </MainPageContainer>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        emptyStateTitle={language.noSaleTitle}
        emptyStateText={language.noSaleText}
        src="/images/shoppingBags/sale_shopping_bag"
        linkTo={`/${ShopPath.Collection}`}
        emptyStateCtaText={language.noSaleCta}
        pageHeading={language.sale}
      />
    );
  }

  return (
    <MainPageContainer heading={language.sale}>
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch()}
      >
        <DisplayControls
          onSetDisplay={setProductView}
          displayControlList={productViewIconList}
          activeDisplay={productView}
        />

        <ProductCartList
          products={products}
          productView={productView}
          showSizeOverlay={productView !== 'list'}
          getProductLink={getProductLink}
        />
      </ErrorBoundary>
    </MainPageContainer>
  );
};

export default SalesPage;

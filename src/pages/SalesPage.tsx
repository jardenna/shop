import { ErrorBoundary } from 'react-error-boundary';
import DisplayControls from '../components/DisplayControls';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import NotFoundError from '../components/NotFoundError';
import SkeletonCollectionPage from '../components/skeleton/skeletonCollection/SkeletonCollectionPage';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCart from '../features/shop/components/ProductCart';
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
        <ul className="product-cart-list">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCart
                showSizeOverlay
                product={product}
                linkTo={`${ShopPath.AllProducts}/${product.id}`}
                isOutOfStock={product.countInStock === 0}
              />
            </li>
          ))}
        </ul>
      </ErrorBoundary>
    </MainPageContainer>
  );
};

export default SalesPage;

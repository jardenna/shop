import { useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import DisplayControls from '../components/DisplayControls';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import NotFoundError from '../components/NotFoundError';
import SkeletonCollectionPage from '../components/skeleton/skeletonCollection/SkeletonCollectionPage';
import { useLanguage } from '../features/language/useLanguage';
import { getProductLink } from '../features/shop/cartUtils';
import CollectionAside from '../features/shop/components/CollectionAside';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCartList from '../features/shop/components/ProductCartList';
import { useGetSaleProductsQuery } from '../features/shop/shopApiSlice';
import { localStorageKeys, useLocalStorage } from '../hooks/useLocalStorage';
import { ShopPath } from '../layout/nav/enums';
import { productViewIconList } from '../utils/productViewIconList';
import MainPageContainer from './pageContainer/MainPageContainer';

const Salespage = () => {
  const ariaLabelledby = useId();

  const { category } = useParams();
  const { language } = useLanguage();

  const [productView, setProductView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const { data: products, isError, error, refetch } = useGetSaleProductsQuery();

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

  const subMenu = [
    { label: 'men', categoryId: '68145e5d1ac3dd2a44867016' },
    { label: 'women', categoryId: '680091d574682cc14143e248' },
    { label: 'kids', categoryId: '680091c674682cc14143e243' },
  ];

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

        <CollectionAside
          ariaLabelledby={ariaLabelledby}
          subMenu={subMenu}
          headerText={language.sale}
          category={category || 'women'}
          onReset={() => {
            console.log(123);
          }}
          language={language}
          getProductLink={(productId) => `/${ShopPath.Sale}/${productId}`}
          linkTo={`/${ShopPath.Sale}`}
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

export default Salespage;

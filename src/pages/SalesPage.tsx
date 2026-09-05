import { useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { saleBreadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import DisplayControls from '../components/DisplayControls';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import NotFoundError from '../components/NotFoundError';
import Picture from '../components/Picture';
import SkeletonCollectionPage from '../components/skeleton/skeletonCollection/SkeletonCollectionPage';
import { useLanguage } from '../features/language/useLanguage';
import { getProductLink } from '../features/shop/cartUtils';
import CollectionAside from '../features/shop/components/CollectionAside';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCartList from '../features/shop/components/ProductCartList';
import {
  useGetSaleMenuQuery,
  useGetSaleProductsQuery,
} from '../features/shop/shopApiSlice';
import { localStorageKeys, useLocalStorage } from '../hooks/useLocalStorage';
import MetaTags from '../layout/MetaTags';
import { ShopPath } from '../layout/nav/enums';
import { productViewIconList } from '../utils/productViewIconList';
import MainPageContainer from './pageContainer/MainPageContainer';

const Salespage = () => {
  const ariaLabelledby = useId();
  const params = useParams();
  const { language } = useLanguage();

  const [productView, setProductView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const { data: products, isError, error, refetch } = useGetSaleProductsQuery();

  const { data: subMenu, refetch: refetchSubMenu } = useGetSaleMenuQuery(
    params.categoryId ?? '',
  );

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

  const selectedProducts = params.categoryId
    ? products.filter((product) => product.categoryId === params.categoryId)
    : products;

  const selectedCategory = subMenu?.find(
    ({ categoryId }) => categoryId === params.categoryId,
  );

  const categoryLabel = selectedCategory?.label ?? 'women';

  const src = `/images/banners/sale_${categoryLabel}_banner`;
  const altText = `${categoryLabel}SalesBannerAltText`;

  return (
    <>
      {params.category && (
        <MetaTags metaTitle={`${language.sale} ${language[categoryLabel]}`} />
      )}

      <section className="container collection-page">
        <Breadcrumbs routeList={saleBreadcrumbsList} subMenu={subMenu} />

        <div className="collection-page-container">
          {subMenu && (
            <CollectionAside
              ariaLabelledby={ariaLabelledby}
              subMenu={subMenu}
              headerText={language.sale}
              category=""
              onReset={() => {
                refetchSubMenu();
              }}
              language={language}
              getProductLink={(productId) => `/${ShopPath.Sale}/${productId}`}
              linkTo={`/${ShopPath.Sale}`}
            />
          )}
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch()}
          >
            <section className="collection-page-content">
              <Picture
                src={`${src}.jpg`}
                srcSet={`${src}.avif`}
                alt={language[altText]}
                ratio="16:9"
                priority
                className="collection-banner"
              />
              <div className="product-toolbar">
                <DisplayControls
                  onSetDisplay={setProductView}
                  displayControlList={productViewIconList}
                  activeDisplay={productView}
                />
              </div>
              <ProductCartList
                products={selectedProducts}
                showSizeOverlay
                getProductLink={getProductLink}
                productView={productView}
              />
            </section>
          </ErrorBoundary>
        </div>
      </section>
    </>
  );
};

export default Salespage;

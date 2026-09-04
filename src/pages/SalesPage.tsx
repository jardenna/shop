import { useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs, {
  breadcrumbsListProps,
} from '../components/breadcrumbs/Breadcrumbs';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import NotFoundError from '../components/NotFoundError';
import Picture from '../components/Picture';
import SkeletonCollectionPage from '../components/skeleton/skeletonCollection/SkeletonCollectionPage';
import { useLanguage } from '../features/language/useLanguage';
import { getProductLink } from '../features/shop/cartUtils';
import CollectionAside from '../features/shop/components/CollectionAside';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import ProductCartList from '../features/shop/components/ProductCartList';
import { useGetSaleProductsQuery } from '../features/shop/shopApiSlice';
import MetaTags from '../layout/MetaTags';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const Salespage = () => {
  const ariaLabelledby = useId();
  const params = useParams();
  const { language } = useLanguage();

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
    { label: 'kids', categoryId: '680091c674682cc14143e243' },
    { label: 'men', categoryId: '68145e5d1ac3dd2a44867016' },
    { label: 'women', categoryId: '680091d574682cc14143e248' },
  ];

  const selectedProducts = params.categoryId
    ? products.filter((product) => product.categoryId === params.categoryId)
    : products;

  const saleBreadcrumbsList: breadcrumbsListProps[] = [
    { path: ShopPath.SaleCategory },
  ];

  const selectedCategory = subMenu.find(
    ({ categoryId }) => categoryId === params.categoryId,
  );

  const categoryLabel = selectedCategory?.label ?? 'women';

  const src = `/images/banners/sale_${categoryLabel}_banner`;
  const altText = `${params.category}BannerAltText`;

  return (
    <>
      {params.category && (
        <MetaTags metaTitle={`${language.sale} ${language[categoryLabel]}`} />
      )}

      <section className="container collection-page">
        <Breadcrumbs routeList={saleBreadcrumbsList} subMenu={subMenu} />

        <div className="collection-page-container">
          <CollectionAside
            ariaLabelledby={ariaLabelledby}
            subMenu={subMenu}
            headerText={language.sale}
            category=""
            onReset={() => {
              console.log(123);
            }}
            language={language}
            getProductLink={(productId) => `/${ShopPath.Sale}/${productId}`}
            linkTo={`/${ShopPath.Sale}`}
          />
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
              <ProductCartList
                products={selectedProducts}
                productView="grid"
                showSizeOverlay
                getProductLink={getProductLink}
              />
            </section>
          </ErrorBoundary>
        </div>
      </section>
    </>
  );
};

export default Salespage;

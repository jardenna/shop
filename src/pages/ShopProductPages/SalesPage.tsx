import { useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { saleBreadcrumbsList } from '../../components/breadcrumbs/breadcrumbsLists';
import EmptyState from '../../components/emptyState/EmptyState';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Picture from '../../components/Picture';
import SkeletonShopProducts from '../../components/skeleton/skeletonShopProducts/SkeletonShopProducts';
import { useLanguage } from '../../features/language/useLanguage';
import ProductAside from '../../features/shop/components/ProductAside';
import ProductCartList from '../../features/shop/components/ProductCartList';
import ProductToolbar from '../../features/shop/components/ProductToolbar';
import {
  useGetSaleMenuQuery,
  useGetSalesProductsByIdQuery,
} from '../../features/shop/shopApiSlice';
import { localStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import MetaTags from '../../layout/MetaTags';
import { ShopPath } from '../../layout/nav/enums';
import MainPageContainer from '../pageContainer/MainPageContainer';

const Salespage = () => {
  const ariaLabelledby = useId();
  const { categoryId } = useParams();
  const { language } = useLanguage();

  const [productView, setProductView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const { data: subMenu, refetch: refetchSubMenu } = useGetSaleMenuQuery();

  const {
    data: saleProducts,
    isError,
    error,
    refetch,
  } = useGetSalesProductsByIdQuery(categoryId ?? '');

  if (!saleProducts) {
    return <SkeletonShopProducts count={4} />;
  }

  if (isError) {
    return (
      <MainPageContainer heading={language.sale}>
        <ErrorBoundaryFallback
          error={error}
          resetErrorBoundary={() => refetch()}
        />
      </MainPageContainer>
    );
  }

  if (saleProducts.length === 0) {
    return (
      <MainPageContainer heading={language.sale}>
        <EmptyState
          emptyStateTitle={language.noSaleTitle}
          emptyStateText={language.noSaleText}
          src="/images/shoppingBags/sale_shopping_bag"
          emptyStateCtaText={language.noSaleCta}
        />
      </MainPageContainer>
    );
  }

  const selectedCategory = subMenu?.find((a) => a.categoryId === categoryId);

  const categoryLabel = selectedCategory?.label ?? 'all';
  const pageHeading = `${language.sale} ${language[categoryLabel]}`;

  const src = `/images/banners/sale_${categoryLabel}_banner`;
  const altText = `${categoryLabel}SalesBannerAltText`;

  return (
    <>
      <MetaTags metaTitle={pageHeading} />
      <section
        className="container shop-product-page"
        aria-labelledby={ariaLabelledby}
      >
        <Breadcrumbs routeList={saleBreadcrumbsList} subMenu={subMenu} />

        <div className="shop-product-page-container">
          {subMenu && (
            <ProductAside
              className="sale-aside"
              ariaLabelledby={ariaLabelledby}
              subMenu={subMenu}
              headerText={pageHeading}
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
            <section>
              <Picture
                src={`${src}.jpg`}
                srcSet={src}
                alt={language[altText]}
                ratio="16:9"
                priority
                className="shop-product-banner"
              />
              <ProductToolbar
                setProductView={setProductView}
                activeDisplay={productView}
              />

              <ProductCartList
                products={saleProducts}
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

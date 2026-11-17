import { useParams } from 'react-router';
import EmptyState from '../../components/emptyState/EmptyState';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import SkeletonShopProducts from '../../components/skeleton/skeletonShopProducts/SkeletonShopProducts';
import { useLanguage } from '../../features/language/useLanguage';
import ProductToolbar from '../../features/shop/components/ProductToolbar';
import {
  useGetSaleMenuQuery,
  useGetSalesProductsByIdQuery,
} from '../../features/shop/shopApiSlice';
import { localStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { ShopPath } from '../../layout/nav/enums';
import MainPageContainer from '../pageContainer/MainPageContainer';
import ProductPageContainer from './ProductPageContainer';
import { saleBreadcrumbsList } from '../../components/breadcrumbs/breadcrumbsLists';

const Salespage = () => {
  // const ariaLabelledby = useId();
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

  const src = `/images/banners/sale_${categoryLabel}_banner`;
  const altText = `${categoryLabel}SalesBannerAltText`;
  const pageHeading = `${language.sale} ${language[categoryLabel]}`;

  return (
    subMenu && (
      <ProductPageContainer
        products={saleProducts}
        pageHeading={pageHeading}
        productView={productView}
        breadcrumbsList={saleBreadcrumbsList}
        src={src}
        altText={altText}
        subMenu={subMenu}
        refetch={refetch}
        refetchSubMenu={refetchSubMenu}
        path={ShopPath.Sale}
        linkTo={`/${ShopPath.Sale}`}
      >
        <ProductToolbar
          setProductView={setProductView}
          activeDisplay={productView}
        />
      </ProductPageContainer>
    )
  );
};

export default Salespage;

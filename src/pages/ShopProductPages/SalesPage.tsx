import { useId } from 'react';
import { useParams } from 'react-router';
import { saleBreadcrumbsList } from '../../components/breadcrumbs/breadcrumbsLists';
import NotFoundError from '../../components/NotFoundError';
import SkeletonShopProducts from '../../components/skeleton/skeletonShopProducts/SkeletonShopProducts';
import { useLanguage } from '../../features/language/useLanguage';
import ProductToolbar from '../../features/shop/components/ProductToolbar';
import {
  useGetSaleMenuQuery,
  useGetSalesProductsByIdQuery,
} from '../../features/shop/shopApiSlice';
import { localStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { ShopPath } from '../../layout/nav/enums';
import CollectionPageContainer from './CollectionPageContainer';

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

  if (isError) {
    return <NotFoundError error={error} />;
  }

  if (!saleProducts) {
    return <SkeletonShopProducts count={4} />;
  }

  const selectedCategory = subMenu?.find((a) => a.categoryId === categoryId);

  const categoryLabel = selectedCategory?.label ?? 'all';
  const pageHeading = `${language.sale} ${language[categoryLabel]}`;

  const src = `/images/banners/sale_${categoryLabel}_banner`;
  const altText = `${categoryLabel}SalesBannerAltText`;

  return (
    <section
      className="container shop-product-page sales-page"
      aria-labelledby={ariaLabelledby}
    >
      <CollectionPageContainer
        ariaLabelledby={ariaLabelledby}
        altText={language[altText]}
        breadcrumbsList={saleBreadcrumbsList}
        refetch={refetch}
        pageHeading={pageHeading}
        products={saleProducts}
        productView={productView}
        path={`/${ShopPath.Sale}`}
        src={src}
        subMenu={subMenu ?? []}
        refetchSubMenu={refetchSubMenu}
      >
        <ProductToolbar
          setProductView={setProductView}
          activeDisplay={productView}
        />
      </CollectionPageContainer>
    </section>
  );
};

export default Salespage;

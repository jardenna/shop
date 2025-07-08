import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { routeBreadcrumbs } from '../components/breadcrumbs/breadcrumbsRoutes';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Img from '../components/Img';
import Skeleton from '../components/skeleton/Skeleton';
import useLanguage from '../features/language/useLanguage';
import CollectionAside from '../features/shop/components/CollectionAside';
import FilterPanel from '../features/shop/components/FilterPanel';
import ProductCardList from '../features/shop/components/ProductCardList';
import ProductViews from '../features/shop/components/ProductViews';
import {
  useGetProductsQuery,
  useGetShopMenuQuery,
} from '../features/shop/shopApiSlice';
import useLocalStorage, { localStorageKeys } from '../hooks/useLocalStorage';
import MetaTags from '../layout/nav/MetaTags';
import './CollectionPage.styles.scss';

const CollectionPage = () => {
  const { language } = useLanguage();
  const { category, categoryId } = useParams();

  // Redux hooks
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    pageSize: '100',
    mainCategory: category,
    subCategoryId: categoryId || '',
  });

  const {
    data: subMenu,
    isLoading: subMenuLoading,
    refetch: refetchSubMenu,
  } = useGetShopMenuQuery(category || 'women');

  const categoryText = category ? language[category] : '';

  const [productView, setProuctView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  return (
    <>
      <MetaTags metaTitle={category} />
      <article className="container page collection-page">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <Breadcrumbs
              routeList={routeBreadcrumbs}
              currentLabel={categoryText}
            />
            <div className="collection-page-container">
              <CollectionAside
                subMenu={subMenu || null}
                category={category || 'women'}
                isLoading={subMenuLoading}
                onReset={() => refetchSubMenu()}
                asideHeading={categoryText}
              />

              <ErrorBoundary
                FallbackComponent={ErrorBoundaryFallback}
                onReset={() => refetch()}
              >
                <div>
                  <Img
                    src={`/images/collections/${category}/banner.jpg`}
                    alt=""
                  />

                  <section className="product-toolbar">
                    <ProductViews
                      productCount={products?.productCount || null}
                      onSelectProductView={setProuctView}
                    />
                    <FilterPanel />
                  </section>

                  {products && (
                    <ProductCardList
                      products={products.products}
                      displayList={productView === 'list'}
                    />
                  )}
                </div>
              </ErrorBoundary>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default CollectionPage;

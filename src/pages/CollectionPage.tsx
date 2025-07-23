import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Img from '../components/Img';
import Skeleton from '../components/skeleton/Skeleton';
import TableGridList from '../components/sortTable/TableGridList';
import useLanguage from '../features/language/useLanguage';
import CollectionAside from '../features/shop/components/CollectionAside';
import FilterPanel from '../features/shop/components/FilterPanel';
import ProductCard from '../features/shop/components/ProductCard';
import useSubMenu from '../features/shop/hooks/useSubMenu';
import { useGetProductsQuery } from '../features/shop/shopApiSlice';
import useLocalStorage, { localStorageKeys } from '../hooks/useLocalStorage';
import MetaTags from '../layout/nav/MetaTags';
import { IconName } from '../types/enums';
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

  const { subMenu, subMenuLoading, refetchSubMenu } = useSubMenu({ category });

  const categoryText = category ? language[category] : '';

  const [productView, setProuctView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const productViewIconList = [
    {
      iconName: IconName.LayoutList,
      title: language.list,
      ariaLabel: language.viewAsList,
      padding: 'grid',
    },
    {
      iconName: IconName.LayoutGrid,
      title: language.grid,
      ariaLabel: language.viewAsGrid,
      padding: 'list',
    },
  ];

  return (
    <>
      <MetaTags metaTitle={category} />
      <article className="container page collection-page">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {subMenu && (
              <Breadcrumbs
                routeList={breadcrumbsList}
                subMenu={subMenu}
                productName=""
              />
            )}
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
                <div className="collection-page-content">
                  <Img
                    src={`/images/collections/${category}/banner.jpg`}
                    alt=""
                  />
                  <section className="product-toolbar">
                    <TableGridList
                      onSetPadding={setProuctView}
                      tableGridIconList={productViewIconList}
                      isActive={productView}
                    />
                    <FilterPanel />
                  </section>
                  <section
                    className={`product-card-list ${productView === 'list' ? 'list' : ''}`}
                  >
                    {products &&
                      products.products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          displayList={productView === 'list'}
                          categoryId={categoryId}
                        />
                      ))}
                  </section>
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

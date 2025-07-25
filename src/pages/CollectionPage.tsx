import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import DisplayControls from '../components/DisplayControls';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Img from '../components/Img';
import Skeleton from '../components/skeleton/Skeleton';
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
import { sizeList } from '../utils/productLists';

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
      ariaLabel: language.list,
      display: 'list',
    },
    {
      iconName: IconName.LayoutGrid,
      title: language.grid,
      ariaLabel: language.grid,
      display: 'grid',
    },
  ];
  console.log(sizeList);
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
                    <DisplayControls
                      onSetDisplay={setProuctView}
                      displayControlList={productViewIconList}
                      isActive={productView}
                      ariaLabel={language.productDisplay}
                    />
                    <FilterPanel />
                  </section>
                  <article
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
                  </article>
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

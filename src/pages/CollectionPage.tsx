import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import DisplayControls from '../components/DisplayControls';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Img from '../components/Img';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';
import CollectionAside from '../features/shop/components/CollectionAside';
import FilterPanel from '../features/shop/components/FilterPanel';
import ProductCard from '../features/shop/components/ProductCard';
import ProductCardGridContent from '../features/shop/components/ProductCardGridContent';
import ProductCardListContent from '../features/shop/components/ProductCardListContent';
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
      iconName: IconName.LayoutGrid,
      title: language.grid,
      ariaLabel: language.grid,
      display: 'grid',
    },
    {
      iconName: IconName.LayoutList,
      title: language.list,
      ariaLabel: language.list,
      display: 'list',
    },
  ];

  return (
    <>
      <MetaTags metaTitle={category} />
      <article className="container page collection-page">
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
              <Img src={`/images/collections/${category}/banner.jpg`} alt="" />
              <section className="product-toolbar">
                <DisplayControls
                  onSetDisplay={setProuctView}
                  displayControlList={productViewIconList}
                  isActive={productView}
                  ariaLabel={language.productDisplay}
                />
                <span>
                  {products?.productCount} {language.itemLabel}
                </span>
                <FilterPanel />
              </section>{' '}
              {isLoading ? (
                <SkeletonCardList count={8} />
              ) : (
                <article
                  className={`product-card-list ${productView === 'list' ? 'list' : ''}`}
                >
                  {products &&
                    products.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        linkTo={
                          categoryId ? product.id : `allProducts/${product.id}`
                        }
                        product={product}
                        showSizeOverlay={productView !== 'list'}
                      >
                        {productView === 'list' ? (
                          <ProductCardListContent product={product} />
                        ) : (
                          <ProductCardGridContent product={product} />
                        )}
                      </ProductCard>
                    ))}
                </article>
              )}
            </div>
          </ErrorBoundary>
        </div>
      </article>
    </>
  );
};

export default CollectionPage;

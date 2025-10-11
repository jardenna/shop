import { ErrorBoundary } from 'react-error-boundary';
import { useParams, useSearchParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import DisplayControls from '../components/DisplayControls';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Pagination from '../components/pagination/Pagination';
import Picture from '../components/Picture';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';
import CollectionAside from '../features/shop/components/CollectionAside';
import CollectionPageHeader from '../features/shop/components/CollectionPageHeader';
import FilterPanel from '../features/shop/components/FilterPanel';
import ProductCard from '../features/shop/components/ProductCard';
import ProductCardGridContent from '../features/shop/components/ProductCardGridContent';
import ProductCardListContent from '../features/shop/components/ProductCardListContent';
import useSubMenu from '../features/shop/hooks/useSubMenu';
import { useGetProductsQuery } from '../features/shop/shopApiSlice';
import type { FilterValuesType } from '../hooks/useFilterParams';
import useFilterParams from '../hooks/useFilterParams';
import useLocalStorage, { localStorageKeys } from '../hooks/useLocalStorage';
import useMediaQuery from '../hooks/useMediaQuery ';
import { LinkText } from '../layout/nav/enums';
import MetaTags from '../layout/nav/MetaTags';
import { IconName } from '../types/enums';
import { colorList, sortColorsByTranslation } from '../utils/colorUtils';
import { sortSizesDynamic } from '../utils/sizeUtils';
import { getFilterSummary, pageParamKey } from '../utils/utils';
import './CollectionPage.styles.scss';

export type FilterKeys = 'sizes' | 'colors' | 'brand';

const CollectionPage = () => {
  const { category, categoryId } = useParams();
  const { language } = useLanguage();
  const { isMobileSize, isSmallMobileSize } = useMediaQuery();
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get(pageParamKey);

  const initialFilters: FilterValuesType<string> = {
    sizes: [],
    colors: [],
    brand: [],
  };

  const {
    filterValues,
    onFilterChange,
    onRemoveFilterTag,
    onClearAllFilters,
    onClearSingleFilter,
  } = useFilterParams(initialFilters);

  const { subMenu, subMenuLoading, refetchSubMenu } = useSubMenu(
    category as LinkText,
  );

  const [productView, setProuctView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const sortedTranslatedColors = sortColorsByTranslation(colorList, language);
  const categoryText = category ? language[category] : '';

  // Redux hooks
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    pageSize: '10',
    page: pageParam || '1',
    colors: filterValues.colors,
    brand: filterValues.brand,
    sizes: filterValues.sizes,
    mainCategory: category,
    subCategoryId: categoryId || '',
  });

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

  const filtersCount = getFilterSummary(filterValues);
  const src = `/images/banners/${category}_banner`;
  const altText = `${category}BannerAltText`;

  return (
    <>
      {category && <MetaTags metaTitle={language[category]} />}
      <article className="container collection-page">
        {subMenu && (
          <Breadcrumbs
            routeList={breadcrumbsList}
            subMenu={subMenu}
            productName=""
          />
        )}
        <article className="collection-page-container">
          {isMobileSize ? (
            <CollectionPageHeader
              ariaLabel={language.page}
              headerText={categoryText}
            />
          ) : (
            <CollectionAside
              subMenu={subMenu || null}
              category={category || 'women'}
              isLoading={subMenuLoading}
              onReset={() => refetchSubMenu()}
              asideHeading={categoryText}
              language={language}
            />
          )}
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch()}
          >
            <div className="collection-page-content">
              {!isMobileSize && (
                <Picture
                  src={`${src}.jpg`}
                  srcSet={`${src}.avif`}
                  alt={language[altText]}
                />
              )}
              <section className="product-toolbar">
                <DisplayControls
                  onSetDisplay={setProuctView}
                  displayControlList={productViewIconList}
                  isActive={productView}
                  ariaLabel={language.productDisplay}
                />

                {products && (
                  <>
                    <span>
                      {products.productCount} {language.itemLabel}
                    </span>
                    <FilterPanel
                      onClearSingleFilter={onClearSingleFilter}
                      filtersCount={filtersCount}
                      onChange={onFilterChange}
                      values={filterValues}
                      availableBrands={products.availableBrands}
                      availableSizes={sortSizesDynamic(products.availableSizes)}
                      colors={sortedTranslatedColors}
                      language={language}
                      onRemoveFilterTag={onRemoveFilterTag}
                      onClearAllFilters={onClearAllFilters}
                      productCount={products.productCount}
                    />
                  </>
                )}
              </section>
              {isLoading && <SkeletonCardList count={8} />}
              <article
                className={`product-card-list ${productView === 'list' && !isSmallMobileSize ? 'list' : ''}`}
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
              {products && (
                <Pagination
                  productsPerPage={10}
                  productsCount={products.productCount}
                />
              )}
            </div>
          </ErrorBoundary>
        </article>
      </article>
    </>
  );
};

export default CollectionPage;

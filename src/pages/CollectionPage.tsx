import { useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import type { BaseShopProductsParams } from '../app/api/apiTypes/shopApiTypes';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import NotFoundError from '../components/NotFoundError';
import { usePaginationText } from '../components/pagination/hooks/usePaginationText';
import { useScrollOnPagination } from '../components/pagination/hooks/useScrollOnPagination';
import Pagination from '../components/pagination/Pagination';
import Picture from '../components/Picture';
import SkeletonCollectionPage from '../components/skeleton/skeletonCollection/SkeletonCollectionPage';
import { useLanguage } from '../features/language/useLanguage';
import { getProductLink } from '../features/shop/cartUtils';
import CollectionAside from '../features/shop/components/CollectionAside';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import FilterPanel, {
  InitialFilters,
} from '../features/shop/components/FilterPanel';
import ProductCartList from '../features/shop/components/ProductCartList';
import ProductToolbar from '../features/shop/components/ProductToolbar';
import { useSubMenu } from '../features/shop/hooks/useSubMenu';
import { useGetProductsQuery } from '../features/shop/shopApiSlice';
import { useAnnounce } from '../hooks/useAnnounce';
import { localStorageKeys, useLocalStorage } from '../hooks/useLocalStorage';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useSearchParamsState } from '../hooks/useSearchParamsState';
import MetaTags from '../layout/MetaTags';
import { LinkText, ShopPath } from '../layout/nav/enums';
import { OptionType } from '../types/types';
import { colorList, sortColorsByTranslation } from '../utils/colorUtils';
import { productViewIconList } from '../utils/productViewIconList';
import { sortSizesDynamic } from '../utils/sizeUtils';
import './collectionPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

export type FilterKeys = keyof BaseShopProductsParams;

const CollectionPage = () => {
  const ariaLabelledby = useId();
  const { category, categoryId } = useParams();
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
  const { subMenu, refetchSubMenu } = useSubMenu(category as LinkText);

  const [productView, setProductView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const sortedTranslatedColors = sortColorsByTranslation(colorList, language);
  const categoryText = category ? language[category] : '';

  // Redux hooks
  const initialFilters: InitialFilters = {
    sizes: [] as string[],
    colors: [] as string[],
    brand: [] as string[],
    minPrice: '',
    maxPrice: '',
  };

  const {
    filterParams,
    toggleFilterParam,
    setFilterParams,
    onRemoveFilterTag,
    onClearSingleFilter,
    onClearAllFilters,
    page,
    itemsPerPage,
    setPage,
    updatePagination,
    searchKey,
  } = useSearchParamsState(initialFilters);

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery({
    productsPerPage: itemsPerPage,
    page: page.toString(),
    colors: filterParams.colors,
    brand: filterParams.brand,
    sizes: filterParams.sizes,
    minPrice: filterParams.minPrice,
    maxPrice: filterParams.maxPrice,
    mainCategory: category,
    subCategoryId: categoryId || '',
  });

  const itemCount = products ? products.productCount : 0;
  const totalBtns = products?.pages ?? 1;
  const src = `/images/banners/${category}_banner`;
  const altText = `${category}BannerAltText`;

  const { infoText, paginationMobileText, ariaLiveText } = usePaginationText({
    page,
    itemsPerPage,
    itemCount,
    totalBtns,
    language,
  });

  const announce = useAnnounce([page, itemsPerPage, searchKey]);

  const { scrollToRef, setShouldScroll } = useScrollOnPagination({
    isLoading,
  });

  const handleSelectCount = (option: OptionType) => {
    const newCount = Number(option.value);
    updatePagination(1, newCount);
    setShouldScroll(true);
  };

  const handlePagination = (id: number) => {
    // Early exit so current page doesn't spam history or rerender
    if (id === page) {
      return;
    }
    setPage(id);
    setShouldScroll(true);
  };

  if (isError) {
    return (
      <MainPageContainer heading="collection">
        <NotFoundError error={error} />
      </MainPageContainer>
    );
  }

  if (!products) {
    return <SkeletonCollectionPage count={4} />;
  }

  if (itemCount === 0) {
    return (
      <EmptyState
        emptyStateText={language.noProductText}
        emptyStateTitle={language.noProductTitle}
        onClick={onClearAllFilters}
        emptyStateCtaText={language.clearAllFilters}
        src="/images/shoppingBags/collection_shopping_bag"
        pageHeading={
          category
            ? `${language.collection} ${language[category]}`
            : language.collection
        }
      />
    );
  }

  return (
    <>
      {category && (
        <MetaTags metaTitle={`${language.collection} ${language[category]}`} />
      )}

      <section
        className="container collection-page"
        ref={scrollToRef}
        aria-labelledby={ariaLabelledby}
      >
        {subMenu && (
          <Breadcrumbs
            routeList={breadcrumbsList}
            subMenu={subMenu}
            productName=""
          />
        )}
        <div className="collection-page-container">
          {!isMobileSize && subMenu && (
            <CollectionAside
              headerText={categoryText}
              ariaLabelledby={ariaLabelledby}
              subMenu={subMenu}
              category={category || 'women'}
              onReset={() => refetchSubMenu()}
              language={language}
              getProductLink={(productId) =>
                `/${ShopPath.Collection}/${category}/${productId}`
              }
            />
          )}

          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch()}
          >
            <section className="collection-page-content">
              {!isMobileSize && (
                <Picture
                  src={`${src}.jpg`}
                  srcSet={`${src}.avif`}
                  alt={language[altText]}
                  ratio="16:9"
                  priority
                />
              )}
              <div className="product-toolbar">
                <ProductToolbar
                  setProductView={setProductView}
                  displayControlList={productViewIconList}
                  activeDisplay={productView}
                  infoText={infoText}
                  announce={announce}
                  ariaLiveText={ariaLiveText}
                />
                <FilterPanel
                  initialFilters={initialFilters}
                  sizes={sortSizesDynamic(products.availableSizes)}
                  brands={products.availableBrands}
                  colors={sortedTranslatedColors}
                  language={language}
                  productCount={products.productCount}
                  onReset={() => refetch()}
                  values={filterParams}
                  toggleValue={toggleFilterParam}
                  setValue={setFilterParams}
                  onRemoveFilterTag={onRemoveFilterTag}
                  onClearAllFilters={onClearAllFilters}
                  onClearSingleFilter={onClearSingleFilter}
                />
              </div>
              <ProductCartList
                products={products.products}
                productView={productView}
                showSizeOverlay={productView !== 'list'}
                getProductLink={getProductLink}
              />
              {itemCount > 0 && (
                <Pagination
                  refetch={refetch}
                  totalBtns={totalBtns}
                  isError={isError}
                  page={page}
                  onPagination={handlePagination}
                  onSelectCount={handleSelectCount}
                  totalCount={itemCount}
                  paginationMobileText={paginationMobileText}
                  defaultValue={{
                    value: itemsPerPage.toString(),
                    label: itemsPerPage.toString(),
                  }}
                />
              )}
            </section>
          </ErrorBoundary>
        </div>
      </section>
    </>
  );
};

export default CollectionPage;

import { useParams } from 'react-router';
import type { BaseShopProductsParams } from '../../app/api/apiTypes/shopApiTypes';
import { collectionBreadcrumbsList } from '../../components/breadcrumbs/breadcrumbsLists';
import FilterPanel from '../../components/filterPanel/FilterPanel';
import LiveAnnouncement from '../../components/LiveAnnouncement';
import NotFoundError from '../../components/NotFoundError';
import { usePaginationText } from '../../components/pagination/hooks/usePaginationText';
import { useTogglePanel } from '../../components/panel/useTogglePanel';
import SkeletonShopProducts from '../../components/skeleton/skeletonShopProducts/SkeletonShopProducts';
import { useLanguage } from '../../features/language/useLanguage';
import CollectionFilterForm from '../../features/shop/components/CollectionFilterForm';
import ProductToolbar from '../../features/shop/components/ProductToolbar';
import {
  useGetProductsQuery,
  useGetShopMenuQuery,
} from '../../features/shop/shopApiSlice';
import { useAnnounce } from '../../hooks/useAnnounce';
import { localStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import { ShopPath } from '../../layout/nav/enums';
import { colorList, sortColorsByTranslation } from '../../utils/colorUtils';
import { sortSizesDynamic } from '../../utils/sizeUtils';
import { getFilterSummary } from '../../utils/utils';
import CollectionPageContainer from './CollectionPageContainer';
import './shopProductPage.styles.scss';

export type FilterKeys = keyof BaseShopProductsParams;
export interface InitialFilters {
  brand: string[];
  colors: string[];
  maxPrice: string;
  minPrice: string;
  sizes: string[];
}

const CollectionPage = () => {
  const { category, categoryId } = useParams();
  const { language } = useLanguage();
  const { data: subMenu, refetch: refetchSubMenu } = useGetShopMenuQuery(
    category ?? 'woman',
  );

  const [productView, setProductView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const sortedTranslatedColors = sortColorsByTranslation(colorList, language);
  const pageHeading = category ? language[category] : '';

  // Redux hooks
  const initialFilters: InitialFilters = {
    sizes: [],
    colors: [],
    brand: [],
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

  const { isPanelShown, onTogglePanel, onHidePanel } = useTogglePanel();

  const { infoText, paginationMobileText, ariaLiveText } = usePaginationText({
    page,
    itemsPerPage,
    itemCount,
    totalBtns,
    language,
  });

  const announce = useAnnounce([page, itemsPerPage, searchKey]);

  if (isError) {
    return (
      <NotFoundError
        error={error}
        btnLabel="collection"
        path={`/${ShopPath.Collection}`}
      />
    );
  }

  if (!products) {
    return <SkeletonShopProducts count={4} />;
  }

  const filtersCount = getFilterSummary(filterParams);
  const totalFiltersCount = filtersCount.totalCount;

  return (
    <CollectionPageContainer
      altText={language[altText]}
      paginationMobileText={paginationMobileText}
      breadcrumbsList={collectionBreadcrumbsList}
      refetch={refetch}
      totalBtns={totalBtns}
      isError={isError}
      error={error}
      isLoading={isLoading}
      itemCount={itemCount}
      pageHeading={pageHeading}
      products={products.products}
      productView={productView}
      category={category ?? 'women'}
      path={`/${ShopPath.Collection}`}
      src={src}
      subMenu={subMenu ?? []}
      refetchSubMenu={refetchSubMenu}
    >
      <ProductToolbar
        setProductView={setProductView}
        activeDisplay={productView}
      >
        <LiveAnnouncement
          infoText={infoText}
          announce={announce}
          ariaLiveText={ariaLiveText}
        />
        <FilterPanel
          onHidePanel={onHidePanel}
          isPanelShown={isPanelShown}
          onTogglePanel={onTogglePanel}
          portalId="filter-products"
          language={language}
          onReset={() => refetch()}
          totalFiltersCount={totalFiltersCount}
          panelHeading={language.filterProducts}
          ariaLabel={language.filterProducts}
        >
          <CollectionFilterForm
            initialFilters={initialFilters}
            sizes={sortSizesDynamic(products.availableSizes)}
            brands={products.availableBrands}
            colors={sortedTranslatedColors}
            language={language}
            productCount={products.productCount}
            values={filterParams}
            toggleValue={toggleFilterParam}
            setValue={setFilterParams}
            onRemoveFilterTag={onRemoveFilterTag}
            onClearAllFilters={onClearAllFilters}
            onClearSingleFilter={onClearSingleFilter}
            onHidePanel={onHidePanel}
          />
        </FilterPanel>
      </ProductToolbar>
    </CollectionPageContainer>
  );
};

export default CollectionPage;

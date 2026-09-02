import { useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  ProductMenuResponse,
  ShopAllProductsResponse,
} from '../../../../app/api/apiTypes/shopApiTypes';
import Breadcrumbs from '../../../../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../../../../components/breadcrumbs/breadcrumbsLists';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import { usePaginationText } from '../../../../components/pagination/hooks/usePaginationText';
import { useScrollOnPagination } from '../../../../components/pagination/hooks/useScrollOnPagination';
import Pagination from '../../../../components/pagination/Pagination';
import Picture from '../../../../components/Picture';
import { useAnnounce } from '../../../../hooks/useAnnounce';
import {
  localStorageKeys,
  useLocalStorage,
} from '../../../../hooks/useLocalStorage';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import { useSearchParamsState } from '../../../../hooks/useSearchParamsState';
import { LinkText } from '../../../../layout/nav/enums';
import { IconName } from '../../../../types/enums';
import { OptionType } from '../../../../types/types';
import {
  colorList,
  sortColorsByTranslation,
} from '../../../../utils/colorUtils';
import { sortSizesDynamic } from '../../../../utils/sizeUtils';
import { useLanguage } from '../../../language/useLanguage';
import CollectionAside from '../../../shop/components/CollectionAside';
import CollectionPageHeader from '../../../shop/components/CollectionPageHeader';
import EmptyState from '../../../shop/components/emptyState/EmptyState';
import FilterPanel, {
  InitialFilters,
} from '../../../shop/components/FilterPanel';
import ProductCartList from '../../../shop/components/ProductCartList';
import ProductToolbar from '../../../shop/components/ProductToolbar';
import './_product-listing.scss';

interface ProductListingProps {
  category: LinkText;
  isError: boolean;
  isLoading: boolean;
  pageHeading: string;
  products: ShopAllProductsResponse;
  subMenu: ProductMenuResponse[];
  refetch: () => void;
  refetchSubMenu: () => void;
}

const ProductListing = ({
  products,
  isLoading,
  refetch,
  category,
  isError,
  subMenu,
  refetchSubMenu,
  pageHeading,
}: ProductListingProps) => {
  const ariaLabelledby = useId();
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();

  const [productView, setProductView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const sortedTranslatedColors = sortColorsByTranslation(colorList, language);
  const categoryText = language[category];

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

  const itemCount = products.productCount;
  const totalBtns = products.pages;
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

  if (itemCount === 0) {
    return (
      <EmptyState
        emptyStateText={language.noProductResult}
        emptyStateTitle={language.noProductResultTitle}
        onClick={onClearAllFilters}
        emptyStateCtaText={language.clearAllFilters}
        src="/images/shoppingBags/shopping_bag"
        pageHeading={pageHeading}
      />
    );
  }

  return (
    <section
      className="container product-listing"
      ref={scrollToRef}
      aria-labelledby={ariaLabelledby}
    >
      <Breadcrumbs
        routeList={breadcrumbsList}
        subMenu={subMenu}
        productName=""
      />

      <div className="product-listing-container">
        <section>
          <CollectionPageHeader
            headerText={pageHeading}
            ariaLabelledby={ariaLabelledby}
          />
          {!isMobileSize && (
            <CollectionAside
              subMenu={subMenu}
              category={category}
              onReset={() => {
                refetchSubMenu();
              }}
              language={language}
            />
          )}
        </section>
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={() => {
            refetch();
          }}
        >
          <section className="product-listing-content">
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
                onSetDisplay={setProductView}
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
                onReset={() => {
                  refetch();
                }}
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
  );
};

export default ProductListing;

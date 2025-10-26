import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import Pagination from '../components/pagination/Pagination';
import { type PageCountOptions } from '../components/pagination/PaginationSelect';
import usePaginationParams from '../components/pagination/usePaginationParams';
import Picture from '../components/Picture';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';
import CollectionAside from '../features/shop/components/CollectionAside';
import CollectionPageHeader from '../features/shop/components/CollectionPageHeader';
import NoProductsFound from '../features/shop/components/NoProductsFound';
import ProductCardList from '../features/shop/components/ProductCardList';
import ProductToolbar from '../features/shop/components/ProductToolbar';
import useSubMenu from '../features/shop/hooks/useSubMenu';
import { useGetProductsQuery } from '../features/shop/shopApiSlice';
import type { FilterValuesType } from '../hooks/useFilterParams';
import useFilterParams from '../hooks/useFilterParams';
import useLocalStorage, { localStorageKeys } from '../hooks/useLocalStorage';
import useMediaQuery from '../hooks/useMediaQuery';
import { LinkText } from '../layout/nav/enums';
import MetaTags from '../layout/nav/MetaTags';
import { IconName } from '../types/enums';
import { colorList, sortColorsByTranslation } from '../utils/colorUtils';
import { sortSizesDynamic } from '../utils/sizeUtils';
import { ariaInfoTitle, getFilterSummary } from '../utils/utils';
import './CollectionPage.styles.scss';

export type FilterKeys = 'sizes' | 'colors' | 'brand';

const CollectionPage = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { category, categoryId } = useParams();
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
  const { page, productsPerPage, setPage, updatePagination } =
    usePaginationParams();

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

  const [productView, setProductView] = useLocalStorage(
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
    productsPerPage,
    page: page.toString(),
    colors: filterValues.colors,
    brand: filterValues.brand,
    sizes: filterValues.sizes,
    mainCategory: category,
    subCategoryId: categoryId || '',
  });

  const productCount = products ? products.productCount : 0;
  const totalBtns = products?.pages ?? 1;

  const src = `/images/banners/${category}_banner`;
  const altText = `${category}BannerAltText`;
  const filtersCount = getFilterSummary(filterValues);

  const isShowingAll = productsPerPage >= productCount && productCount > 0;
  const startItem = isShowingAll ? 1 : (page - 1) * productsPerPage + 1;
  const endItem = isShowingAll
    ? productCount
    : Math.min(page * productsPerPage, productCount);

  const productsText = language.products.toLowerCase();
  const showingText = language.showing;
  const ofText = language.of;
  const infoText = `${showingText} ${startItem}–${endItem} ${ofText} ${productCount} ${productsText}.`;

  const hasMounted = useRef(false);
  const [announce, setAnnounce] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);

  useLayoutEffect(() => {
    if (!shouldScroll || isLoading) {
      return;
    }

    headingRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setShouldScroll(false);
  }, [shouldScroll, isLoading]);

  const handleSelectCount = (option: PageCountOptions) => {
    const newCount = Number(option.value);
    updatePagination(1, newCount);
    setShouldScroll(true);
  };

  useEffect(() => {
    if (hasMounted.current) {
      // Page actually changed after first render
      setAnnounce(true);
      const timer = setTimeout(() => {
        setAnnounce(false);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
    hasMounted.current = true;
  }, [page, productsPerPage, filterValues]);

  const handlePagination = (id: number) => {
    // Early exit so current page doesn't spam history or rerender
    if (id === page) {
      return;
    }
    setPage(id);
    setShouldScroll(true);
  };

  const paginationMobileText = `${language.page} ${page} ${language.of} ${totalBtns}`;

  const productsLoadedText = `${paginationMobileText} ${language.loaded}`;
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
  const selectProductCountList = ['8', '16'];

  const options = [
    ...selectProductCountList.map((count) => ({
      value: count,
      label: count,
    })),
    { value: productCount.toString(), label: language.all },
  ];

  // Check when filtering
  const isOptionDisabled = (option: { value: string }) =>
    Number(option.value) > productCount;

  const ariaLabelledby = ariaInfoTitle(category || 'women');

  return (
    <>
      {category && <MetaTags metaTitle={language[category]} />}
      <section
        className="container collection-page"
        ref={headingRef}
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
          <div>
            <CollectionPageHeader
              headerText={categoryText}
              ariaLabelledby={ariaLabelledby}
            />
            <CollectionAside
              subMenu={subMenu || null}
              category={category || 'women'}
              isLoading={subMenuLoading}
              onReset={() => refetchSubMenu()}
              language={language}
            />
          </div>
          <div className="collection-page-content">
            {!isMobileSize && (
              <Picture
                src={`${src}.jpg`}
                srcSet={`${src}.avif`}
                alt={language[altText]}
                ratio="16:9"
                priority
              />
            )}
            {products && (
              <ProductToolbar
                onReset={() => refetch()}
                onSetDisplay={setProductView}
                displayControlList={productViewIconList}
                isActive={productView}
                onClearSingleFilter={onClearSingleFilter}
                filtersCount={filtersCount}
                onChange={onFilterChange}
                values={filterValues}
                availableBrands={products.availableBrands}
                availableSizes={sortSizesDynamic(products.availableSizes)}
                colors={sortedTranslatedColors}
                onRemoveFilterTag={onRemoveFilterTag}
                onClearAllFilters={onClearAllFilters}
                productCount={productCount}
                infoText={infoText}
                announce={announce}
                productsLoadedText={productsLoadedText}
              />
            )}
            {isLoading && <SkeletonCardList count={productsPerPage} />}
            {productCount > 0 ? (
              products && (
                <ProductCardList
                  products={products.products}
                  productView={productView}
                  showSizeOverlay={productView !== 'list'}
                  onReset={() => refetch()}
                />
              )
            ) : (
              <NoProductsFound
                noProductText={language.noProductResult}
                resetFilters={onClearAllFilters}
                resetBtnText={language.clearAllFilters}
              />
            )}
          </div>
        </div>
        <Pagination
          totalBtns={totalBtns}
          page={page}
          onPagination={handlePagination}
          onSelectCount={handleSelectCount}
          isOptionDisabled={isOptionDisabled}
          paginationMobileText={paginationMobileText}
          defaultValue={{
            value: productsPerPage.toString(),
            label: productsPerPage.toString(),
          }}
          options={options}
          selectInfo={
            isShowingAll
              ? `${language.showingAllProducts} (${productCount})`
              : language.productPerPage
          }
        />
      </section>
    </>
  );
};

export default CollectionPage;

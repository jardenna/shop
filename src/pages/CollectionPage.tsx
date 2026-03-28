import { useParams } from 'react-router';
import type { BaseShopProductsParams } from '../app/api/apiTypes/shopApiTypes';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import { usePaginationParams } from '../components/pagination/hooks/usePaginationParams';
import { usePaginationText } from '../components/pagination/hooks/usePaginationText';
import { useScrollOnPagination } from '../components/pagination/hooks/useScrollOnPagination';
import Pagination from '../components/pagination/Pagination';
import { type PageCountOptions } from '../components/pagination/PaginationSelect';
import Picture from '../components/Picture';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import { useLanguage } from '../features/language/useLanguage';
import CollectionAside from '../features/shop/components/CollectionAside';
import CollectionPageHeader from '../features/shop/components/CollectionPageHeader';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import FilterPanel, {
  InitialFilters,
} from '../features/shop/components/FilterPanel';
import ProductCardList from '../features/shop/components/ProductCardList';
import ProductToolbar from '../features/shop/components/ProductToolbar';
import { useSubMenu } from '../features/shop/hooks/useSubMenu';
import { useGetProductsQuery } from '../features/shop/shopApiSlice';
import { useAnnounce } from '../hooks/useAnnounce';
import { localStorageKeys, useLocalStorage } from '../hooks/useLocalStorage';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useSearchParamsState } from '../hooks/useSearchParamsState';
import MetaTags from '../layout/MetaTags';
import { LinkText } from '../layout/nav/enums';
import { IconName } from '../types/enums';
import { colorList, sortColorsByTranslation } from '../utils/colorUtils';
import { sortSizesDynamic } from '../utils/sizeUtils';
import { ariaInfoTitle } from '../utils/utils';
import './CollectionPage.styles.scss';

export type FilterKeys = keyof BaseShopProductsParams;

const CollectionPage = () => {
  const { category, categoryId } = useParams();
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
  const { page, productsPerPage, setPage, updatePagination } =
    usePaginationParams();

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
  const initialFilters: InitialFilters = {
    sizes: [] as string[],
    colors: [] as string[],
    brand: [] as string[],
    minPrice: '',
    maxPrice: '',
  };

  const {
    values,
    toggleValue,
    setValue,
    onRemoveFilterTag,
    onClearSingleFilter,
    onClearAllFilters,
  } = useSearchParamsState(initialFilters);
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    productsPerPage,
    page: page.toString(),
    colors: values.colors,
    brand: values.brand,
    sizes: values.sizes,
    minPrice: values.minPrice,
    maxPrice: values.maxPrice,
    mainCategory: category,
    subCategoryId: categoryId || '',
  });

  const productCount = products ? products.productCount : 0;
  const totalBtns = products?.pages ?? 1;
  const src = `/images/banners/${category}_banner`;
  const altText = `${category}BannerAltText`;
  const isShowingAll = productsPerPage >= productCount && productCount > 0;

  const { infoText, paginationMobileText, ariaLiveText } = usePaginationText({
    page,
    productsPerPage,
    productCount,
    totalBtns,
    language,
  });

  const { announce } = useAnnounce([page, productsPerPage, values]);
  const { scrollToRef, setShouldScroll } = useScrollOnPagination({
    isLoading,
  });

  const handleSelectCount = (option: PageCountOptions) => {
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
  const selectProductCountList = ['8', '16'];
  const ariaLabelledby = ariaInfoTitle(category || 'women');

  return (
    <>
      {category && <MetaTags metaTitle={language[category]} />}
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
          <aside>
            <CollectionPageHeader
              headerText={categoryText}
              ariaLabelledby={ariaLabelledby}
            />
            {!isMobileSize && (
              <CollectionAside
                subMenu={subMenu || null}
                category={category || 'women'}
                isLoading={subMenuLoading}
                onReset={() => refetchSubMenu()}
                language={language}
              />
            )}
          </aside>
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
            {products && (
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
                  onReset={() => refetch()}
                  values={values}
                  toggleValue={toggleValue}
                  setValue={setValue}
                  onRemoveFilterTag={onRemoveFilterTag}
                  onClearAllFilters={onClearAllFilters}
                  onClearSingleFilter={onClearSingleFilter}
                />
              </div>
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
              <EmptyState
                noProductText={language.noProductResult}
                noProductTitle={language.noProductResultTitle}
                onClearAllFilters={onClearAllFilters}
                resetBtnText={language.clearAllFilters}
              />
            )}
          </section>
        </div>
        {productCount > 0 && (
          <Pagination
            totalBtns={totalBtns}
            page={page}
            onPagination={handlePagination}
            onSelectCount={handleSelectCount}
            totalCount={productCount}
            paginationMobileText={paginationMobileText}
            defaultValue={{
              value: productsPerPage.toString(),
              label: productsPerPage.toString(),
            }}
            optionList={selectProductCountList}
            selectInfo={
              isShowingAll
                ? `${language.showingAllProducts} (${productCount})`
                : language.productPerPage
            }
          />
        )}
      </section>
    </>
  );
};

export default CollectionPage;

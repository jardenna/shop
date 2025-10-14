import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams, useSearchParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Pagination from '../components/pagination/Pagination';
import Picture from '../components/Picture';
import ProductCountSelect from '../components/ProductCountSelect';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';
import CollectionAside from '../features/shop/components/CollectionAside';
import CollectionPageHeader from '../features/shop/components/CollectionPageHeader';
import ProductCard from '../features/shop/components/ProductCard';
import ProductCardGridContent from '../features/shop/components/ProductCardGridContent';
import ProductCardListContent from '../features/shop/components/ProductCardListContent';
import ProductToolbar from '../features/shop/components/ProductToolbar';
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
import {
  getFilterSummary,
  pageParamKey,
  productsPerPageParamKey,
} from '../utils/utils';
import './CollectionPage.styles.scss';

export type FilterKeys = 'sizes' | 'colors' | 'brand';

const CollectionPage = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { category, categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const { isMobileSize, isSmallMobileSize } = useMediaQuery();
  const pageParam = searchParams.get(pageParamKey);
  const productPerPageParam = searchParams.get(productsPerPageParamKey);
  const page = Number(pageParam) || 1;
  const hasMounted = useRef(false);
  const [announce, setAnnounce] = useState(false);

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
  }, [page]);

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
  const productsPerPage = Number(productPerPageParam) || 8;

  // Redux hooks
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    productsPerPage: Number(productPerPageParam),
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
  const productCount = products ? products.productCount : 1;
  const startItem = (page - 1) * productsPerPage + 1;
  const endItem = Math.min(page * productsPerPage, productCount);
  const totalBtns = Math.ceil(productCount / productsPerPage);
  const ariaDescribedby = 'result-info';

  const productsLoadedText = `${language.page} ${page} ${language.of} ${totalBtns} ${language.loaded}`;
  const infoText = `${language.showing} ${startItem}–${endItem}  ${language.of} ${productCount} ${language.products.toLowerCase()}.`;

  return (
    <>
      {category && <MetaTags metaTitle={language[category]} />}
      <section className="container collection-page" ref={headingRef}>
        {subMenu && (
          <Breadcrumbs
            routeList={breadcrumbsList}
            subMenu={subMenu}
            productName=""
          />
        )}
        <div className="collection-page-container">
          <div>
            <CollectionPageHeader headerText={categoryText} />
            <CollectionAside
              subMenu={subMenu || null}
              category={category || 'women'}
              isLoading={subMenuLoading}
              onReset={() => refetchSubMenu()}
              language={language}
            />
          </div>
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
              {products && (
                <ProductToolbar
                  onSetDisplay={setProuctView}
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
                  announce={announce}
                  productsLoadedText={productsLoadedText}
                  infoText={infoText}
                  ariaDescribedby={ariaDescribedby}
                />
              )}
              {isLoading && <SkeletonCardList count={8} />}
              <section
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
              </section>
            </div>
          </ErrorBoundary>
        </div>
        <section
          className="product-navigation"
          aria-label={language.productNavigation}
        >
          <Pagination
            totalBtns={totalBtns}
            headingRef={headingRef}
            page={page}
            ariaDescribedby={ariaDescribedby}
          />
          <ProductCountSelect
            labelText={language.selectNumber}
            legendText={language.displayOptions}
            defaultValue={{
              value: productsPerPage.toString(),
              label: productsPerPage.toString(),
            }}
            options={[
              { value: '8', label: '8' },
              { value: '16', label: '16' },
              { value: productCount.toString(), label: language.all },
            ]}
          />
          <p>{language.productPerPage}</p>
        </section>
      </section>
    </>
  );
};

export default CollectionPage;

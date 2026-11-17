import { ReactElement, useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseProduct } from '../../app/api/apiTypes/sharedApiTypes';
import type { ProductMenuResponse } from '../../app/api/apiTypes/shopApiTypes';
import Breadcrumbs, {
  BreadcrumbsListProps,
} from '../../components/breadcrumbs/Breadcrumbs';
import Button from '../../components/Button';
import EmptyStateContent from '../../components/emptyState/EmptyStateContent';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import NotFoundError from '../../components/NotFoundError';
import { useScrollOnPagination } from '../../components/pagination/hooks/useScrollOnPagination';
import Pagination from '../../components/pagination/Pagination';
import Picture from '../../components/Picture';
import { useLanguage } from '../../features/language/useLanguage';
import ProductAside from '../../features/shop/components/ProductAside';
import ProductCartList from '../../features/shop/components/ProductCartList';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import MetaTags from '../../layout/MetaTags';
import { OptionType } from '../../types/types';
import { InitialFilters } from './CollectionPage';
import './shopProductPage.styles.scss';

interface ProductPageContainerProps {
  altText: string;
  breadcrumbsList: BreadcrumbsListProps[];
  category: string;
  children: ReactElement;
  error: any;
  isError: boolean;
  isLoading: boolean;
  itemCount: number;
  pageHeading: string;
  path: string;
  products: BaseProduct[];
  productView: string;
  src: string;
  subMenu: ProductMenuResponse[];
  totalBtns: number;
  refetch: () => void;
  refetchSubMenu: () => void;
}

const CollectionPageContainer = ({
  children,
  itemCount,
  error,
  isError,
  isLoading,
  category,
  totalBtns,
  subMenu,
  refetchSubMenu,
  refetch,
  productView,
  products,
  pageHeading,
  path,
  src,
  altText,
  breadcrumbsList,
}: ProductPageContainerProps) => {
  const ariaLabelledby = useId();

  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();

  // Redux hooks
  const initialFilters: InitialFilters = {
    sizes: [],
    colors: [],
    brand: [],
    minPrice: '',
    maxPrice: '',
  };

  const { onClearAllFilters, page, itemsPerPage, setPage, updatePagination } =
    useSearchParamsState(initialFilters);

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
    return <NotFoundError error={error} btnLabel="collection" path={path} />;
  }

  return (
    <>
      <MetaTags metaTitle={pageHeading} />

      <section
        className="container shop-product-page"
        ref={scrollToRef}
        aria-labelledby={ariaLabelledby}
      >
        <Breadcrumbs
          subMenu={subMenu}
          productName=""
          routeList={breadcrumbsList}
        />

        <div className="shop-product-page-container">
          {!isMobileSize && (
            <ProductAside
              headerText={pageHeading}
              ariaLabelledby={ariaLabelledby}
              subMenu={subMenu}
              linkTo={`${path}/${category}`}
              onReset={() => {
                refetchSubMenu();
              }}
              language={language}
              basePath={`${path}/${category}`}
            />
          )}

          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => {
              refetch();
            }}
          >
            <div>
              <section>
                <Picture
                  src={src}
                  srcSet={src}
                  alt={language[altText]}
                  ratio="16:9"
                  priority
                  className="shop-product-banner"
                />
                {children}

                <ProductCartList
                  products={products}
                  productView={productView}
                />
              </section>
              {itemCount > 0 && (
                <Pagination
                  refetch={refetch}
                  totalBtns={totalBtns}
                  isError={isError}
                  page={page}
                  onPagination={handlePagination}
                  onSelectCount={handleSelectCount}
                  totalCount={itemCount}
                  paginationMobileText="paginationMobileText"
                  defaultValue={{
                    value: itemsPerPage.toString(),
                    label: itemsPerPage.toString(),
                    id: itemsPerPage.toString(),
                  }}
                />
              )}
              {itemCount === 0 && (
                <EmptyStateContent
                  className="no-products"
                  emptyStateText={language.noProductText}
                  emptyStateTitle={language.noProductTitle}
                  src="/images/shoppingBags/collection_shopping_bag"
                >
                  <Button onClick={onClearAllFilters}>
                    {language.clearAllFilters}
                  </Button>
                </EmptyStateContent>
              )}
            </div>
          </ErrorBoundary>
        </div>
      </section>
    </>
  );
};

export default CollectionPageContainer;

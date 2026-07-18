import { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import { usePaginationText } from '../../components/pagination/hooks/usePaginationText';
import { useScrollOnPagination } from '../../components/pagination/hooks/useScrollOnPagination';
import Pagination from '../../components/pagination/Pagination';
import Table from '../../components/sortTable/Table';
import { createInitialFilters } from '../../components/sortTable/tableFilters/tableFiltersUtils';
import { useLanguage } from '../../features/language/useLanguage';
import { tableHeaders } from '../../features/products/components/productTableHeaders';
import ProductTableRow from '../../features/products/components/ProductTableRow';
import {
  useDuplicateProductMutation,
  useGetAllProductsQuery,
  useGetHasScheduledDataQuery,
} from '../../features/products/productApiSlice';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import { useSortParamsState } from '../../hooks/useSortParamsState';
import { AdminPath } from '../../layout/nav/enums';
import { Options } from '../../types/types';
import { handleApiError } from '../../utils/handleApiError';
import { oneDay, translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';
import './ProductPage.styles.scss';

const ProductPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();

  // Redux hooks
  const { data: hasScheduledData } = useGetHasScheduledDataQuery(undefined, {
    pollingInterval: oneDay,
  });

  const [dublicateProduct] = useDuplicateProductMutation();
  const shouldPollFullList = hasScheduledData?.hasScheduled ?? false;

  const { sortOrder, onSort, sortField } = useSortParamsState({
    columns: tableHeaders,
  });

  const initialFilters = createInitialFilters(tableHeaders);

  const {
    filterParams,
    setFilterParams,
    page,
    productsPerPage,
    setPage,
    updatePagination,
    onRemoveFilterTag,
  } = useSearchParamsState(initialFilters);

  const debouncedProductName = useDebouncedValue(filterParams.productName);

  const debouncedMinStock = useDebouncedValue(filterParams.minStock);
  const debouncedMaxStock = useDebouncedValue(filterParams.maxStock);

  const debouncedMinDiscount = useDebouncedValue(filterParams.minDiscount);
  const debouncedMaxDiscount = useDebouncedValue(filterParams.maxDiscount);

  const debouncedMinDiscountedPrice = useDebouncedValue(
    filterParams.minDiscountedPrice,
  );
  const debouncedMaxDiscountedPrice = useDebouncedValue(
    filterParams.maxDiscountedPrice,
  );

  const debouncedMinPrice = useDebouncedValue(filterParams.minPrice);
  const debouncedMaxPrice = useDebouncedValue(filterParams.maxPrice);

  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(
    {
      productsPerPage,
      page: page.toString(),
      sortField,
      sortOrder,
      maxStock: debouncedMaxStock,
      minStock: debouncedMinStock,

      minDiscount: debouncedMinDiscount,
      maxDiscount: debouncedMaxDiscount,

      minDiscountedPrice: debouncedMinDiscountedPrice,
      maxDiscountedPrice: debouncedMaxDiscountedPrice,

      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,

      productName: debouncedProductName,

      productStatus: filterParams.productStatus as Status,
      categoryName: filterParams.categoryName,
      subCategoryName: filterParams.subCategoryName,
    },
    {
      pollingInterval: shouldPollFullList ? 15000 : undefined,
      refetchOnMountOrArgChange: true,
    },
  );

  // Copy row handler
  async function handleCopyProduct(id: string) {
    try {
      await dublicateProduct(id);
      onAddMessagePopup({
        message: language.productCopied,
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  const totalBtns = allProducts?.pages ?? 1;
  const productCount = allProducts ? allProducts.productCount : 0;

  const handleSelectCount = (option: Options) => {
    const newCount = Number(option.value);
    updatePagination(1, newCount);
  };

  const { scrollToRef, setShouldScroll } = useScrollOnPagination({
    isLoading,
  });

  const handlePagination = (id: number) => {
    // Early exit so current page doesn't spam history or rerender
    if (id === page) {
      return;
    }
    setPage(id);
    setShouldScroll(true);
  };

  const { paginationMobileText } = usePaginationText({
    page,
    productsPerPage,
    productCount,
    totalBtns,
    language,
  });

  return (
    <AdminPageContainer
      className="product-page"
      heading={language.products}
      linkText={language.createNewProduct}
      linkTo={AdminPath.AdminProductCreate}
      ariaLabelledby="product-list"
      variant="x-large"
      scrollToRef={scrollToRef}
    >
      <Table
        values={filterParams}
        onFilter={setFilterParams}
        initialFilters={initialFilters}
        onReset={() => refetch()}
        isLoading={isLoading}
        data={allProducts?.products ?? []}
        columns={tableHeaders}
        tableCaption={language.productList}
        emptyHeaderCellText={language.updateProduct}
        className="product-table"
        onSort={onSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onRemoveFilterTag={onRemoveFilterTag}
      >
        {(data) =>
          data.map(
            ({
              id,
              countInStock,
              images,
              productName,
              categoryName,
              productStatus,
              subCategory,
              scheduledDate,
              price,
              discount,
              discountedPrice,
            }) => (
              <ProductTableRow
                key={id}
                id={id}
                countInStock={countInStock}
                images={images}
                productName={productName}
                discountedPrice={discountedPrice}
                status={productStatus}
                price={price}
                discount={discount}
                categoryName={
                  translateKey(categoryName, language) || categoryName
                }
                subCategoryName={
                  language[subCategory.translationKey] ||
                  subCategory.subCategoryName
                }
                scheduledDate={scheduledDate || null}
                onCopyProduct={handleCopyProduct}
              />
            ),
          )
        }
      </Table>
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
      />
    </AdminPageContainer>
  );
};

export default ProductPage;

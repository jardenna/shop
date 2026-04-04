import type { Product } from '../../app/api/apiTypes/adminApiTypes';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import { usePaginationParams } from '../../components/pagination/hooks/usePaginationParams';
import { usePaginationText } from '../../components/pagination/hooks/usePaginationText';
import Pagination from '../../components/pagination/Pagination';
import { PageCountOptions } from '../../components/pagination/PaginationSelect';
import type { Column } from '../../components/sortTable/Table';
import Table from '../../components/sortTable/Table';
import { useLanguage } from '../../features/language/useLanguage';
import ProductTableRow from '../../features/products/components/ProductTableRow';
import {
  useDuplicateProductMutation,
  useGetAllProductsQuery,
  useGetHasScheduledDataQuery,
} from '../../features/products/productApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import { handleApiError } from '../../utils/handleApiError';
import { oneDay, translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';
import './ProductPage.styles.scss';

const tableHeaders: Column<Product>[] = [
  { key: 'productName', label: 'name', name: 'productName' },
  { key: 'subCategoryName', label: 'category', name: 'subCategoryName' },
  { key: 'countInStock', label: 'countInStock', name: 'countInStock' },
  { key: 'productStatus', label: 'status', name: 'productStatus' },
  { key: 'id', label: '', name: '' },
];

const ProductPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();

  // Redux hooks
  const { data: hasScheduledData } = useGetHasScheduledDataQuery(undefined, {
    pollingInterval: oneDay,
  });

  const [dublicateProduct] = useDuplicateProductMutation();
  const shouldPollFullList = hasScheduledData?.hasScheduled ?? false;

  const { page, productsPerPage, setPage, updatePagination } =
    usePaginationParams();

  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(
    { productsPerPage, page: page.toString() },
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

  const selectProductCountList = ['8', '16'];
  const totalBtns = allProducts?.pages ?? 1;
  const productCount = allProducts ? allProducts.productCount : 0;
  // const totalBtns = 10;
  const isShowingAll = productsPerPage >= productCount && productCount > 0;

  const handleSelectCount = (option: PageCountOptions) => {
    const newCount = Number(option.value);
    updatePagination(1, newCount);
  };

  const handlePagination = (id: number) => {
    // Early exit so current page doesn't spam history or rerender
    if (id === page) {
      return;
    }
    setPage(id);
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
      heading={language.products}
      linkText={language.createNewProduct}
      linkTo={AdminPath.AdminProductCreate}
      ariaLabelledby="product-list"
    >
      <Table
        onReset={() => refetch()}
        isLoading={isLoading}
        data={allProducts?.products ?? []}
        columns={tableHeaders}
        tableCaption={language.productList}
        emptyHeaderCellText={language.updateProduct}
        className="product-table"
      >
        {(data) =>
          data.map(
            ({
              id,
              countInStock,
              images,
              productName,
              productStatus,
              subCategory,
              scheduledDate,
            }) => (
              <ProductTableRow
                key={id}
                id={id}
                countInStock={countInStock}
                images={images}
                productName={productName}
                status={productStatus}
                categoryName={
                  translateKey(subCategory.category.categoryName, language) ||
                  subCategory.category.categoryName
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
        optionList={selectProductCountList}
        selectInfo={
          isShowingAll
            ? `${language.showingAllProducts} (${productCount})`
            : language.productPerPage
        }
      />
    </AdminPageContainer>
  );
};

export default ProductPage;

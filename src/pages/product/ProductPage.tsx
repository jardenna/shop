import type { Product } from '../../app/api/apiTypes/adminApiTypes';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import type { Column } from '../../components/sortTable/Table';
import Table from '../../components/sortTable/Table';
import useLanguage from '../../features/language/useLanguage';
import ProductTableRow from '../../features/products/components/ProductTableRow';
import {
  useDuplicateProductMutation,
  useGetAllProductsQuery,
  useGetHasScheduledDataQuery,
} from '../../features/products/productApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import handleApiError from '../../utils/handleApiError';
import { oneDay } from '../../utils/utils';
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

  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(
    { productsPerPage: '100' },
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

  return (
    <AdminPageContainer
      heading={language.products}
      linkText={language.createNewProduct}
      linkTo={AdminPath.AdminProductCreate}
      onReset={() => refetch()}
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
                categoryName={subCategory.category.categoryName}
                scheduledDate={scheduledDate || null}
                subCategoryName={subCategory.subCategoryName}
                onCopyProduct={handleCopyProduct}
              />
            ),
          )
        }
      </Table>
    </AdminPageContainer>
  );
};

export default ProductPage;

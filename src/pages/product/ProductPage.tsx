import { Product } from '../../app/api/apiTypes';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Table, { Column } from '../../components/sortTable/Table';
import useLanguage from '../../features/language/useLanguage';
import {
  useDuplicateProductMutation,
  useGetAllProductsQuery,
  useGetHasScheduledDataQuery,
} from '../../features/products/productApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { oneDay } from '../../utils/utils';
import PageContainer from '../PageContainer';
import './_product-page.scss';
import ProductTableRow from './ProductTableRow';

const tableHeaders: Column<Product>[] = [
  { key: 'productName', label: 'name', name: 'image' },
  { key: 'subCategory', label: 'category', name: 'subCategory' },
  { key: 'price', label: 'price', name: 'price' },
  { key: 'countInStock', label: 'qty', name: 'countInStock' },
  { key: 'productStatus', label: 'status', name: 'productStatus' },
  { key: 'id', label: '', name: '' },
];

const ProductPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();

  const { data: hasScheduledData } = useGetHasScheduledDataQuery(undefined, {
    pollingInterval: oneDay,
  });

  const [dublicateProduct] = useDuplicateProductMutation();

  const shouldPollFullList = hasScheduledData?.hasScheduled ?? false;

  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(undefined, {
    pollingInterval: shouldPollFullList ? 15000 : undefined,
    refetchOnMountOrArgChange: true,
  });

  async function handleCopyProduct(id: string) {
    try {
      await dublicateProduct(id);
      onAddMessagePopup({
        messagePopupType: 'success',
        message: language.productUpdated,
      });
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  }

  return (
    <article className="page">
      <PageContainer
        heading={language.products}
        linkText={language.createNewProduct}
        linkTo={`/admin/${MainPath.AdminProductCreate}`}
        onReset={() => refetch}
      >
        <Table
          onReset={() => refetch}
          isLoading={isLoading}
          data={allProducts?.products ?? []}
          columns={tableHeaders}
          tableCaption={language.productList}
          emptyHeaderCellText={language.updateProduct}
        >
          {(data) =>
            data.map(
              ({
                id,
                countInStock,
                images,
                price,
                productName,
                discount,
                productStatus,
                subCategory,
                scheduledDate,
              }) => (
                <ProductTableRow
                  key={id}
                  id={id}
                  countInStock={countInStock}
                  imageSrc={images}
                  price={price}
                  discount={discount}
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
      </PageContainer>
    </article>
  );
};

export default ProductPage;

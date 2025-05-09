import { Product } from '../../app/api/apiTypes';
import PageHeader from '../../components/PageHeader';
import Table, { Column } from '../../components/sortTable/Table';
import useLanguage from '../../features/language/useLanguage';
import {
  useGetAllProductsQuery,
  useGetHasScheduledDataQuery,
} from '../../features/products/productApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { oneDay } from '../../utils/utils';
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
  const { data: hasScheduledData } = useGetHasScheduledDataQuery(undefined, {
    pollingInterval: oneDay,
  });

  const shouldPollFullList = hasScheduledData?.hasScheduled ?? false;

  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(undefined, {
    pollingInterval: shouldPollFullList ? 15000 : undefined,
    refetchOnMountOrArgChange: true,
  });

  return (
    <section className="page">
      <PageHeader
        heading={language.products}
        linkText={language.createNewProduct}
        linkTo={`/admin/${MainPath.AdminProductCreate}`}
      />
      <div className="page-card">
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
                  productName={productName}
                  status={productStatus}
                  categoryName={subCategory.category.categoryName}
                  scheduledDate={scheduledDate || null}
                  subCategoryName={subCategory.subCategoryName}
                />
              ),
            )
          }
        </Table>
      </div>
    </section>
  );
};

export default ProductPage;

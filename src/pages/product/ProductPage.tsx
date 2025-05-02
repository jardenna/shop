import { Product } from '../../app/api/apiTypes';
import PageHeader from '../../components/PageHeader';
import Table, { Column } from '../../components/sortTable/Table';
import useLanguage from '../../features/language/useLanguage';
import { useGetAllProductsQuery } from '../../features/products/productApiSlice';
import { MainPath } from '../../layout/nav/enums';
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
  const { data: allProducts, isLoading, refetch } = useGetAllProductsQuery();

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
                image,
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
                  imageSrc={image || ''}
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

import { ProductResponse } from '../../app/api/apiTypes';
import MoreLink from '../../components/MoreLink';
import Table, { Column } from '../../components/sortTable/Table';
import ProductPrice from '../../features/currency/components/ProductPrice';
import useLanguage from '../../features/language/useLanguage';
import { useGetAllProductsQuery } from '../../features/products/productApiSlice';
import { MainPath } from '../../layout/nav/enums';
import './_product-page.scss';

const tableHeaders: Column<ProductResponse>[] = [
  { key: 'productName', label: 'name', name: 'image' },
  { key: 'subCategory', label: 'category', name: 'subCategory' },
  { key: 'price', label: 'price', name: 'price' },
  { key: 'countInStock', label: 'qty', name: 'countInStock' },
  { key: 'id', label: '', name: '' },
];

const ProductPage = () => {
  const { language } = useLanguage();
  const { data: allProducts, isLoading, refetch } = useGetAllProductsQuery();

  const renderRow = ({
    id,
    productName,
    image,
    price,
    subCategory,
    countInStock,
  }: ProductResponse) => (
    <tr key={id}>
      <td>
        <div className="product-overview-cell">
          <img src={`/images${image}`} alt="" loading="lazy" />
          <span className="product-name">{productName}</span>
        </div>
      </td>
      <td>{subCategory.subCategoryName}</td>
      <td>
        <ProductPrice price={price} />
      </td>
      <td>{countInStock}</td>
      <td>
        <MoreLink
          linkText={language.viewProduct}
          linkTo={`/admin/${MainPath.AdminProductView}/${id}`}
        />
      </td>
    </tr>
  );

  return (
    <section className="page-card">
      <Table
        onReset={() => refetch}
        isLoading={isLoading}
        data={allProducts?.products ?? []}
        columns={tableHeaders}
        tableCaption={language.productList}
        emptyHeaderCellText={language.updateProduct}
      >
        {(data) => data.map(renderRow)}
      </Table>
    </section>
  );
};

export default ProductPage;

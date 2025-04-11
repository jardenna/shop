import { ProductResponse } from '../../app/api/apiTypes';
import Figure from '../../components/figure/Figure';
import Table, { Column } from '../../components/sortTable/Table';
import DateDisplay from '../../features/categories/DateDisplay';
import ProductPrice from '../../features/currency/components/ProductPrice';
import useLanguage from '../../features/language/useLanguage';
import { useGetAllProductsQuery } from '../../features/products/productApiSlice';

const tableHeaders: Column<ProductResponse>[] = [
  { key: 'productName', label: 'name', name: 'image' },
  { key: 'subCategory', label: 'subCategory', name: 'subCategory' },
  { key: 'price', label: 'price', name: 'price' },
  { key: 'updatedAt', label: 'updatedAt', name: 'updatedAt' },
  { key: 'id', label: '', name: '' },
];

const ProductPage = () => {
  const { language } = useLanguage();
  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  return (
    <section className="page-card ">
      <Table
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
              productName,
              image,
              description,
              price,
              updatedAt,
              subCategory,
            }) => (
              <tr key={id}>
                <td>
                  <div>
                    <Figure src={`/images${image}`} alt="" /> {productName}{' '}
                    <p className="text-ellipsis">{description}</p>
                  </div>
                </td>

                <td>{subCategory.subCategoryName}</td>
                <td>
                  <ProductPrice price={price} />
                </td>
                <td>
                  <DateDisplay
                    date={updatedAt}
                    month="2-digit"
                    year="2-digit"
                  />
                </td>
                <td>
                  aa
                  {/* <Link to={`/admin/${MainPath.AdminProductUpdate}/${id}`}>
                    {language.update}
                  </Link> */}
                </td>
              </tr>
            ),
          )
        }
      </Table>
    </section>
  );
};

export default ProductPage;

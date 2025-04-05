import { ProductResponse } from '../../app/api/apiTypes';
import Figure from '../../components/figure/Figure';
import Table from '../../components/sortTable/Table';
import DateDisplay from '../../features/categories/DateDisplay';
import ProductPrice from '../../features/currency/components/ProductPrice';
import { useGetAllProductsQuery } from '../../features/products/productApiSlice';

const ProductPage = () => {
  // const { selectedLanguage } = useLanguage();
  const tableHeaders: {
    key: keyof ProductResponse;
    label: string;
  }[] = [
    { key: 'image', label: 'image' },
    { key: 'productName', label: 'productName' },
    { key: 'description', label: 'description' },
    { key: 'price', label: 'price' },
    { key: 'updatedAt', label: 'updatedAt' },
    { key: 'id', label: '' },
  ];

  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  return (
    <section className="product-page">
      <Table
        isLoading={isLoading}
        data={allProducts?.products ?? []}
        columns={tableHeaders}
        tableCaption="products"
      >
        {(data) =>
          data.map(
            ({ id, productName, image, description, price, updatedAt }) => (
              <tr key={id}>
                <td>
                  <Figure src={`/images${image}`} alt="s" />
                </td>
                <td>{productName}</td>
                <td>{description}</td>
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
              </tr>
            ),
          )
        }
      </Table>
    </section>
  );
};

export default ProductPage;

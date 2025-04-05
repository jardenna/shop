import { ProductResponse } from '../../app/api/apiTypes';
import Figure from '../../components/figure/Figure';
import Table from '../../components/sortTable/Table';
import ProductPrice from '../../features/currency/components/ProductPrice';
import useLanguage from '../../features/language/useLanguage';
import { useGetAllProductsQuery } from '../../features/products/productApiSlice';
import dateToLocaleMap from '../../utils/dates';

const ProductPage = () => {
  const { selectedLanguage } = useLanguage();
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

  const { data: allProducts } = useGetAllProductsQuery();

  return (
    <section className="product-page">
      {allProducts && (
        <Table
          data={allProducts.products}
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
                    <span>
                      {new Intl.DateTimeFormat(
                        dateToLocaleMap[selectedLanguage],
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                        },
                      ).format(new Date(updatedAt))}
                    </span>
                  </td>
                </tr>
              ),
            )
          }
        </Table>
      )}
    </section>
  );
};

export default ProductPage;

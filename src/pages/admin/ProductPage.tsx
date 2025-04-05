import { ProductResponse } from '../../app/api/apiTypes';
import Button from '../../components/Button';
import Figure from '../../components/figure/Figure';
import Table, { Column } from '../../components/sortTable/Table';
import DateDisplay from '../../features/categories/DateDisplay';
import ProductPrice from '../../features/currency/components/ProductPrice';
import useLanguage from '../../features/language/useLanguage';
import { useGetAllProductsQuery } from '../../features/products/productApiSlice';
import { BtnVariant } from '../../types/enums';

const tableHeaders: Column<ProductResponse>[] = [
  { key: 'image', label: 'image', hideTableControls: true },
  { key: 'productName', label: 'productName' },
  { key: 'description', label: 'description' },
  { key: 'price', label: 'price' },
  { key: 'updatedAt', label: 'updatedAt' },
  { key: 'id', label: '' },
];

const ProductPage = () => {
  const { language } = useLanguage();
  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  return (
    <section className="product-page">
      <Table
        isLoading={isLoading}
        data={allProducts?.products ?? []}
        columns={tableHeaders}
        tableCaption={language.productList}
        emptyHeaderCellText={language.updateProduct}
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
                <td>
                  <Button variant={BtnVariant.Default}>
                    {language.update}
                  </Button>
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

import { ProductSizes } from '../../app/api/apiTypes';
import ProductPrice from '../../features/currency/components/ProductPrice';
import useLanguage from '../../features/language/useLanguage';
import { sizeList } from '../../pages/product/ViewProductPage';
import CardContent from '../card/CardContent';
import GridTwoCol from '../GridTwoCol';

type ProductCardCenterProps = {
  brand: string;
  colours: string[];
  discount: number;
  material: string;
  price: number;
  sizes: ProductSizes[];
};

const ProductCardCenter = ({
  brand,
  colours,
  discount,
  material,
  price,
  sizes,
}: ProductCardCenterProps) => {
  const { language } = useLanguage();

  return (
    <CardContent heading={null} className="center">
      <span className="separator" />
      <div className="product-list-container">
        <GridTwoCol>
          <strong>{language.price}:</strong>
          <ProductPrice price={price} />
        </GridTwoCol>
        {discount !== 0 && (
          <GridTwoCol>
            <strong>{language.discount}:</strong> {discount}
          </GridTwoCol>
        )}
        <GridTwoCol>
          <strong>{language.brand}:</strong>
          {brand}
        </GridTwoCol>
        <GridTwoCol>
          <strong>{language.material}:</strong> {material}
        </GridTwoCol>
        <div>
          <strong>{language.colours}:</strong>
          <ul>
            {colours.map((colour) => (
              <li key={colour}>{colour}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>{language.sizes}:</strong>
          <ul className="product-size-list">
            {sizeList.map((size) => (
              <li
                className={`product-size-list-item ${sizes.includes(size) ? 'available' : 'unavailable'}`}
                key={size}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContent>
  );
};

export default ProductCardCenter;
